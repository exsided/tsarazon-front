<template>
	<div class="product-heading">
		<div class="product-heading__title">
			<h1>
				{{ title }}
			</h1>
			<ShareBtn />
		</div>
		<div class="product-heading__nav">
			<div class="product-heading__info">
				<p class="product-heading__info-details">
					{{ quant }} {{ quantUnit }} в упаковке
				</p>
				<p class="product-heading__info-details">
					Арт. {{ vendorCode }}
				</p>
			</div>
			<div class="product-heading__links">
				<NuxtLink
					to="#description"
					class="product-heading__link"
					@click="onClickAnchor('description')"
				>
					Описание товара
				</NuxtLink>
				<NuxtLink
					to="#collective"
					class="product-heading__link"
					@click="onClickAnchor('collective')"
				>
					Коллективные закупки
				</NuxtLink>
				<NuxtLink
					to="#properties"
					class="product-heading__link"
					@click="onClickAnchor('properties')"
				>
					Характеристики
				</NuxtLink>
				<NuxtLink
					to="#recomends"
					class="product-heading__link"
					@click="onClickAnchor('recomends')"
				>
					Рекомендуемые товары
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import ShareBtn from '~/components/ShareBtn.vue';

defineProps({
	title:
	{
		type: String,
		default: '',
	},
	quant:
	{
		type: String,
		default: '',
	},
	quantUnit:
	{
		type: String,
		default: '',
	},
	vendorCode:
	{
		type: String,
		default: ''
	},
});
const emit = defineEmits(['click-on-anchor']);

const onClickAnchor = hash => emit('click-on-anchor', hash);
</script>

<style lang="scss">
	.product-heading__title
	{
		display: flex;
		justify-content: space-between;

		h1
		{
			font-size: 16px;
			font-family: 'Ubuntu';
			line-height: 22px;
			margin-bottom: 10px;
		}

		.share-btn
		{
			display: none;
		}
	}

	.product-heading__nav
	{
		display: flex;
		justify-content: space-between;
		padding-bottom: 6px;
		border-bottom: 1px solid #F4F5F7;
		margin-bottom: 30px;

		p { margin: 0; }
	}

	.product-heading__info
	{
		display: flex;
		gap: 22px;
	}

	.product-heading__info-details
	{
		color: #868799;
		font-size: 10px;
		line-height: 14px;
	}

	.product-heading__links { display: none; }

	@include mq($tablet)
	{
		.product-heading
		{
			h1
			{
				font-size: 20px;
				line-height: 26px;
			}
		}

		.product-heading__links
		{
			display: flex;
			gap: 20px;
		}
		.product-heading__link
		{
			color: #868799;
			font-size: 9px;
			line-height: 12px;
			font-weight: 600;
			@include transition();

			@include hover()
			{
				color: $blue;
			}
		}
	}

	@include mq($wd)
	{
		.product-heading
		{
			h1
			{
				font-size: 28px;
				line-height: 34px;
				margin-bottom: 16px;
				max-width: 850px;
			}
		}

		.product-heading__title
		{
			.share-btn
			{
				display: flex;
			}
		}

		.product-heading__info
		{
			gap: 60px;
		}

		.product-heading__info-details
		{
			font-size: 16px;
			line-height: 22px;
		}

		.product-heading__links
		{
			gap: 40px;
		}

		.product-heading__link
		{
			font-size: 14px;
			line-height: 19px;
		}
	}
</style>
