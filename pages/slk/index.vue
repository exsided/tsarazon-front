<template>
	<NuxtLayout name="slk">
		<div class="slk-personal container">
			<template v-if="!editProfile">
				<div class="slk-personal__row">
					<LogoSvg class="slk-personal__logo" />
					<div class="slk-personal__block">
						<div class="slk-personal__name">
							<h3 class="slk-personal__name-text">
								{{ publicData.organization_name }}
							</h3>
						</div>
						<div class="slk-personal__description">
							{{ publicData.description }}
						</div>
					</div>
				</div>

				<div class="slk-personal__info">
					<div class="slk-personal__block">
						<span class="slk-personal__text">ФИО</span>
						<span class="slk-personal__value">{{ publicData.name }}</span>
					</div>

					<div class="slk-personal__wrapper">
						<div class="slk-personal__block">
							<span class="slk-personal__text">Телефон</span>
							<span class="slk-personal__value">{{ publicData.phone }}</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">Email</span>
							<span class="slk-personal__value">{{ publicData.email }}</span>
						</div>
					</div>

					<div class="slk-personal__block">
						<span class="slk-personal__text">Пароль</span>
						<span class="slk-personal__value">*****************</span>
					</div>
					<div class="slk-personal__wrapper">
						<div class="slk-personal__block">
							<span class="slk-personal__text">ИНН</span>
							<span class="slk-personal__value">СТАТИЧНЫЙ</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">ОГРН</span>
							<span class="slk-personal__value">{{ publicData.ogrn }}</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">КПП</span>
							<span class="slk-personal__value">{{ publicData.kpp }}</span>
						</div>
					</div>

					<div class="slk-personal__wrapper">
						<div class="slk-personal__block">
							<span class="slk-personal__text">Наименование организации</span>
							<span class="slk-personal__value">{{ publicData.organization_name }}</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">Юридический адрес</span>
							<span class="slk-personal__value">{{ publicData.legal_adress }}</span>
						</div>
					</div>
					<div class="slk-personal__block">
						<span class="slk-personal__text">Генеральный директор</span>
						<span class="slk-personal__value">{{ publicData.ceo }}</span>
					</div>
					<div class="slk-personal__block">
						<span class="slk-personal__text">Минимальная сумма заказа</span>
						<span class="slk-personal__value">{{ publicData.minimum_order_amount }}</span>
					</div>
				</div>

				<div class="slk-personal__row">
					<h3 class="slk-personal__bank">
						Банковские реквизиты
					</h3>
				</div>

				<div class="slk-personal__info">
					<div class="slk-personal__info-block">
						<div class="slk-personal__block">
							<span class="slk-personal__text">Расчетный счет №</span>
							<span class="slk-personal__value">{{ requisites.corresp_account }}</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">Корреспондентский счет №</span>
							<span class="slk-personal__value">{{ requisites.checking_account }}</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">БИК</span>
							<span class="slk-personal__value">{{ requisites.bic }}</span>
						</div>
						<div class="slk-personal__block">
							<span class="slk-personal__text">Наименование банка</span>
							<span class="slk-personal__value">{{ requisites.bank_name }}</span>
						</div>
					</div>
				</div>
			</template>
			<button
				v-if="!editProfile"
				class="slk-page__edit-btn g-link"
				@click="openPorfileEdit"
			>
				Редатировать данные
			</button>
			<SlkSettings
				v-if="editProfile"
				@success="onSettingsChanged"
			/>
			<form
				v-if="editPassword"
				class="slk-personal__password-form"
				@submit.prevent="savePassword"
			>
				<div class="slk-personal__password-form-wr">
					<UiInput
						v-model="passwordsForm.old_password"
						:error="$passwordsForm.old_password?.$error || passwordsFormApiErrors.old_password"
						:error-text="passwordsFormApiErrors.old_password"
						password
						label="Старый пароль"
					/>
					<UiInput
						v-model="passwordsForm.new_password"
						:error="$passwordsForm.new_password?.$error || passwordsFormApiErrors.new_password"
						:error-text="passwordsFormApiErrors.new_password"
						label="Новый пароль"
					/>
					<UiInput
						v-model="passwordsForm.new_password_confirmation"
						:error="$passwordsForm.new_password_confirmation?.$error || passwordsFormApiErrors.new_password_confirmation"
						:error-text="passwordsFormApiErrors.new_password_confirmation"
						label="Подтверждение пароля"
					/>
				</div>
				<div class="slk-personal__password-form-btns">
					<button class="button button--blue">
						Сохранить пароль
					</button>
					<button class="button button--white" @click.prevent="closePasswordEdit">
						Отменить
					</button>
				</div>
			</form>
			<button
				v-if="!editPassword"
				class="slk-page__edit-btn slk-page__edit-btn--pass g-link"
				@click="openPasswordEdit"
			>
				Изменить пароль
			</button>
			<button class="slk-personal__logout" @click="logout">
				<LogoutSvg />
				Выйти
			</button>
		</div>
	</NuxtLayout>
</template>

<script setup>
import { useUserStore, useMainStore, usePopupsStore } from '~/store';

import UiInput from '~/components/UI/Input.vue';

import LogoSvg from '~/assets/svg/logo.svg?skipsvgo';
import LogoutSvg from '~/assets/svg/logout.svg?skipsvgo';
import SlkSettings from '~/components/Slk/Settings';

const router   = useRouter();
const instance = getCurrentInstance();

const userStore   = useUserStore();
const mainStore   = useMainStore();
const popupsStore = usePopupsStore();

const {
	passwordsFormApiErrors,
	passwordsForm,
	$passwordsForm,
	_savePassword,
	_clearPasswordsForm,
} = usePasswordChange();

const editProfile  = ref(false);
const editPassword = ref(false);

const logout = () => userStore.logout();

const openPorfileEdit = () => editProfile.value = true;
const openPasswordEdit = () => editPassword.value = true;

const closePasswordEdit = () =>
{
	editPassword.value = false;

	_clearPasswordsForm();
};

if (router.currentRoute.value.hash === '#edit')
	openPorfileEdit();

const publicData = ref({ ...userStore.user });
const requisites = ref({ ...userStore.bankDetails });

const savePassword = async () =>
{
	const res = await _savePassword();

	if (!res)
		return;

	mainStore.enableLoading(instance.uid);

	popupsStore.setState(['MsgPopup', true]);
	popupsStore.setData({ showSuccesIcon: true, msg: 'Ваш пароль успешно обновлен' });
	mainStore.disableLoading(instance.uid);

	closePasswordEdit();
};

const onSettingsChanged = async () =>
{
	mainStore.enableLoading(instance.uid);

	editProfile.value = false;

	await userStore.fetchCabinet();

	publicData.vlaue = { ...userStore.user };
	requisites.vlaue = { ...userStore.bankDetails };

	mainStore.disableLoading(instance.uid);
};

onBeforeRouteUpdate(async (to, from, next) =>
{
	await next();

	if (to.hash === '#edit')
	{
		openPorfileEdit();
		router.replace('/slk');
	}
});

useHead({ title: 'Личный кабинет поставщика' });

definePageMeta({
	middleware: ['auth']
});
</script>

<style lang="scss">
	.slk-personal
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin: 0 auto 50px auto;

		& > div { width: 100%; }
	}

	.slk-personal__title
	{
		color: #2C2C2C;
		font-family: Ubuntu;
		font-size: 26px;
		font-weight: 500;
		line-height: 38px;
		margin: 0 0 30px 0;
	}

	.slk-personal__row
	{
		display: flex;
		width: 100%;
	}

	.slk-personal__row .slk-personal__block
	{
		margin-bottom: 12px;
		padding-top:10px;
	}

	.slk-personal__logo
	{
		min-width: 60px;
		margin-right: 14px;
	}

	.slk-personal__name-text
	{
		color: #2C2C2C;
		font-size: 14px;
		font-weight: 600;
		margin-bottom:5px;
	}

	.slk-personal__description
	{
		color: #868799;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: -0.24px;
	}

	.slk-personal__text
	{
		color: rgba(44, 44, 44, 0.40);
		font-size: 11px;
		font-weight: 400;
		line-height: 14px;
		display: block;
	}

	.slk-personal__block
	{
		margin-bottom: 10px;
		width: 100%;
		word-wrap: break-word;
		word-break: break-all;
	}

	.slk-personal__info
	{
		width: 100%;
		margin-bottom: 30px;

		&:nth-child(4) .slk-personal__block
		{
			&:nth-child(2) { margin-bottom: 20px; }
		}
	}

	.slk-personal__value
	{
		color: #2C2C2C;
		font-size: 13px;
		font-weight: 600;
		line-height: 14px;
	}

	.slk-personal__bank
	{
		color: #2C2C2C;
		font-family: Ubuntu;
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 20px;
	}

	.slk-personal__logout
	{
		color: #F69421;
		font-family: Ubuntu;
		font-size: 16px;
		font-weight: 500;
		line-height: 20px;
		display: block;
		cursor: pointer;
		width: fit-content;
		border: unset;
	}
	.slk-page__edit-btn
	{
		display: block;
		border: unset;
		margin-bottom: 10px;
		font-size: 14px;
		font-weight: 400;
		line-height: 150%;

		&--pass { margin-bottom: 30px; }
	}

	.slk-personal__password-form-btns
	{
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		.button { width: 100%; }
	}

	.slk-personal__password-form
	{
        max-width: 359px;
		width: 100%;
		padding-top: 40px;
		margin-bottom: 40px;
	}

	.slk-personal__password-form-wr
	{
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	@include mq($tablet)
	{
		.slk-personal{ margin-bottom:60px; }

		.slk-personal__logo{ min-width: 80px; }

		.slk-personal__wrapper
		{
			display: flex;
			max-width: 485px;
		}

		.slk-personal__info
		{
			margin-bottom: 35px;

			&:nth-child(4){ margin-bottom: 10px; }
		}

		.slk-personal__block
		{
			width: 100%;
			max-width: 280px;
			flex: 0 0 auto;
			margin-bottom: 20px;
		}
		.slk-personal__info-block
		{
			display: flex;
			flex-wrap: wrap;
			max-width: 560px;
		}
		.slk-personal__description { font-size:14px; }
		.slk-personal__logo { margin-right: 25px; }
		.slk-personal__row
		{
			margin-bottom: 18px;

			&:nth-child(1) .slk-personal__block
			{
				max-width: 88%;
				width: 100%;
			}
		}
		.slk-personal__bank{ margin-bottom: 0; }
	}

	@include mq($desktop)
	{
		.slk-personal { margin-bottom:80px; }

		.slk-personal__wrapper { display: flex; }

		.slk-personal__row
		{
			margin-bottom: 35px;

			.slk-personal__block{ padding-top:15px; }

			&:nth-child(1) .slk-personal__block{ max-width: 100%; }
			&:nth-child(3){ margin-bottom: 20px; }

		}

		.slk-personal__link
		{
			&:nth-child(2) { margin-bottom: 25px; }
		}

		.slk-personal__password-form-btns .button { width: fit-content; }

		.slk-personal__password-form { max-width: unset; }
		.slk-personal__password-form-wr
		{
			flex-direction: row;
			column-gap: 10px;

			.ui-input
			{
				width: 100%;
				max-width: 340px;
			}
		}
	}
</style>
