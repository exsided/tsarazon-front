<template>
	<div class="share-btn">
		<div class="share-btn__img">
			<ShareSvg />
		</div>
		<span class="share-btn__text">Поделиться</span>
		<div
			:id="id"
			class="share-btn__action"
			data-curtain
			data-shape="round"
			data-limit="0"
			data-more-button-type="short"
			data-services="vkontakte,odnoklassniki,telegram,whatsapp"
		/>
	</div>
</template>

<script setup>
import ShareSvg from '~/assets/svg/share-btn.svg?skipsvgo';

defineProps({
	id:
	{
		type: String,
		default: 'share-btn'
	}
});
</script>

<style lang="scss">
.share-btn
{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 7px;
	max-height: 30px;
	cursor: pointer;
	position: relative;
	@include transition();

	.share-btn__img
	{
		border-radius: 7px;
		background: rgba(255, 255, 255, 0.5);
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.share-btn__text
	{
		display: none;
		@include transition();
	}

	path { @include transition(); }
}

.share-btn__action
{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	.ya-share2__list, .ya-share2__item { display: block !important; }
	.ya-share2__link
	{
		opacity: 0 !important;
	}

	.ya-share2__popup .ya-share2__link
	{
		opacity: 1 !important;
		&:hover { opacity: 0.85 !important; }
	}

	.ya-share2__container_mobile
	{
		.ya-share2__popup
		{
			.ya-share2__item { display: inline-block !important; }
		}
	}

	.ya-share2__container_size_m
	.ya-share2__item_more.ya-share2__item_has-pretty-view
	.ya-share2__link_more.ya-share2__link_more-button-type_short
	{
		padding: 0;
	}

	.ya-share2__popup.ya-share2__popup_mobile.ya-share2__popup_visible .ya-share2__popup-content
	{
		bottom: 50px;
		.ya-share2__mobile-popup-copy-link { display: flex; }
	}
}

@include mq($tablet)
{
	.share-btn
	{
		background: none;
		gap: 10px;
		padding: 0;

		&:hover
		{
			.share-btn__text { color: $orange; }

			path { stroke: $orange; }
		}

		.share-btn__text
		{
			display: inline;
			font-size: 14px;
			line-height: 19px;
			font-weight: 600;
			color: $blue;
		}
	}

	.share-btn
	{
		.ya-share2__popup.ya-share2__popup_mobile.ya-share2__popup_visible .ya-share2__popup-content
		{
			bottom: auto;
		}
	}
}

@include mq($wd)
{
	.share-btn
	{
		.share-btn__text
		{
			font-size: 18px;
			line-height: 25px;
		}

		svg
		{
			width: 16px;
			height: 16px;
		}
	}
}
</style>
