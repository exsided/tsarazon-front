<template>
	<div class="slk-settings">
		<div class="slk-settings__row">
			<div class="slk-settings__edit">
				<LogoSvg class="slk-settings__logo" />
				<a href="#" class="slk-settings__edit-link">Изменить логотип</a>
			</div>

			<div class="slk-settings__edit">
				<div class="slk-settings__edit-block">
					<UiInput
						v-model="publicDataForm.organization_name"
						name="organization_name"
						:error="$publicData.organization_name?.$error || publicDataErrors.organization_name"
						:error-text="publicDataErrors.organization_name"
						class="slk-settings__input"
						label="Торговое наименование компании"
					/>
					<UiInput
						v-model="publicDataForm.minimum_order_amount"
						name="minimum_order_amount"
						:error="$publicData.minimum_order_amount?.$error || publicDataErrors.minimum_order_amount"
						:error-text="publicDataErrors.minimum_order_amount"
						class="slk-settings__input"
						label="Минимальная сумма заказа"
					/>
				</div>
				<UiInput
					v-model="publicDataForm.description"
					name="description"
					:error="publicDataErrors.description"
					:error-text="publicDataErrors.description"
					class="slk-settings__edit-textarea"
					textarea
					label="Информация о компании"
				/>
				<button class="button button--blue slk-settings__edit-button" @click="savePublicData">
					Сохранить изменения
				</button>
			</div>

			<form @submit.prevent="saveRequisites">
				<div class="slk-settings__edit">
					<div class="slk-settings__edit-block">
						<UiInput
							v-model="requisitesForm.name"
							name="name"
							:error="$requisites.name?.$error || requisitesErrors.name"
							:error-text="requisitesErrors.name"
							class="slk-settings__input slk-settings__input--full-name"
							label="ФИО"
						/>
						<UiInput
							v-model="requisitesForm.phone"
							name="phone"
							:error="$requisites.phone?.$error || requisitesErrors.phone"
							:error-text="requisitesErrors.phone"
							class="slk-settings__input"
							label="Телефон"
							mask="+7 (###) ###-##-##"
						/>
						<UiInput
							v-model="requisitesForm.email"
							name="email"
							:error="$requisites.email?.$error || requisitesErrors.email"
							:error-text="requisitesErrors.email"
							class="slk-settings__input"
							label="Email"
						/>
					</div>
					<div class="slk-settings__edit-block">
						<UiInput
							v-model="requisitesForm.tin"
							name="tin"
							:error="$requisites.tin?.$error || requisitesErrors.tin"
							:error-text="requisitesErrors.tin"
							disabled
							class="slk-settings__input slk-settings__edit-data"
							label="ИНН"
						/>
						<UiInput
							v-model="requisitesForm.ogrn"
							name="ogrn"
							:error="$requisites.ogrn?.$error || requisitesErrors.ogrn"
							:error-text="requisitesErrors.ogrn"
							disabled
							class="slk-settings__input slk-settings__edit-data"
							label="ОГРН"
						/>
						<UiInput
							v-model="requisitesForm.kpp"
							name="kpp"
							:error="$requisites.kpp?.$error || requisitesErrors.kpp"
							:error-text="requisitesErrors.kpp"
							disabled
							class="slk-settings__input slk-settings__edit-data slk-settings__edit-zero"
							label="КПП"
						/>
					</div>
					<div class="slk-settings__edit-block">
						<UiInput
							v-model="requisitesForm.organization_name"
							name="organization_name"
							:error="$requisites.organization_name?.$error || requisitesErrors.organization_name"
							:error-text="requisitesErrors.organization_name"
							class="slk-settings__input"
							label="Наименование организации"
						/>
						<UiInput
							v-model="requisitesForm.legal_adress"
							name="legal_adress"
							:error="$requisites.legal_adress?.$error || requisitesErrors.legal_adress"
							:error-text="requisitesErrors.legal_adress"
							class="slk-settings__input slk-settings__edit-zero"
							label="Юридический адрес"
						/>
						<UiInput
							v-model="requisitesForm.ceo"
							name="ceo"
							:error="$requisites.ceo?.$error || requisitesErrors.ceo"
							:error-text="requisitesErrors.ceo"
							class="slk-settings__input"
							label="Генеральный директор"
						/>
					</div>
				</div>

				<div class="slk-settings__edit">
					<h3 class="slk-settings__edit-text">
						Банковские реквизиты
					</h3>
					<div class="slk-settings__edit-block">
						<UiInput
							v-model="requisitesForm.checking_account"
							name="checking_account"
							:error="$requisites.checking_account?.$error || requisitesErrors.checking_account"
							:error-text="requisitesErrors.checking_account"
							mask="### ## ### # #### #######"
							class="slk-settings__input slk-settings__edit-bank"
							label="Расчетный счет №"
						/>
						<UiInput
							v-model="requisitesForm.corresp_account"
							name="corresp_account"
							:error="$requisites.corresp_account?.$error || requisitesErrors.corresp_account"
							:error-text="requisitesErrors.corresp_account"
							is-number
							class="slk-settings__input slk-settings__edit-bank"
							label="Корреспондентский счет №"
						/>
						<UiInput
							v-model="requisitesForm.bic"
							name="bic"
							:error="$requisites.bic?.$error || requisitesErrors.bic"
							:error-text="requisitesErrors.bic"
							is-number
							class="slk-settings__input slk-settings__edit-bank slk-settings__edit-zero"
							label="БИК"
						/>
						<UiInput
							v-model="requisitesForm.bank_name"
							name="bank_name"
							:error="$requisites.bank_name?.$error || requisitesErrors.bank_name"
							:error-text="requisitesErrors.bank_name"
							class="slk-settings__edit-last"
							label="Наименование банка"
						/>
					</div>

					<button class="button button--blue slk-settings__btn slk-settings__edit-button">
						Сохранить изменения
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import { useMainStore, usePopupsStore, useUserStore } from '~/store/';
import { PHONE_VALIDATION } from '~/helpers/validators.js';
import { API_ERRORS_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters.js';

import userModule from '~/api/user.js';

import UiInput from '~/components/UI/Input.vue';
import LogoSvg from '~/assets/svg/logo.svg?skipsvgo';

const instance = getCurrentInstance();
const emit = defineEmits(['success']);

const userStore   = useUserStore();
const mainStore   = useMainStore();
const popupsStore = usePopupsStore();

const publicData =
{
	organization_name: userStore.user.organization_name,
	description: userStore.user.description,
	minimum_order_amount: userStore.user.minimum_order_amount,
};
const requisites =
{
	name: userStore.user.name,
	email: userStore.user.email,
	phone: userStore.user.phone,
	organization_name: userStore.user.organization_name,
	legal_adress: userStore.user.legal_adress,
	ceo: userStore.user.ceo,
	tin: userStore.user.tin,
	ogrn: userStore.user.ogrn,
	kpp: userStore.user.kpp,
	minimum_order_amount: userStore.user.minimum_order_amount,
	checking_account: userStore.bankDetails.checking_account,
	corresp_account: userStore.bankDetails.corresp_account,
	bic: userStore.bankDetails.bic,
	bank_name: userStore.bankDetails.bank_name,
};
const publicDataForm = ref({ ...publicData });
const requisitesForm = ref({ ...requisites });

const publicDataErrors = ref({});
const requisitesErrors = ref({});

const publicDataRules =
{
	organization_name: { required },
	minimum_order_amount: { required },
};
const requisitesRules =
{
	name: { required },
	email: { required, email },
	phone: { required, phone: PHONE_VALIDATION },
	legal_adress: { required },
	ceo: { required },
	checking_account: { required },
	corresp_account: { required },
	bic: { required },
	bank_name: { required },
};

const $publicData = useVuelidate(publicDataRules, publicDataForm);
const $requisites = useVuelidate(requisitesRules, requisitesForm);

const publicDataHasBeenChanged = computed(() =>
{
	for (const key in publicDataForm.value)
		if (key !== 'phone' && publicDataForm.value[key] !== publicData[key])
			return true;

	return false;
});

const requisitesHasBeenChanged = computed(() =>
{
	for (const key in requisitesForm.value)
		if (key !== 'phone' && requisitesForm.value[key] !== requisites[key])
			return true;

	return false;
});

const savePublicData = async () =>
{
	$publicData.value.$touch();

	if ($publicData.value.$error)
		return;

	publicDataErrors.value = {};

	if (publicDataHasBeenChanged.value)
	{
		mainStore.enableLoading(instance.uid);

		const payload =
		{
			description: publicDataForm.value.description,
			organization_name: publicDataForm.value.organization_name,
			minimum_order_amount: publicDataForm.value.minimum_order_amount,
		};

		const { error } = await userModule.editCaibinet(payload);

		if (error.value?.data)
		{
			if (error.value?.data?.message)
				publicDataErrors.value = API_ERRORS_FORMATTER(error.value.data.data, userForm.value);
			else if (error.value?.statusCode === 422)
				publicDataErrors.value = API_ERRORS_FORMATTER(error.value.data);
		}

		mainStore.disableLoading(instance.uid);

		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ showSuccesIcon: true, msg: 'Ваши данные успешно обновлены' });

		emit('success');
	}
};

const saveRequisites = async () =>
{
	$requisites.value.$touch();

	if ($requisites.value.$error)
		return;

	requisitesErrors.value = {};

	if (requisitesHasBeenChanged.value)
	{
		mainStore.enableLoading(instance.uid);

		const payload =
		{
			name: requisitesForm.value.name,
			description: requisitesForm.value.description,
			email: requisitesForm.value.email,
			organization_name: requisitesForm.value.organization_name,
			legal_adress: requisitesForm.value.legal_adress,
			ceo: requisitesForm.value.ceo,
			minimum_order_amount: requisitesForm.value.minimum_order_amount,
			checking_account: requisitesForm.value.checking_account,
			corresp_account: requisitesForm.value.corresp_account,
			bic: requisitesForm.value.bic,
			bank_name: requisitesForm.value.bank_name,
		};

		const { error } = await userModule.editCaibinet(payload);

		if (error.value?.data)
		{
			if (error.value?.data?.message)
				requisitesErrors.value = API_ERRORS_FORMATTER(error.value.data.data, requisitesForm.value);
			else if (error.value?.statusCode === 422)
				requisitesErrors.value = API_ERRORS_FORMATTER(error.value.data);

			mainStore.disableLoading(instance.uid);
		}
	}

	const phoneIsChanged = GET_CLEAR_PHONE(requisitesForm.value.phone) !== requisites.phone;

	let popupMsg = '';

	if (requisitesHasBeenChanged.value)
		popupMsg = 'Ваши данные успешно обновлены';

	if (phoneIsChanged)
	{
		if (popupMsg)
			popupMsg += '<br/><br/>';

		popupMsg += 'Код для подтверждения смены телефона отправлен на указанный телефон';
	}

	if (requisitesHasBeenChanged.value)
	{
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ showSuccesIcon: true, msg: popupMsg });
	}

	if (phoneIsChanged)
		await sendPhoneChangeCode(popupMsg);
	else
		emit('success');

	mainStore.disableLoading(instance.uid);
};

const sendPhoneChangeCode = async (msg = '') =>
{
	const { data, error } = await userModule.sendPhoneChangeCode(GET_CLEAR_PHONE(requisitesForm.value.phone));

	if (error.value)
	{
		const errorText = error.value?.data?.message || error.value?.data?.phone?.[0] || 'Ошибка при смене номера телефона';

		requisitesErrors.value.phone = errorText;

		popupsStore.setState(['', false]);
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ msg: errorText });
	}

	if (data.value)
	{
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ msg, phone: requisitesForm.value.phone, closeCallback: () => openPhoneChangePopup() });
		setTimeout(() =>
		{
			if (popupsStore.name !== 'PhoneChangePopup')
				openPhoneChangePopup();
		}, 5000);
	}
};

const openPhoneChangePopup = () =>
{
	popupsStore.setData({ phone: GET_CLEAR_PHONE(requisitesForm.value.phone), closeCallback: data => onPhoneChangePopupClose(data) });
	popupsStore.setState(['PhoneChangePopup', true]);
};

const onPhoneChangePopupClose = (data) =>
{
	if (data?.success)
	{
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
</script>

<style lang="scss">
	.slk-settings{ width:100%; }

	.slk-settings__edit{ margin-bottom: 10px; }

	.slk-settings__edit-button
	{
		color: #FFF;
		text-align: center;
		font-size: 14px;
		font-weight: 600;
		padding: 0 20px;
		margin-bottom: 20px;
	}

	.slk-settings__input { margin-bottom: 10px; }

	.slk-settings__edit-textarea{ margin-bottom: 15px; }

	.slk-settings__edit-last{ margin-bottom: 18px; }

	.slk-settings__edit-link
	{
		display: block;
		color: #3772FE;
		font-size: 11px;
		font-weight: 600;
		width: fit-content;
	}

	.slk-settings__edit-text
	{
		color: #2C2C2C;
		font-family: Ubuntu;
		font-size: 20px;
		font-weight: 500;
		display: block;
		margin-bottom: 15px;
	}

	.slk-settings__btn{ margin-bottom: 30px; }

	@include mq($tablet)
	{
		.slk-settings__row
		{
			max-width: 1040px;
			padding: 0;
		}
		.slk-settings__edit-block
		{
			display: flex;
			flex-wrap: wrap;
		}
		.slk-settings__input
		{
			width: 50%;
			max-width: 359px;
			margin-right: 10px;
			margin-bottom: 17px;
			&:last-child{ margin-right: 0; }
		}

		.slk-settings__edit-link{ font-size: 12px; }
		.slk-settings__edit-last
		{
			width: 359px;
			margin-bottom: 35px;
		}

		.slk-settings__edit-data{ max-width: 236px; }

		.slk-settings__edit-textarea
		{
			margin-bottom: 17px;
			max-width: 728px;
		}

		.slk-settings__edit-bank{ width: 236px; }

		.slk-settings__input--full-name{ margin-right: 50%; }

		.slk-settings__edit-zero{ margin-right: 0; }
	}

	@include mq($wd)
	{
		.slk-settings__edit
		{
			margin-bottom: 22px;
			&:nth-child(3){ margin-bottom: 0; }
		}

		.slk-settings__edit-data ,.slk-settings__input ,.slk-settings__edit-last{ max-width: 340px; }

		.slk-settings__edit-bank { width: 340px; }

		.slk-settings__edit-textarea
		{
			max-width: 690px;
			margin-bottom: 15px;
		}

		.slk-settings__edit-zero ,.slk-settings__input--full-name{ margin-right: 10px; }

		.slk-settings__input{ margin-bottom: 20px; }

		.slk-settings__edit-button
		{
			min-height: 46px;
			margin-bottom: 25px;
		}
	}
</style>
