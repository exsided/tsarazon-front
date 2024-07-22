<template>
	<div
		class="contacts-form"
		:class="{'contacts-form--without-contacts': !showContacts}"
	>
		<div class="container">
			<div class="contacts-form__wr">
				<div class="contacts-form__backdrop contacts-form__backdrop--top" />
				<div class="contacts-form__backdrop contacts-form__backdrop--bottom" />
				<div v-if="showContacts" class="contacts-form__info">
					<h2 class="contacts-form__title">
						Контакты
					</h2>

					<div class="contacts-form__info-column">
						<h3 class="contacts-form__info-title">
							Режим работы платформы:
						</h3>
						<p class="contacts-form__text contacts-form__text--shedule">
							круглосуточно 24/7
						</p>
					</div>

					<div class="contacts-form__info-column">
						<h3 class="contacts-form__info-title">
							Режим работы техподдержки:
						</h3>
						<p class="contacts-form__text contacts-form__text--shedule">
							пн - пт с 9:00 до 18:00
						</p>
					</div>

					<div
						class="contacts-form__info-column contacts-form__info-column--contact"
					>
						<h3 class="contacts-form__info-title">
							Телефон
						</h3>
						<p class="contacts-form__text">
							<a
								href="tel:+7(800)201-10-69"
								class="contacts-form__link"
							>+7 (800) 201-10-69</a>
						</p>
					</div>

					<div
						class="contacts-form__info-column contacts-form__info-column--contact"
					>
						<h3 class="contacts-form__info-title">
							Email
						</h3>
						<p class="contacts-form__text">
							<a
								href="mailto:info@tsarazon.ru"
								class="contacts-form__link"
							>info@tsarazon.ru</a>
						</p>
					</div>
				</div>
				<div v-else class="contacts-form__info">
					<h2 class="contacts-form__title">
						Остались вопросы? Перезвоним!
					</h2>
					<h3 class="contacts-form__info-title">
						Мы стремимся быть максимально доступными для наших клиентов, поэтому не стесняйтесь обращаться к нам с любыми вопросами, которые у вас могут возникнуть.
					</h3>
				</div>
				<form @submit.prevent="submit">
					<div class="contacts-form__container">
						<h2 class="contacts-form__headline">
							Остались вопросы? Перезвоним!
						</h2>
						<div class="contacts-form__container-input">
							<UiInput
								v-model="form.name"
								:error="$v.name?.$error || apiErrors.name"
								:error-text="apiErrors.name"
								label="Имя"
								name="fio"
								class="contacts-form__input"
							/>
							<UiInput
								v-model="form.phone"
								:error="$v.phone?.$error || apiErrors.phone"
								:error-text="apiErrors.phone"
								mask="+7 (###) ###-##-##"
								label="Телефон"
								name="phone"
								class="contacts-form__input"
							/>
						</div>
						<UiInput
							v-model="form.question"
							label="Введите ваше сообщение"
							textarea
							:error="$v.question?.$error || apiErrors.question"
							:error-text="apiErrors.question"
							name="question"
							class="contacts-form__input contacts-form__input--textarea"
						/>
						<div class="contacts-form__container-wr">
							<UiCheckbox
								v-model="form.personalData"
								is-white
								:error="$v.personalData?.$error"
								name="personalData"
							>
								Согласен на обработку персональных данных
							</UiCheckbox>
							<button class="contacts-form__submit button button--white">
								Отправить сообщение
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import UiInput from '@/components/UI/Input.vue';
import UiCheckbox from '@/components/UI/Checkbox.vue';
import { API_ERRORS_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters.js';

import { PHONE_VALIDATION, CHECKED_VALIDATION } from '~/helpers/validators.js';
import { usePopupsStore } from '~/store';
import formModule from '~/api/forms.js';

const popupsStore = usePopupsStore();
const props = defineProps({
	showContacts:
	{
		type: String,
		default: 'true',
	},
});

const form = reactive({
	name: '',
	phone: '',
	question: '',
	personalData: false,
});

const rules =
{
	phone: { required, phone: PHONE_VALIDATION },
	name: { required },
	question: { required },
	personalData: { checked: CHECKED_VALIDATION }
};

const apiErrors = ref({});

const $v = useVuelidate(rules, form);

const submit = async () =>
{
	$v.value.$touch();

	if ($v.value.$error)
		return;

	const { data, error } = await formModule.askQuestion({
		name: form.name,
		phone: GET_CLEAR_PHONE(form.phone),
		question: form.question,
	});

	apiErrors.value = {};

	if (data.value)
	{
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({ showSuccesIcon: true, msg: 'Спасибо!<br> Ваша заявка отправлена' });
	}
	else if (error.value?.statusCode === 422)
		apiErrors.value = API_ERRORS_FORMATTER(error.value.data);
};
</script>

<style lang="scss">
.contacts-form
{
	margin-bottom: 40px;

	&--without-contacts
	{
		.contacts-form__headline { display: none; }
	}
}

.contacts-form__wr
{
	padding: 54px 20px 82px 20px;
	color: #fff;
	background-color: #3772fe;
	background-size: 100% 100%;
	position: relative;
	overflow: hidden;

	&:before
	{
		content: "";
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		height: 50px;
		background: transparent;
		border-radius: 27px 26px 0px 0px;
		transform: skewy(5.5deg);
		box-shadow: 0px -101px 0px 100px #ffffff;
		transform-origin: left top;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		z-index: 1;
	}
	&:after
	{
		content: "";
		position: absolute;
		right: 0;
		top: auto;
		bottom: 0;
		width: 100%;
		height: 60px;
		background: transparent;
		border-radius: 0px 0px 27px 25px;
		transform: skewy(-5.5deg);
		box-shadow: 0px 101px 0px 100px #ffffff;
		transform-origin: left top;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		z-index: 1;
	}
}

.contacts-form__backdrop
{
	position: absolute;
	z-index: 0;
	pointer-events: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&--top
	{
		width: 100%;
		top: -3px;
		left: 0;
		height: 400px;
		background: url("/svg/contacts-form-bg-top.svg") no-repeat;
	}

	&--bottom {
		width: 210px;
		height: 260px;
		bottom: 42px;
		right: -17px;
		background: url("/svg/contacts-form-bg-bottom.svg") no-repeat;
	}
}

.contacts-form__info
{
	margin-bottom: 30px;
	position: relative;
	z-index: 1;
}

.contacts-form__info-column
{
	width: 100%;

	&:nth-of-type(1) { margin-bottom: 14px; }

	&:nth-of-type(2) { margin-bottom: 16px; }
}

.contacts-form__title
{
	font-family: "Ubuntu", sans-serif;
	color: #fff;
	margin: 0;
	margin-bottom: 10px;
	font-weight: 500;
	font-size: 19px;
	line-height: 22px;
	width: 100%;
}

.contacts-form__info-title
{
	width: 100%;
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	margin: 0;
	margin-bottom: 5px;
}

.contacts-form__text
{
	width: 100%;
	color: #fff;
	font-weight: 700;
	font-size: 16px;
	line-height: 22px;
	margin: 0;
	margin-bottom: 10px;

	&--shedule
	{
		font-weight: 400;
		font-size: 14px;
		line-height: 19px;
		margin: 0;
	}
}

.contacts-form__link { color: #fff; }

.contacts-form__container { width: 100%; }

.contacts-form__headline
{
	font-family: "Ubuntu", sans-serif;
	color: #fff;
	margin: 0;
	width: 100%;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	margin-bottom: 20px;
}

.contacts-form__input
{
	margin-bottom: 6px;

	.ui-input__field
	{
		width: 100%;
		padding: 9.5px 10px;
		font-size: 14px;
		font-weight: 400;
		line-height: 19px;
		background-color: $white;

		&--textarea
		{
			min-height: 100px;
			margin-bottom: 10px;
			resize: none;
		}

		&::placeholder { color: rgba(44, 44, 44, 0.4); }
	}

	.ui-input__label
	{
		left: 10px;
	}
}

.contacts-form__container-wr
{
	display: flex;
	flex-direction: column;

	.ui-checkbox { margin-bottom: 10px; }

	.ui-checkbox__box
	{
		min-width: 16px;
		width: 16px;
		height: 16px;
	}
}

.contacts-form__submit
{
	width: 100%;
	max-width: 100%;
	font-weight: 400;
	font-size: 15px;
	line-height: 22px;
	position: relative;
	z-index: 2;
}

@include mq($tablet)
{
	.contacts-form
	{
		margin-bottom: 50px;

		&--without-contacts
		{
			.contacts-form__info
			{
				max-width: unset;
			}

			.contacts-form__input .ui-input__field--textarea
			{
				min-height: 75px;
				height: 75px;
			}

			.contacts-form__wr
			{
				padding: 86px 59px 86px 59px;
				&:before { transform: skewy(6deg); }
				&:after { transform: skewy(-6deg); }
			}

			.contacts-form__title
			{
				font-size: 22px;
				line-height: normal;
			}
			.contacts-form__info-title { max-width: 70%; }
		}
	}

	.contacts-form__wr
	{
		padding: 56px 20px 86px 60px;
		&:before
		{
			height: 60px;
			border-radius: 32px 25px 0 0;
			transform: skewy(7deg);
			background: transparent;
			box-shadow: 0 -111px 0 110px white;
		}
		&:after
		{
			height: 60px;
			background: transparent;
			box-shadow: 0 111px 0 111px white;
			border-radius: 0 0 25px 32px;
			transform: skewy(-7deg);
		}
	}

	.contacts-form__backdrop
	{
		&--top
		{
			background: url("/svg/contacts-form-bg-top-tablet.svg") no-repeat;
		}

		&--bottom
		{
			background: url("/svg/contacts-form-bg-bottom-tablet.svg") no-repeat;
			bottom: 90px;
			right: -16px;
		}
	}

	.contacts-form__info
	{
		max-width: 320px;
		display: flex;
		flex-wrap: wrap;
		column-gap: 40px;
		margin-bottom: 50px;
	}

	.contacts-form__info-column--contact
	{
		max-width: 140px;
	}

	.contacts-form__info-column {
		&:nth-of-type(1) { margin-bottom: 16px; }
		&:nth-of-type(2) { margin-bottom: 26px; }
	}

	.contacts-form__title
	{
		font-size: 26px;
		line-height: 30px;
		margin-bottom: 16px;
	}

	.contacts-form__text { margin-bottom: 0; }

	.contacts-form__container { max-width: 470px; }

	.contacts-form__headline
	{
		font-size: 16px;
		line-height: 18px;
	}

	.contacts-form__input
	{
		max-width: 232px;

		&--textarea { max-width: 100%; }

		.ui-input__field
		{
			padding: 9.5px 20px;
		}

		.ui-input__label
		{
			left: 20px;
		}
	}

	.contacts-form__submit { max-width: 201px; }

	.contacts-form__container-input
	{
		display: flex;
		justify-content: space-between;
		column-gap: 6px;
		input
		{
			width: 100%;
			min-width: 232px;
		}
	}
}

@include mq($desktop)
{
	.contacts-form
	{
		&--without-contacts
		{
			.contacts-form__wr
			{
				column-gap: 71px;
				flex-direction: row;
				padding: 70px 50px 95px 50px;

				&:before { transform: skewy(178deg) translateY(50px); }
				&:after { transform: skewy(182deg) translateY(-50px); }
			}

			.contacts-form__input .ui-input__field--textarea
			{
				min-height: 75px;
				height: 75px;
			}

			.contacts-form__info-title { max-width: unset; }
		}
	}
	.contacts-form__wr
	{
		padding: 70px 20px 95px 80px;
		background-size: 100% 100%;
		display: flex;
		column-gap: 160px;
		align-items: center;
		flex-direction: row-reverse;
		justify-content: flex-end;

		&:before
		{
			border-radius: 20px 20px 0px 0px;
			height: 20px;
			background: transparent;
			box-shadow: 0px -111px 0px 110px white;
			transform: skewy(3deg);
		}
		&:after
		{
			border-radius: 0px 0px 20px 20px;
			height: 20px;
			background: transparent;
			box-shadow: 0px 101px 0px 101px white;
			transform: skewy(-3deg);
		}
	}

}

@include mq($wd)
{
	.contacts-form
	{
		margin-bottom: 80px;

		&--without-contacts
		{
			.contacts-form__wr
			{
				padding: 70px 80px 95px;
				flex-direction: row-reverse;
				justify-content: space-between;
			}

			.contacts-form__info { max-width: 519px; }
		}
	}

	.contacts-form__wr
	{
		padding: 70px 20px 95px 80px;
		background-size: 100% 100%;
		flex-direction: row;
		justify-content: flex-start;

		&:before
		{
			border-radius: 20px 20px 0px 0px;
			height: 20px;
			background: transparent;
			box-shadow: 0px -111px 0px 110px white;
			transform: skewy(3deg);
		}
		&:after
		{
			border-radius: 0px 0px 20px 20px;
			height: 20px;
			background: transparent;
			box-shadow: 0px 101px 0px 101px white;
			transform: skewy(-3deg);
		}
	}

	.contacts-form__backdrop
	{
		&--top
		{
			background: url("/svg/contacts-form-bg-top-desktop.svg") no-repeat;
			top: 0;
		}

		&--bottom
		{
			bottom: 72px;
			right: -14px;
		}
	}

	.contacts-form__info
	{
		padding-top: 25px;
		order: 2;
		margin-bottom: 0;
	}

	.contacts-form__title
	{
		font-size: 32px;
		line-height: 37px;
	}

	.contacts-form__container
	{
		order: 1;
		max-width: 610px;
	}

	.contacts-form__headline
	{
		font-size: 26px;
		line-height: 30px;
	}

	.contacts-form__input
	{
		max-width: 300px;
		margin-bottom: 10px;

		.ui-input__field
		{
			font-size: 16px;
			line-height: 22px;
			padding: 12px 20px;

			&--textarea { min-height: 135px; }
		}

		&--textarea { max-width: 100%; }
	}

	.contacts-form__container-wr
	{
		flex-direction: row;
		justify-content: space-between;
		column-gap: 10px;
		align-items: center;

		.ui-checkbox { margin-bottom: 0; }
	}

	.contacts-form__submit
	{
		max-width: 254px;
		font-size: 18px;
		line-height: 27px;
		height: 46px;
	}

	.contacts-form__container-input
	{
		column-gap: 10px;
		input
		{
			min-width: 300px;
		}
	}
}
</style>
