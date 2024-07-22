<template>
	<div class="recovery-form">
		<form v-if="step ==='phone'" @submit.prevent="submitPhone">
			<div class="recovery-form__fields">
				<p class="recovery-form__desc">
					Пожалуйста, введите указанный при регистрации телефон
				</p>
				<UiInput
					v-model="phone"
					:error="$phoneValidation.phone?.$error || !!apiPhoneError"
					:error-text="apiPhoneError"
					label="Телефон"
					name="phone"
					mask="+7 (###) ###-##-##"
				/>
			</div>
			<button class="button button--blue">
				Восстановить пароль
			</button>
		</form>
		<form v-if="step ==='code'" @submit.prevent="submitCode">
			<div class="recovery-form__fields">
				<p class="recovery-form__desc">
					Введите код отправленный вам по СМС
				</p>
				<UiInput
					v-model="code"
					:error="$codeValidation.code?.$error || !!apiCodeError"
					:error-text="apiCodeError"
					placeholder="Код"
				/>
				<div v-if="interval && timerSeconds" class="recovery-form__timer">
					Запросить повторный код можно через {{ timerFormatter(timerSeconds) }}
				</div>
			</div>
			<button
				v-if="!interval && !timerSeconds"
				class="button button--light-blue"
				@click.prevent.stop="resendCode"
			>
				Отправить код повторно
			</button>
			<button class="button button--blue">
				Подтвердить
			</button>
		</form>
		<form v-if="step ==='password'" @submit.prevent="submitPassword">
			<div class="recovery-form__fields">
				<p class="recovery-form__desc">
					Введите новый пароль
				</p>
				<UiInput
					v-model="password"
					:error="$passwordValidation.password?.$error || apiPasswordErrors.password"
					:error-text="apiPasswordErrors.password"
					label="Новый пароль"
					password
				/>
				<UiInput
					v-model="confirm"
					:error="$passwordValidation.confirm?.$error || apiPasswordErrors.password_confirmed"
					:error-text="apiPasswordErrors.password_confirmed"
					label="Повторите пароль"
					password
				/>
			</div>
			<button class="button button--blue">
				Подтвердить
			</button>
		</form>
	</div>
</template>

<script setup>

import { required, sameAs, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import UiInput from '~/components/UI/Input.vue';

import { PHONE_VALIDATION } from '~/helpers/validators.js';
import { NUM_WORD, API_ERRORS_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters.js';
import { SECONDS_WORDS } from '~/consts/words.js';

import { useMainStore } from '~/store/';
import userModule from '~/api/user.js';

const mainStore = useMainStore();
const instance = getCurrentInstance();
const emit = defineEmits(['success', 'auth']);
const props = defineProps({
	isConfirmPopup:
	{
		type: Boolean,
		default: false,
	},
	phoneForConfirm:
	{
		type: String,
		default: '',
	},
	userData:
	{
		type: Object,
		default: () => null,
	},
});

const step = ref('phone');
const timerSeconds = ref('');
const interval = ref(null);
const phone = ref('');
const code = ref('');
const password = ref('');
const confirm = ref('');

const apiCodeError = ref('');
const apiPhoneError = ref('');
const apiPasswordErrors = ref({});

const phoneRules = { phone: { required, phone: PHONE_VALIDATION } };
const codeRules = { code: { required, minLength: minLength(4) } };
const passwordRules =
{
	password: { required, minLength: minLength(6) },
	confirm: { required, sameAsPassword: sameAs(password) },
};

const $phoneValidation = useVuelidate(phoneRules, { phone });
const $codeValidation = useVuelidate(codeRules, { code });
const $passwordValidation = useVuelidate(passwordRules, { password, confirm });

if (props.isConfirmPopup)
{
	step.value = 'code';
	phone.value = `${props.phoneForConfirm}`;
}

const startTimer = (duration) =>
{
	let timer = duration; let minutes; let seconds;

	interval.value = setInterval(() =>
	{
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);
		seconds = minutes * 60 + seconds;

		timerSeconds.value = seconds;

		if (seconds === 0)
			stopTimer();

		if (--timer < 0)
		{
			timer = duration;
		}
	}, 1000);
};

const timerFormatter = seconds => `${seconds} ${NUM_WORD(seconds, SECONDS_WORDS)}`;

const stopTimer = () =>
{
	clearInterval(interval.value);
	interval.value = null;
};

const submitPhone = async () =>
{
	$phoneValidation.value.$touch();

	if ($phoneValidation.value.$error)
		return;

	mainStore.enableLoading(instance.uid);

	const { data, error } = await userModule.passwordResetRequest({ phone: GET_CLEAR_PHONE(phone.value) });

	if (data.value?.success)
	{
		startTimer(10);
		setTimeout(() => step.value = 'code', 1000);
	}

	if (error.value?.data?.error)
		apiPhoneError.value = error.value.data.error;
	else if (error.value?.data?.message)
		apiPhoneError.value = error.value.data.message;

	mainStore.disableLoading(instance.uid);
};

const resendCode = async () =>
{
	mainStore.enableLoading(instance.uid);

	if (props.isConfirmPopup)
	{
		await authHandler();
		startTimer(10);
	}
	else
		submitPhone();

	mainStore.disableLoading(instance.uid);
};

const submitCode = async () =>
{
	$codeValidation.value.$touch();
	apiCodeError.value = '';

	if ($codeValidation.value.$error)
		return;

	mainStore.enableLoading(instance.uid);

	if (props.isConfirmPopup)
	{
		const { data, error } = await userModule.confirmPhone({ phone: GET_CLEAR_PHONE(props.userData.phone), code: code.value });

		if (data.value?.success)
			authHandler();

		if (error.value?.data?.message)
			apiCodeError.value = error.value.data.message;
		else if (error.value?.data?.error)
			apiCodeError.value = error.value.data.error;
	}
	else
	{
		const { data, error } = await userModule.confirmPasswordReset({ phone: GET_CLEAR_PHONE(phone.value), code: code.value });

		if (data.value?.success)
			step.value = 'password';

		if (error.value?.data?.message)
			apiCodeError.value = error.value.data.message;
		else if (error.value?.data?.error)
			apiCodeError.value = error.value.data.error;
	}

	mainStore.disableLoading(instance.uid);
};

const authHandler = async () =>
{
	const { data } = await userModule.authorization({ phone: GET_CLEAR_PHONE(props.userData.phone), password: props.userData.password });

	if (data.value?.success)
	{
		emit('auth', data.value.data.access_token);
	}

	return data.value;
};

const submitPassword = async () =>
{
	$passwordValidation.value.$touch();

	if ($passwordValidation.value.$error)
		return;

	mainStore.enableLoading(instance.uid);

	const { data, error } = await userModule.passwordResset({
		phone: GET_CLEAR_PHONE(phone.value),
		code: code.value,
		password: password.value,
		password_confirmation: confirm.value,
	});

	if (error.value?.statusCode === 422)
		apiPasswordErrors.value = API_ERRORS_FORMATTER(error.value.data);

	if (data.value?.success)
		emit('success');

	mainStore.disableLoading(instance.uid);
};

onMounted(() =>
{
	if (props.isConfirmPopup)
		startTimer(10);
});
onBeforeUnmount(() => stopTimer());
</script>

<style lang="scss">
	.recovery-form
	{
		.button
		{
			font-weight: 600;
			font-size: 18px;
			line-height: 25px;
			height: 46px;
			width: 100%;

			&--light-blue { margin-bottom: 10px; }
		}
	}
	.recovery-form__desc
	{
		font-weight: 600;
		font-size: 10px;
		line-height: 14px;
		color: $gray;
		margin-bottom: 6px;
	}
	.recovery-form__fields
	{
		margin-bottom: 16px;
	}
	.recovery-form__timer
	{
		font-size: 9px;
		line-height: 10px;
		color: $orange;
	}
</style>
