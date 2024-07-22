<template>
	<div class="lk-menu">
		<div class="lk-menu__heading">
			<h2 class="lk-menu__title">
				Александр Кочесов
			</h2>
			<NuxtLink
				to="/lk#edit"
				class="lk-menu__heading-link"
				@click="clickOnLink('/lk#edit')"
			>
				Редактировать профиль
			</NuxtLink>
		</div>
		<div class="lk-menu__list">
			<div class="lk-menu__item">
				<div class="lk-menu__item-wr">
					<ProfileSvg />
					<NuxtLink
						to="#"
						class="lk-menu__item-link"
						@click="clickOnLink('#')"
					>
						Профиль
					</NuxtLink>
				</div>
			</div>
			<div class="lk-menu__item">
				<div class="lk-menu__item-wr">
					<CartSvg />
					<NuxtLink
						to="#"
						class="lk-menu__item-link"
						@click="clickOnLink('#')"
					>
						Корзина
					</NuxtLink>
					<MenuMeter count="23" class="lk-menu__meter" />
				</div>
			</div>
			<div class="lk-menu__item">
				<div class="lk-menu__item-wr">
					<OrdersSvg />
					<NuxtLink
						to="#"
						class="lk-menu__item-link"
						@click="clickOnLink('#')"
					>
						Заказы
					</NuxtLink>
					<MenuMeter count="6" class="lk-menu__meter" />
				</div>
				<div class="lk-menu__content">
					<NuxtLink
						to="#"
						class="lk-menu__content-link"
						@click="clickOnLink('#')"
					>
						Все
					</NuxtLink>
					<NuxtLink
						to="#"
						class="lk-menu__content-link"
						@click="clickOnLink('#')"
					>
						Коллективные
					</NuxtLink>
					<NuxtLink
						to="#"
						class="lk-menu__content-link"
						@click="clickOnLink('#')"
					>
						Индивидуальные
					</NuxtLink>
				</div>
			</div>
			<div class="lk-menu__item">
				<div class="lk-menu__item-wr">
					<BellSvg />
					<NuxtLink
						to="#"
						class="lk-menu__item-link"
						@click="clickOnLink('#')"
					>
						Уведомления
					</NuxtLink>
					<MenuMeter count="6" class="lk-menu__meter" />
				</div>
			</div>
			<div class="lk-menu__item">
				<div class="lk-menu__item-wr">
					<FeedbackSvg />
					<NuxtLink
						to="#"
						class="lk-menu__item-link"
						@click="clickOnLink('#')"
					>
						Обратная связь
					</NuxtLink>
				</div>
				<div class="lk-menu__content">
					<NuxtLink
						to="#"
						class="lk-menu__content-link"
						@click="clickOnLink('#')"
					>
						Задать вопрос
					</NuxtLink>
				</div>
			</div>
			<div class="lk-menu__item">
				<div
					class="lk-menu__item-wr"
					@click="logout"
				>
					<ExitSvg />
					<div class="lk-menu__item-link lk-menu__item-link--orange">
						Выйти
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import MenuMeter from '~/components/LK/Meter.vue';

import ProfileSvg from '~/assets/svg/menu-profile.svg?skipsvgo';
import CartSvg from '~/assets/svg/menu-cart.svg?skipsvgo';
import OrdersSvg from '~/assets/svg/menu-orders.svg?skipsvgo';
import BellSvg from '~/assets/svg/menu-bell.svg?skipsvgo';
import FeedbackSvg from '~/assets/svg/menu-feedback.svg?skipsvgo';
import ExitSvg from '~/assets/svg/menu-exit.svg?skipsvgo';

const router = useRouter();

const emit = defineEmits(['logout', 'click-on-link']);
const _logout = useLogout();

const logout = () =>
{
	emit('logout');
	setTimeout(() => _logout(), 500);
};

const clickOnLink = (path) =>
{
	emit('click-on-link');

	if (router.currentRoute.value.href === path)
		setTimeout(() => router.replace(path), 10);
};
</script>

<style lang="scss">
.lk-menu
{
	display: none;
	max-width: 171px;
}

.lk-menu__heading
{
	margin-bottom: 40px;
}

.lk-menu__title
{
	font-size: 20px;
	line-height: 27px;
	font-weight: 600;
	margin-bottom: 5px;
}

.lk-menu__heading-link
{
	display: block;
	color: $blue;
	font-size: 12px;
	line-height: 16px;
	font-weight: 600;
	text-decoration-line: underline;
	@include transition();

	&:hover
	{
		color: $orange;
	}
}

.lk-menu__list
{
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.lk-menu__item-wr
{
	display: flex;
	align-items: center;
	max-height: 20px;

	svg
	{
		min-width: 16px;
		min-height: 16px;
		margin-right: 4px;
	}
}

.lk-menu__item-link
{
	font-family: 'Ubuntu';
	font-size: 16px;
	line-height: 20px;
	font-weight: 500;
	cursor: pointer;
	@include transition();

	&:hover
	{
		color: $blue;
	}

	&--orange
	{
		color: $orange;
	}
}

.lk-menu__meter
{
	align-self: flex-start;
	display: flex;
	align-items: center;
	justify-content: center;
}

.lk-menu__content
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 16px;
	padding-left: 22px;
}

.lk-menu__content-link
{
	color: $gray;
	font-size: 15px;
	line-height: 20px;
	@include transition();

	&:hover
	{
		color: $blue;
	}
}

@include mq($tablet)
{
	.lk-menu
	{
		display: block;
	}
}

@include mq($wd)
{
	.lk-menu__item-link
	{
		font-size: 18px;
		line-height: 20px;
	}
}
</style>
