<template>
	<div class="auth-popup" :class="view">
		<template v-if="view === 'recovery'">
			<h3 class="auth-popup__recovery-title">
				<ArrowLeftSvg @click.prevent.stop="view = 'auth'" />
				Восстановление пароля
			</h3>
			<RecoveryForm @success="recoveryHandler" />
		</template>
		<template v-if="view === 'confirm'">
			<h3 class="auth-popup__recovery-title">
				Подтверждение телефона
			</h3>
			<RecoveryForm
				is-confirm-popup
				:user-data="userData"
				@auth="authHandler"
				@success="recoveryHandler"
			/>
		</template>
		<template v-if="view === 'regist' || view === 'auth'">
			<h3 class="auth-popup__heading">
				<span :class="{active: view === 'regist'}" @click="view = 'regist'">Регистрация</span>
				или
				<span :class="{active: view === 'auth'}" @click="view = 'auth'">Войти</span>
			</h3>
			<RegistForm
				v-if="view === 'regist'"
				@success-phis-regist="phisRegistHandler"
				@success-org-regist="orgRegistHandler"
			/>
			<AuthForm
				v-if="view === 'auth'"
				@success="authHandler"
				@recovery="showRecovery"
			/>
		</template>
	</div>
</template>

<script setup>
import AuthForm from '~/components/Forms/AuthForm.vue';
import RegistForm from '~/components/Forms/RegistForm.vue';
import RecoveryForm from '~/components/Forms/RecoveryForm.vue';

import ArrowLeftSvg from '~/assets/svg/arrow-left.svg?skipsvgo';

import { usePopupsStore } from '~/store';

const popupsStore = usePopupsStore();
const emit = defineEmits('close');

const _userInit = useUserInit();

const userData = ref({});
const view = ref('auth');

const showRecovery = () => view.value = 'recovery';

const authHandler = (token) =>
{
	emit('close');

	_userInit(token);
};

const orgRegistHandler = () =>
{
	popupsStore.setState(['MsgPopup', true]);
	popupsStore.setData({ showSuccesIcon: true, msg: 'Спасибо! <br> Ваша заявка отправлена!' });
};

const phisRegistHandler = (userRegistData) =>
{
	userData.value = userRegistData;
	view.value = 'confirm';
};

const recoveryHandler = () =>
{
	emit('close');
	setTimeout(() =>
	{
		popupsStore.setState(['MsgPopup', true]);
		popupsStore.setData({
			showSuccesIcon: true,
			msg: 'Ваш пароль восстановлен',
			closeCallback: () => popupsStore.setState(['AuthPopup', true])
		});
	}, 100);
};
</script>

<style lang="scss">
	.auth-popup
	{
		padding-bottom: 30px;

		&.auth
		{
			.auth-popup__heading
			{
				&:after
				{
					left: calc(100% - 56px);
					width: 56px;
				}
			}
		}
	}
	.auth-popup__heading
	{
		position: relative;
		font-family: 'Ubuntu';
		font-weight: 500;
		font-size: 19px;
		line-height: 22px;
		color: $gray;
		padding-bottom: 8px;
		width: fit-content;
		margin-bottom: 48px;

		span
		{
			color: $black;
			cursor: pointer;
			@include transition();

			&.active { color: $blue; }
		}

		&:after
		{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 114px;
			height: 2px;
			background-color: $blue;
			@include transition();
		}

		&:before
		{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2px;
			background-color: $lgray;
		}
	}
	.auth-popup__recovery-title
	{
		display: flex;
		align-items: center;
		font-family: 'Ubuntu';
		font-weight: 500;
		font-size: 19px;
		line-height: 22px;
		color: $black;
		margin-bottom: 40px;

		svg
		{
			margin-right: 14px;
			height: 22px;
			cursor: pointer;
		}
		path { stroke-width: 1px; stroke: #000000; }
	}

	@include mq($tablet)
	{
		.auth-popup
		{
			width: 420px;

			&.auth
			{
				.auth-popup__heading
				{
					&:after
					{
						left: calc(100% - 65px);
						width: 65px;
					}
				}
			}
		}
		.auth-popup__heading
		{
			margin-bottom: 40px;
			font-size: 22px;
			line-height: 25px;
			padding-bottom: 11px;

			&:after, &:before { height: 3px; }

			&:after { width: 135px; }
		}
		.auth-popup__recovery-title
		{
			font-size: 22px;
			line-height: 25px;
		}
	}
</style>
