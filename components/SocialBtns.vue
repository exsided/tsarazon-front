<template>
	<div class="social-btns">
		<a
			href="#"
			class="social-btns__item"
		>
			<TelegramSvg />
		</a>
		<a
			href="#"
			class="social-btns__item"
		>
			<WhatsappSvg />
		</a>
		<a
			href="#"
			class="social-btns__item"
		>
			<InstagramSvg />
		</a>
	</div>
</template>

<script setup>
import TelegramSvg from '~/assets/svg/telegram.svg?skipsvgo';
import WhatsappSvg from '~/assets/svg/whatsapp.svg?skipsvgo';
import InstagramSvg from '~/assets/svg/instagram.svg?skipsvgo';
</script>

<style lang="scss">
	.social-btns
	{
		display: flex;
		justify-content: center;
		gap: 8px;
	}
	.social-btns__item
	{
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F4F5F7;
		border-radius: 10px;
		width: 46px;
		height: 46px;

		svg { @include transition(); }

		&:active
		{
			svg { transform: scale(1.1); opacity: .8; }
		}
	}

	@media (hover: hover)
	{
		.social-btns__item
		{
			&:hover svg { transform: scale(1.1); opacity: .8; }
		}
	}
</style>
