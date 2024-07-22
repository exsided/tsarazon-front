<template>
	<div class="header-menu container">
		<div class="header-menu__heading">
			<p class="header-menu__logo">
				Царазон
			</p>
			<p class="header-menu__city">
				{{ city }}
			</p>
			<div class="header-menu__close" @click="close">
				<CrossMarkSvg />
			</div>
		</div>
		<div class="header-menu__catalog">
			Каталог
			<img src="/img/header-menu-catalog.png">
		</div>
		<div class="header-menu__links">
			<NuxtLink
				v-for="link, i in links"
				:key="i"
				:to="link.href"
			>
				{{ link.name }}
			</NuxtLink>
		</div>
		<div class="header-menu__social">
			<p class="header-menu__abs">
				Царазон в социальных сетях
			</p>
			<SocialBtns />
		</div>
		<div class="header-menu__feedback">
			<p class="header-menu__abs">
				Обратная связь
			</p>
			<p class="header-menu__abs">
				Режим работы пунктов выдачи:
			</p>
			<span class="header-menu__abs header-menu__abs--small">
				Ежедневно с 9:00 до 18:00
			</span>
			<a class="header-menu__feedback-link" href="tel:+78002011069">
				<PhoneSvg />
				+7 (800) 201-10-69
			</a>
			<a class="header-menu__feedback-link" href="mailto:info@tsarazon.ru">
				<MailSvg />
				info@tsarazon.ru
			</a>
		</div>
	</div>
</template>

<script setup>
import SocialBtns from '~/components/SocialBtns.vue';

import CrossMarkSvg from '~/assets/svg/cross-mark.svg?skipsvgo';
import PhoneSvg from '~/assets/svg/phone.svg?skipsvgo';
import MailSvg from '~/assets/svg/mail.svg?skipsvgo';

const links =
		[
			{ name: 'Акции', href: '#' },
			{ name: 'Хиты', href: '#' },
			{ name: 'Новинки', href: '#' },
			{ name: 'Летний сезон', href: '#' },
			{ name: 'Здоровый выбор', href: '#' },
		];

const city = computed(() => 'Москва');

const emit = defineEmits(['close']);

const close = () => emit('close');
</script>

<style lang="scss">
	.header-menu
	{
		position: fixed;
		background-color: #FFFFFF;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 20;
		padding-top: 8px;
		padding-bottom: 60px;
		overflow: auto;
	}
	.header-menu__heading
	{
		position: relative;
		border-bottom: 1px solid #F4F5F7;
		background-position: 8px;
		margin-bottom: 30px;
	}
	.header-menu__close
	{
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F4F5F7;
		border-radius: 30px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		right: 0;
		top: 10px;

		svg
		{
			width: 12px;
			height: 12px;
		}

		path { @include transition(); }

		&:active path { stroke: $blue; }
	}
	.header-menu__catalog
	{
		position: relative;
		padding: 7px 10px 10px;
		background-color: #F4F5F7;
		border-radius: 10px;
		font-weight: 600;
		font-size: 14px;
		line-height: 19px;
		cursor: pointer;
		margin-bottom: 25px;
		@include transition();

		img
		{
			position: absolute;
			right: 0;
			top: -14px;
			height: 59px;
		}

		&:active { color: $blue; }
	}
	.header-menu__logo
	{
		font-weight: 700;
		font-size: 22px;
		line-height: 33px;
		color: $blue;
		margin-bottom: 5px;
	}
	.header-menu__city
	{
		font-size: 12px;
		line-height: 15px;
		color: #868799;
	}
	.header-menu__links
	{
		margin-bottom: 50px;

		a
		{
			display: block;
			font-weight: 700;
			font-size: 16px;
			line-height: 22px;
			margin-bottom: 16px;
			@include transition();

			&:active { color: $blue; }
		}
	}
	.header-menu__abs
	{
		display: block;
		font-weight: 600;
		font-size: 12px;
		line-height: 15px;
		color: #868799;
		text-align: center;

		&--small
		{
			font-weight: 400;
			font-size: 14px;
			line-height: 19px;
		}
	}
	.header-menu__social
	{
		border-top: 1px solid #F4F5F7;
		padding: 12px 0 0;
		margin-bottom: 50px;

		p
		{
			margin-bottom: 12px;
		}
	}
	.header-menu__feedback
	{
		display: flex;
		flex-direction: column;
		align-items: center;

		.header-menu__abs
		{
			&:nth-child(1) { margin-bottom: 12px; }
			&:nth-child(2) { margin-bottom: 5px; }
			&:nth-child(3) { margin-bottom: 20px; }
		}
	}
	.header-menu__feedback-link
	{
		display: flex;
		font-weight: 700;
		font-size: 16px;
		line-height: 22px;
		color: #868799;

		svg
		{
			width: 20px;
			height: auto;
			margin-right: 6px;
		}

		&:first-of-type
		{
			svg
			{
				path
				{
					stroke: $blue;
					fill: $blue;
				}
			}
		}
	}
</style>
