<template>
	<div class="slk-menu container">
		<h2 class="slk-menu__title">
			Загрузить список товаров из Excel-файла
		</h2>
		<div class="slk-menu__row">
			<div class="slk-menu__block">
				<div class="slk-menu__name">
					<h3 class="slk-menu__name-text">
						{{ companyName }}
					</h3>
					<VerifiedCheckSvg class="slk-menu__verified" />
				</div>
				<NuxtLink to="/slk#edit" class="slk-menu__edit">
					Редактировать профиль
				</NuxtLink>
			</div>

			<button class="button button--blue slk-menu__button">
				<CheckedSvg class="slk-menu__button-icon" />
				<span class="slk-menu__button-text">
					Актуально
				</span>
			</button>

			<div class="slk-menu__list">
				<NuxtLink to="/lk" class="slk-menu__item">
					<UserSvg />
					Профиль
					<span class="slk-menu__item-circle">1</span>
				</NuxtLink>
				<NuxtLink to="/lk" class="slk-menu__item">
					<CartSvg />
					Товары
					<span class="slk-menu__item-circle">2</span>
				</NuxtLink>
				<NuxtLink to="/lk" class="slk-menu__item">
					<BoxSvg />
					Заказы
					<span class="slk-menu__item-circle">1</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import CheckedSvg from '~/assets/svg/checked-marker-slk.svg?skipsvgo';
import VerifiedCheckSvg from '~/assets/svg/verified-check.svg?skipsvgo';
import CartSvg from '~/assets/svg/shopping-cart.svg?skipsvgo';
import UserSvg from '~/assets/svg/user.svg?skipsvgo';
import BoxSvg from '~/assets/svg/box.svg?skipsvgo';

import { useUserStore } from '~/store';

const userStore = useUserStore();

const companyName = computed(() => userStore.user.organization_name || userStore.user.name);
</script>
<style lang="scss">
	.slk-menu
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 50px 0 33px 0;
	}

	.slk-menu__title
	{
		font-family: Ubuntu;
		font-size: 19px;
		line-height: 28px;
		font-weight: 500;
		color: #000;
		margin-bottom:30px;
	}

	.slk-menu__name-text
	{
		color: #2C2C2C;
		font-size: 16px;
		font-weight: 600;
		line-height: 22px;
		margin: 0 10px 0 0;
	}

	.slk-menu__block{ width: 100%; }

	.slk-menu__row
	{
		display: flex;
		flex-wrap: wrap;
	}

	.slk-menu__name
	{
		display: flex;
		align-items: center;
		margin-bottom:5px;
		word-break: break-all;
	}

	.slk-menu__edit
	{
		color: #3772FE;
		font-weight: 600;
		font-size: 11px;
		line-height: 15px;
		text-decoration: underline;
		display: block;
		margin-bottom: 20px;
		&:hover{ text-decoration: underline; }
	}

	.slk-menu__verified
	{
		min-width: 30px;
		min-height: 30px;
	}

	.slk-menu__button{ margin: 0 30px 30px 0; }

	.slk-menu__button-icon{ margin: 0 9px 0 10px; }

	.slk-menu__button-text
	{
		color: #ffffff;
		font-weight: 600;
		font-size: 14px;
		line-height: 19px;
		margin-right: 10px;
	}

	.slk-menu__list
	{
		display: flex;
		width: 100%;
	}

	.slk-menu__item
	{
		position: relative;
		display: flex;
		font-weight: 600;
		font-size: 16px;
		line-height: 22px;
		margin-right: 27px;
		height:fit-content;
		@include transition();

		&:hover
		{
			color: $blue;

			path { stroke: $blue; }
		}

		svg
		{
			display: none;
			margin-right: 8px;
		}

		path { @include transition(); }
	}

	.slk-menu__item-circle
	{
		background: #F69421;
		position: absolute;
		border-radius: 50%;
		font-weight: 400;
		font-size: 8px;
		color: #ffffff;
		line-height: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		right: -10px;
		padding: 0.5px 3px;
		font-family: OpenSans;
	}

	@include mq($tablet)
	{
		.slk-menu__title
		{
			font-size: 26px;
			line-height: 38px;
			margin-bottom: 36px;
		}

		.slk-menu__name-text
		{
			font-size: 20px;
		}

		.slk-menu__item
		{
			font-size: 20px;
			margin-right: 40px;

			svg
			{
				display: inline;
				width: 17px;
				height: 18px;
			}
		}

		.slk-menu__block
		{
			width: auto;
			max-width: 500px;
		}

		.slk-menu__button{ margin: -6px 0 0 auto; }

		.slk-menu__edit{ margin-bottom: 33px; }

		.slk-menu__item-circle
		{
			font-size: 10px;
			line-height: 9px;
			padding: 1px 3.5px;
		}

		.slk-import__list{ padding-left:5px; }
	}
	@include mq($desktop)
	{
		.slk-menu__name{ margin-bottom: 10px; }

		.slk-menu__name-text
		{
			margin: 0 15px 0 0;
		}

		.slk-menu__item
		{
			margin-right: 48px;
			font-size: 22px;

			svg
			{
				width: 20px;
				height: 20px;
			}
		}

		.slk-menu__list
		{
			margin-top: 7px;
			width: auto;
		}

		.slk-menu__button-text
		{
			margin-right: 20px;
			width: auto;
		}

		.slk-menu__block
		{
			margin-right: 60px;
			max-width:250px;
		}

		.slk-menu__button-icon{ margin: 0 15px 0 20px }

		.slk-menu__button{ order: 3;}

		.slk-menu__row{ margin-bottom: 15px;}

		.slk-menu{ margin: 50px auto 0 auto; }
	}

	@include mq($wd)
	{
		.slk-menu__item-circle
		{
			top: -5px;
			right: -20px;
			padding: 4.5px 6px;
			font-size: 14px;
		}

		.slk-menu__block
		{
			max-width:465px;
			margin-right: 140px;
		}

		.slk-menu__button
		{
			margin: -5px 0 0 auto;
			padding: 22px 27px;
		}
	}
</style>
