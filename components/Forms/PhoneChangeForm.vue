<template>
	<form class="phone-change-form" @submit.prevent="submit">
		<h3 class="phone-change-form__title">
			Введите код отправленный вам по СМС
		</h3>
		<UiInput
			v-model="code"
			:error="$validation.code?.$error || !!apiErrors.code"
			:error-text="apiErrors.code"
			label="Код"
		/>
		<span v-if="apiErrors.phone" class="g-error">
			{{ apiErrors.phone }}
		</span>
		<button class="button button--blue">
			Отправить
		</button>
	</form>
</template>

<script setup>

import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import UiInput from '~/components/UI/Input.vue';

import { API_ERRORS_FORMATTER } from '~/helpers/formatters.js';

import { useMainStore } from '~/store/';
import userModule from '~/api/user.js';

const instance = getCurrentInstance();
const mainStore = useMainStore();
const emit = defineEmits(['success', 'error']);
const props = defineProps({
	phone:
	{
		type: String,
		default: '',
	},
});

const code = ref('');
const rules = { code: { required, minLength: minLength(4) } };
const apiErrors = ref({});

const $validation = useVuelidate(rules, { code });

const submit = async () =>
{
	$validation.value.$touch();

	if ($validation.value.$error)
		return;

	apiErrors.value = {};

	mainStore.enableLoading(instance.uid);

	const { data, error } = await userModule.changePhone({ phone: props.phone, code: code.value });

	mainStore.disableLoading(instance.uid);

	if (error.value)
	{
		if (error.value?.data?.message)
			apiErrors.value = API_ERRORS_FORMATTER(error.value.data.data, { code: '' });
		else if (error.value?.statusCode === 422)
			apiErrors.value = API_ERRORS_FORMATTER(error.value.data);

		return;
	}

	if (data.value.data)
		emit('success');
	if (data.value.error)
		emit('error');
};
</script>

<style lang="scss">
.phone-change-form
{
	display: flex;
	flex-direction: column;
	width: 100%;
	flex: 1;

	.button
	{
		font-weight: 600;
		font-size: 18px;
		line-height: 25px;
		height: 46px;
		width: 100%;
	}

	.ui-input { margin-bottom: 20px; }
}
.phone-change-form__title
{
	font-family: 'Ubuntu';
	font-weight: 500;
	font-size: 19px;
	line-height: 22px;
	color: $black;
	margin-bottom: 40px;
}
</style>
