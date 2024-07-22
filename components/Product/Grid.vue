<template>
	<TabsVue
		:active-tab="activeTab"
		:list="tabs"
		:class="product-grid"
		@update:active-tab="setActiveCategory"
	>
		<transition name="fade">
			<LoaderVue v-if="!products || !products.length" />
		</transition>
		<div class="product-grid__items">
			<ProductCard
				v-for="product in products"
				:id="product.id"
				:key="product.id"
				:title="product.title"
				:pictures="product.pictures"
				:link="`${categoryLink || '/catalog'}/product/${product.slug}/${product.supplier}`"
				:price="product.price"
				:old-price="product.old_price"
				:quant="product.quant"
				:supplier-slug="product.supplier"
				:quant-unit="product.quant_unit"
			/>
		</div>
	</TabsVue>
</template>

<script setup>
import ProductCard from '~/components/Product/Card.vue';
import TabsVue from '~/components/Tabs.vue';
import LoaderVue from '~/components/Loader.vue';

defineProps({
	tabs:
	{
		type: Array,
		default: () => [],
	},
	products:
	{
		type: Array,
		default: () => [],
	},
	activeTab:
	{
		type: String,
		default: '',
	}
});

const emit = defineEmits(['update:active-tab']);

const setActiveCategory = code => emit('update:active-tab', code);
</script>

<style lang="scss">

	.product-grid
	{
		.tabs__menu
		{
			margin-bottom: 16px;
		}

		.tabs__content
		{
			position: relative;
			min-height: 260px;
		}

		.loader
		{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	.product-grid__items
	{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px 18px;
		margin-bottom: 20px;
	}

	@include mq($tablet)
	{
		.product-grid
		{
			.tabs__menu
			{
				margin-bottom: 36px;
			}
		}

		.product-grid__items
		{
			grid-template-columns: repeat(3, 1fr);
			gap: 30px 24px;
		}
	}

	@include mq($wd)
	{
		.product-grid
		{
			.tabs__menu
			{
				margin-bottom: 20px;
			}
		}

		.product-grid__items
		{
			grid-template-columns: repeat(5, 1fr);
			gap: 56px 32.5px;
			margin-bottom: 18px;
		}
	}
</style>
