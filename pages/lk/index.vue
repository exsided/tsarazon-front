<template>
	<NuxtLayout name="lk">
		<template #page>
			<div v-if="userData" class="lk-page">
				<h1 v-if="editProfile" class="lk-page__title">
					Редактирование профиля
				</h1>
				<h1 v-if="!editProfile" class="lk-page__title">
					Профиль
				</h1>
				<div v-if="!editProfile">
					<div class="lk-page__list-info">
						<div class="lk-page__info-item">
							<p class="lk-page__info-title">
								ФИО
							</p>
							<p class="lk-page__info-text">
								{{ userData.name }}
							</p>
						</div>
						<div class="lk-page__info-item lk-page__info-wr">
							<div>
								<p class="lk-page__info-title">
									Телефон
								</p>
								<p class="lk-page__info-text">
									{{ userData.phone }}
								</p>
							</div>
							<div>
								<p class="lk-page__info-title">
									Email
								</p>
								<p class="lk-page__info-text">
									{{ userData.email }}
								</p>
							</div>
						</div>
						<div class="lk-page__info-item">
							<div>
								<p class="lk-page__info-title">
									Пароль
								</p>
								<p class="lk-page__info-text">
									****************
								</p>
							</div>
						</div>
					</div>
				</div>
				<button
					v-if="!editProfile"
					class="lk-page__edit-btn g-link"
					@click="openEdit"
				>
					Редатировать данные
				</button>
				<div v-if="editProfile || editPassword" class="lk-page__edit">
					<form v-if="editProfile" @submit.prevent="saveUserData">
						<div class="lk-page__edit-list">
							<UiInput
								v-model="userForm.name"
								:error="$userForm.name?.$error || userFormApiErrors.name"
								:error-text="userFormApiErrors.name"
								name="name"
								label="ФИО"
							/>
							<UiInput
								v-model="userForm.phone"
								:error="$userForm.phone?.$error || userFormApiErrors.phone"
								:error-text="userFormApiErrors.phone"
								name="phone"
								mask="+7 (###) ###-##-##"
								label="Телефон"
							/>
							<UiInput
								v-model="userForm.email"
								:error="$userForm.email?.$error || userFormApiErrors.email"
								:error-text="userFormApiErrors.email"
								name="email"
								label="Email"
							/>
						</div>
						<div class="lk-page__edit-btns">
							<button class="button button--blue">
								Сохранить данные
							</button>
							<button class="button button--white" @click.prevent="closeEdit">
								Отменить
							</button>
						</div>
					</form>
					<form v-if="editPassword" @submit.prevent="savePassword">
						<div class="lk-page__edit-list">
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
						<div class="lk-page__edit-btns">
							<button class="button button--blue">
								Сохранить пароль
							</button>
							<button class="button button--white" @click.prevent="closePasswordEdit">
								Отменить
							</button>
						</div>
					</form>
				</div>
				<button
					v-if="!editPassword"
					class="lk-page__edit-btn g-link"
					@click="openPasswordEdit"
				>
					Редатировать пароль
				</button>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>

import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { PHONE_VALIDATION } from '~/helpers/validators.js';
import { API_ERRORS_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters.js';
import { useMainStore, usePopupsStore, useUserStore } from '~/store/';
import userModule from '~/api/user.js';

import UiInput from '~/components/UI/Input.vue';

const router = useRouter();

const userStore   = useUserStore();
const mainStore   = useMainStore();
const popupsStore = usePopupsStore();

const instance = getCurrentInstance();

const userForm = ref({ name: '', phone: '', email: '' });
const userFormApiErrors = ref({});
const userFormRules =
{
	name: { required, },
	phone: { required, phone: PHONE_VALIDATION },
	email: { required, email },
};
const $userForm = useVuelidate(userFormRules, userForm);

const {
	passwordsFormApiErrors,
	passwordsForm,
	$passwordsForm,
	_savePassword,
	_clearPasswordsForm,
} = usePasswordChange();

const editProfile = ref(false);
const editPassword = ref(false);

const openEdit = () => editProfile.value = true;
const closeEdit = () => editProfile.value = false;

const openPasswordEdit = () => editPassword.value = true;

const closePasswordEdit = () =>
{
	editPassword.value = false;

	_clearPasswordsForm();
};

const fetchUserData = async (checkEdit = false) =>
{
	mainStore.enableLoading(instance.uid);

	await userStore.fetchCabinet();

	userForm.value = { ...userData.value };

	if (checkEdit && router.currentRoute.value.hash === '#edit')
		openEdit();

	mainStore.disableLoading(instance.uid);
};

const saveUserData = async () =>
{
	$userForm.value.$touch();

	if ($userForm.value.$error)
		return;

	userFormApiErrors.value = {};

	if (hasChangedFields.value)
	{
		mainStore.enableLoading(instance.uid);

		const { error } = await userModule.editCaibinet({
			name: userForm.value.name,
			email: userForm.value.email,
		});

		if (error.value?.data)
		{
			if (error.value?.data?.message)
				userFormApiErrors.value = API_ERRORS_FORMATTER(error.value.data.data, userForm.value);
			else if (error.value?.statusCode === 422)
				userFormApiErrors.value = API_ERRORS_FORMATTER(error.value.data);

			mainStore.disableLoading(instance.uid);

			return;
		}
	}

	mainStore.enableLoading(instance.uid);

	const phoneIsChanged = userForm.value.phone !== userData.value.phone;

	let popupMsg = '';

	if (hasChangedFields.value)
		popupMsg = 'Ваши данные успешно обновлены';

	if (phoneIsChanged)
	{
		if (popupMsg)
			popupMsg += '<br/><br/>';

		popupMsg += 'Код для подтверждения смены телефона отправлен на указанный телефон';
	}

	if (hasChangedFields.value)
	{
		await fetchUserData();
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ showSuccesIcon: true, msg: popupMsg });
	}

	if (phoneIsChanged)
	{
		await sendPhoneChangeCode(popupMsg);
	}

	mainStore.disableLoading(instance.uid);

	if (!phoneIsChanged)
		closeEdit();

	removeHash();
};

const sendPhoneChangeCode = async (msg = '') =>
{
	const { data, error } = await userModule.sendPhoneChangeCode(GET_CLEAR_PHONE(userForm.value.phone));

	if (error.value)
	{
		if (error.value?.data?.message)
			userFormApiErrors.value = API_ERRORS_FORMATTER(error.value.data.data, userForm.value);
		else if (error.value?.statusCode === 422)
			userFormApiErrors.value = API_ERRORS_FORMATTER(error.value.data);
	}

	if (data.value)
	{
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ msg, phone: userForm.value.phone, closeCallback: () => openPhoneChangePopup() });
		setTimeout(() =>
		{
			if (popupsStore.name !== 'PhoneChangePopup')
				openPhoneChangePopup();
		}, 5000);
	}
};

const openPhoneChangePopup = () =>
{
	popupsStore.setData({ phone: GET_CLEAR_PHONE(userForm.value.phone), closeCallback: data => onPhoneChangePopupClose(data) });
	popupsStore.setState(['PhoneChangePopup', true]);
};

const onPhoneChangePopupClose = async (data) =>
{
	if (data?.success)
	{
		await fetchUserData();
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ showSuccesIcon: true, msg: 'Ваш номер телефона успешно изменен' });

		closeEdit();
	}
	else
	{
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ msg: 'Не удалось изменить ваш номер телефона' });
	}
};

const savePassword = async () =>
{
	const res = await _savePassword();

	if (!res)
		return;

	mainStore.enableLoading(instance.uid);

	await fetchUserData();

	popupsStore.setState(['MsgPopup', true]);
	popupsStore.setData({ showSuccesIcon: true, msg: 'Ваш пароль успешно обновлен' });
	mainStore.disableLoading(instance.uid);

	closePasswordEdit();
};

const removeHash = () => router.replace('/lk');

const hasChangedFields = computed(() =>
{
	for (const key in userForm.value)
		if (key !== 'phone' && userForm.value[key] !== userData.value[key])
			return true;

	return false;
});

const userData = computed(() => userStore.user);

await fetchUserData(true);

onBeforeRouteUpdate(async (to, from, next) =>
{
	await next();

	if (to.hash === '#edit')
	{
		openEdit();
		fetchUserData(true);
		removeHash();
	}
});

useHead({ title: 'Личный кабинет' });

definePageMeta({
	middleware: ['auth']
});
</script>

<style lang="scss">

.lk-page
{
	display: flex;
	flex-direction: column;
	margin-bottom: 50px;
	width: 100%;
	.g-link
	{
		border: none;
		width: fit-content;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: -0.14px;
	}
}

.lk-page__title
{
	font-family: "Ubuntu", sans-serif;
	font-size: 19px;
	font-weight: 500;
	line-height: 28px;
	margin-bottom: 30px;
}

.lk-page__list-info
{
	display: flex;
    flex-direction: column;
    row-gap: 10px;
	margin-bottom: 30px;
}

.lk-page__info-wr
{
	display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.lk-page__info-title
{
	color: rgba(44, 44, 44, 0.40);
	font-size: 11px;
	font-weight: 400;
	line-height: 14px;
	margin-bottom: 0;
	width: fit-content;
}

.lk-page__info-text
{
	font-size: 13px;
	font-weight: 600;
	line-height: 14px;
	margin-bottom: 0;
	width: fit-content;
}

.lk-page__edit-btn { margin-bottom: 10px; }

.lk-page__edit
{
	display: flex;
	flex-direction: column;
	row-gap: 30px;
	margin-bottom: 30px;
	padding-top: 30px;

	.button
	{
		font-size: 14px;
		padding: 0 35px;
		height: 36px;
	}
}
.lk-page__edit-btns
{
	display: flex;
	flex-wrap: wrap;
	gap: 10px;

	.button { width: 100%; }
}

.lk-page__edit-list
{
	display: flex;
    flex-direction: column;
    row-gap: 10px;
	margin-bottom: 20px;
}

@include mq($tablet)
{
	.lk-page
	{
		max-width: 359px;
		margin-bottom: 0;
	}

	.lk-page__title
	{
		font-size: 26px;
		font-weight: 500;
	}

	.lk-page__list-info
	{
		gap: 20px;
	}

	.lk-page__info-wr
	{
		flex-direction: row;
		gap: 100px;
	}
}

@include mq($wd)
{
	.lk-page
	{
		max-width: 100%;
	}

	.lk-page__list-info
	{
		gap: 30px;
	}

	.lk-page__edit
	{
		row-gap: 20px;
	}

	.lk-page__edit-btns
	{
		.button { width: fit-content; }
	}

	.lk-page__edit-list
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
