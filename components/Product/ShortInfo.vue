<template>
	<div class="product-short-info">
		<p class="product-short-info__title">
			Характеристики товара
		</p>
		<div class="product-short-info__table">
			<div
				v-if="productType"
				class="product-short-info__table-row"
			>
				<p class="product-short-info__text">
					Тип
				</p>
				<p class="product-short-info__text">
					{{ productType }}
				</p>
			</div>
			<div
				v-for="property, i in properties"
				:key="i"
				class="product-short-info__table-row"
			>
				<p class="product-short-info__text">
					{{ property.title }}
				</p>
				<p class="product-short-info__text">
					{{ property.value }}
				</p>
			</div>
		</div>
		<NuxtLink
			class="product-short-info__link"
			to="#properties"
			@click="gotoProperties"
		>
			Перейти к характеристикам товара
		</NuxtLink>
	</div>
</template>

<script setup>
defineProps({
	productType:
	{
		type: String,
		default: '',
	},
	properties:
	{
		type: Array,
		default: () => ([]),
	},
});
const emit = defineEmits(['goto-properties']);

const gotoProperties = () => emit('goto-properties');
</script>

<style lang="scss">
	.product-short-info
	{
		margin-bottom: 52px;
	}

	.product-short-info__title
	{
		color: #868799;
		font-size: 12px;
		line-height: 16px;
		margin-bottom: 8px;
	}

	.product-short-info__table
	{
		display: flex;
		flex-direction: column;
	}

	.product-short-info__table-row
	{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.product-short-info__text
	{
		font-size: 14px;
		line-height: 19px;
		margin: 0;
	}

	.product-short-info__link
	{
		color: #F69421;
		font-size: 14px;
		line-height: 19px;
	}

	@include mq($tablet)
	{
		.product-short-info
		{
			margin-bottom: 12px;
		}
	}

	@include mq($wd)
	{
		.product-short-info
		{
			margin-bottom: 56px;
		}
	}
</style>
