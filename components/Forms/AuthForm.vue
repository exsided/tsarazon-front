<template>
	<form class="auth-form" @submit.prevent.stop="submit">
		<UiInput
			v-model="form.phone"
			:error="$v.phone?.$error || apiErrors.phone"
			:error-text="apiErrors.phone"
			label="Телефон"
			mask="+7 (###) ###-##-##"
		/>
		<UiInput
			v-model="form.password"
			:error="$v.password?.$error || apiErrors.password"
			:error-text="apiErrors.password"
			password
			label="Пароль"
		/>
		<a class="auth-form__forgot g-link" @click.prevent.stop="onClickRecovery">
			Забыли пароль?
		</a>
		<button class="button button--blue">
			Войти
		</button>
	</form>
</template>

<script setup>

import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import UiInput from '~/components/UI/Input.vue';
import { PHONE_VALIDATION } from '~/helpers/validators.js';
import { API_ERRORS_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters.js';
import { useMainStore } from '~/store/';

import userModule from '~/api/user.js';

const mainStore = useMainStore();
const emit = defineEmits(['recovery', 'success']);

const instance = getCurrentInstance();
const form = reactive({ phone: '', password: '' });
const rules =
{
	phone: { required, phone: PHONE_VALIDATION },
	password: { required, minLength: minLength(6) },
};
const apiErrors = ref({});

const $v = useVuelidate(rules, form);

const submit = async () =>
{
	$v.value.$touch();

	if ($v.value.$error)
		return;

	mainStore.enableLoading(instance.uid);

	const { data, error } = await userModule.authorization({
		phone: GET_CLEAR_PHONE(form.phone),
		password: form.password,
	});

	mainStore.disableLoading(instance.uid);

	if (data.value?.success)
		emit('success', data.value.data.access_token);
	else if (error.value?.data)
	{
		if (error.value?.data?.message)
			apiErrors.value = API_ERRORS_FORMATTER(error.value.data.data, form);
		else if (error.value?.statusCode === 422)
			apiErrors.value = API_ERRORS_FORMATTER(error.value.data);
	}
};
const onClickRecovery = () => emit('recovery');
</script>

<style lang="scss">
	.auth-form
	{
		.button
		{
			width: 100%;
			height: 46px;
		}
	}
	.auth-form__forgot
	{
		display: block;
		font-weight: 600;
		font-size: 10px;
		line-height: 14px;
		text-decoration-line: underline;
		color: $blue;
		margin-bottom: 16px;
		border: unset;
	}
</style>
