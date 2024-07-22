<template>
	<form class="regist-form" @submit.prevent="submit">
		<div class="regist-form__radio-wr">
			<UiRadio
				v-model="personType"
				name="personType"
				code="phisical"
			>
				Физическое лицо
			</UiRadio>
			<UiRadio
				v-model="personType"
				name="personType"
				code="organization"
			>
				Организация
			</UiRadio>
		</div>
		<div class="regist-form__fields">
			<template v-if="personType === 'phisical'">
				<UiInput
					v-model="phisicalForm.name"
					:error="$phisical.name.$error || apiPhisicalFormErrors.name"
					:error-text="apiPhisicalFormErrors.name"
					name="name"
					label="ФИО"
				/>
				<UiInput
					v-model="phisicalForm.phone"
					:error="$phisical.phone.$error || apiPhisicalFormErrors.phone"
					:error-text="apiPhisicalFormErrors.phone"
					mask="+7 (###) ###-##-##"
					name="phone"
					label="Телефон"
				/>
				<UiInput
					v-model="phisicalForm.email"
					:error="$phisical.email.$error || apiPhisicalFormErrors.email"
					:error-text="apiPhisicalFormErrors.email"
					name="email"
					label="E-mail"
				/>
				<UiInput
					v-model="phisicalForm.password"
					:error="$phisical.password.$error || apiPhisicalFormErrors.password"
					:error-text="apiPhisicalFormErrors.password"
					name="password"
					password
					label="Пароль"
				/>
			</template>
			<template v-else>
				<UiInput
					v-model="organizationForm.organization_name"
					:error-text="apiOrganizationFormErrors.organization_name"
					:error="$organization.organization_name.$error || apiOrganizationFormErrors.organization_name"
					name="organization_name"
					label="Название организации"
				/>
				<UiInput
					v-model="organizationForm.name"
					:error-text="apiOrganizationFormErrors.name"
					:error="$organization.name.$error || apiOrganizationFormErrors.name"
					name="name"
					label="ФИО контактного лица"
				/>
				<UiInput
					v-model="organizationForm.phone"
					:error-text="apiOrganizationFormErrors.phone"
					:error="$organization.phone.$error || apiOrganizationFormErrors.phone"
					name="phone"
					mask="+7 (###) ###-##-##"
					label="Телефон"
				/>
				<UiInput
					v-model="organizationForm.email"
					:error-text="apiOrganizationFormErrors.email"
					:error="$organization.email.$error || apiOrganizationFormErrors.email"
					name="email"
					label="E-mail"
				/>
				<UiInput
					v-model="organizationForm.password"
					:error-text="apiOrganizationFormErrors.password"
					:error="$organization.password.$error || apiOrganizationFormErrors.password"
					password
					name="password"
					label="Пароль"
				/>
				<UiInput
					v-model="organizationForm.tin"
					:error-text="apiOrganizationFormErrors.tin"
					:error="$organization.tin.$error || apiOrganizationFormErrors.tin"
					name="tin"
					label="ИНН организации"
				/>
				<UiInput
					v-model="organizationForm.url"
					:error="apiOrganizationFormErrors.url"
					:error-text="apiOrganizationFormErrors.url"
					label="Сайт или соцсеть компании"
					name="url"
				/>
				<UiFileInput
					v-model="organizationForm.documents"
					description="Добавьте документ, свидетельство о регистрации ИНН и ОГРН или паспорт, презентация компании или иные документы"
					label="Добавьте документы"
					multiple
				>
					Перетащите сюда или <span>выберите на компьютере</span>
				</UiFileInput>
			</template>
		</div>
		<div class="regist-form__checkboxes-wr">
			<UiCheckbox
				v-model="checkboxFields.personalData"
				:error="$checkboxes.personalData.$error"
			>
				Я согласен на обработку персональных данных
			</UiCheckbox>
			<UiCheckbox
				v-model="checkboxFields.offerAgreement"
				:error="$checkboxes.offerAgreement.$error"
			>
				Я принимаю условия <a href="#" target="_blank">Договора-оферты</a>
			</UiCheckbox>
		</div>
		<button class="button button--blue">
			Зарегистрироваться
		</button>
	</form>
</template>

<script setup>
import { required, minLength, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import UiInput from '~/components/UI/Input.vue';
import UiFileInput from '~/components/UI/FileInput.vue';
import UiCheckbox from '~/components/UI/Checkbox.vue';
import UiRadio from '~/components/UI/Radio.vue';

import { PHONE_VALIDATION, CHECKED_VALIDATION } from '~/helpers/validators.js';
import { API_ERRORS_FORMATTER, FORM_DATA_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters.js';

import { useMainStore } from '~/store/';

import userModule from '~/api/user.js';
import filesModule from '~/api/files.js';

const mainStore = useMainStore();
const instance = getCurrentInstance();
const emit = defineEmits(['successOrgRegist', 'successPhisRegist']);
const personType = ref('phisical');
const uploadedDocuments = ref([]);

const phisicalForm = reactive({
	name: '',
	phone: '',
	email: '',
	password: '',
});

const apiPhisicalFormErrors = ref({});

const phisicalRules =
{
	name: { required },
	phone: { required },
	email: { required, email },
	password: { required, minLength: minLength(6) },
};

const organizationForm = reactive({
	organization_name: '',
	name: '',
	phone: '',
	email: '',
	password: '',
	tin: '',
	url: '',
	documents: [],
});

const apiOrganizationFormErrors = ref({});

const organizationRules =
{
	organization_name: { required },
	name: { required },
	phone: { required, PHONE_VALIDATION },
	email: { required, email },
	password: { required, minLength: minLength(6) },
	tin: { required, minLength: minLength(10) },
};

const checkboxFields = reactive({
	personalData: false,
	offerAgreement: true,
});

const checkboxFieldsRules =
{
	personalData: { checked: CHECKED_VALIDATION },
	offerAgreement: { checked: CHECKED_VALIDATION },
};

const $phisical = useVuelidate(phisicalRules, phisicalForm);
const $organization = useVuelidate(organizationRules, organizationForm);
const $checkboxes = useVuelidate(checkboxFieldsRules, checkboxFields);

const submit = () =>
{
	$checkboxes.value.$touch();

	personType.value === 'phisical' ? registPhisical() : registOrganization();
};

const registPhisical = async () =>
{
	$phisical.value.$touch();
	apiPhisicalFormErrors.value = {};

	if ($phisical.value.$error || $checkboxes.value.$error)
		return;

	mainStore.enableLoading(instance.uid);

	const { data, error } = await userModule.registration({
		name: phisicalForm.name,
		phone: GET_CLEAR_PHONE(phisicalForm.phone),
		email: phisicalForm.email,
		password: phisicalForm.password,
	});

	mainStore.disableLoading(instance.uid);

	if (data.value?.success)
		emit('successPhisRegist', { phone: phisicalForm.phone, password: phisicalForm.password });
	else if (error.value?.data)
		apiPhisicalFormErrors.value = API_ERRORS_FORMATTER(error.value.data);
};
const registOrganization = async () =>
{
	$organization.value.$touch();

	if ($organization.value.$error || $checkboxes.value.$error)
		return;

	mainStore.enableLoading(instance.uid);

	await deleteDocuments();
	const documents = await uploadDocuments();

	const { data, error } = await userModule.registration(FORM_DATA_FORMATTER({
		organization_name: organizationForm.organization_name,
		name: organizationForm.name,
		phone: GET_CLEAR_PHONE(organizationForm.phone),
		email: organizationForm.email,
		password: organizationForm.password,
		tin: organizationForm.tin,
		url: organizationForm.url,
		documents: JSON.stringify(documents),
		is_organization: 1,
	}));

	mainStore.disableLoading(instance.uid);

	if (data.value?.confirmed === false)
		emit('successOrgRegist');
	else if (error.value?.data)
		apiOrganizationFormErrors.value = API_ERRORS_FORMATTER(error.value.data);
};

const uploadDocuments = async () =>
{
	const filesToUpload = organizationForm.documents.map(el => el.file).filter(el => el);
	const { data } = await filesModule.upload(filesToUpload);

	if (data.value?.success)
	{
		uploadedDocuments.value = data.value.data;
		return data.value.data;
	}
};

const deleteDocuments = async () =>
{
	if (!uploadedDocuments.value.length)
		return;

	const requests = [];

	for (const file of uploadedDocuments.value)
		requests.push(filesModule.delete(file.path));

	await Promise.all(requests);

	uploadedDocuments.value = [];
};
</script>

<style lang="scss">
	.regist-form
	{
		.button
		{
			width: 100%;
			height: 46px;
		}
	}
	.regist-form__checkboxes-wr
	{
		margin-bottom: 16px;

		.ui-checkbox
		{
			&:not(:last-child) { margin-bottom: 6px; }
		}
	}
	.regist-form__radio-wr
	{
		display: flex;
		column-gap: 30px;
		margin-bottom: 16px;
	}
	.regist-form__fields { margin-bottom: 20px; }
</style>
