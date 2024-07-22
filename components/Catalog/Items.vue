<template>
	<div class="catalog-items">
		<ProductCard
			v-for="item in items"
			:id="item.id"
			:key="item.id"
			:title="item.title"
			:pictures="item.pictures"
			:link="item.link"
			:price="item.price"
			:old-price="item.old_price"
			:quant="item.quant"
			:supplier-slug="item.supplier"
			:quant-unit="item.quant_unit"
		/>
	</div>
</template>

<script setup>
import ProductCard from '~/components/Product/Card.vue';
const props = defineProps({
	items:
	{
		type: Array,
		default: () => [],
	},
});
</script>

<style lang="scss">
.catalog-items
{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 30px 18px;
	margin-bottom: 37px;
}

.catalog-items__more
{
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

@include mq($tablet)
{
	.catalog-items
	{
		gap: 30px 24px;
		margin-bottom: 30px;
	}
	.catalog-items__more-btn
	{
		font-size: 15px;
		line-height: 21px;
	}
}

@include mq($desktop)
{
	.catalog-items
	{
		grid-template-columns: repeat(3, 1fr);
	}
}

@include mq(1280px)
{
	.catalog-items
	{
		grid-template-columns: repeat(4, 1fr);
	}
}

@include mq($wd)
{
	.catalog-items
	{
		grid-template-columns: repeat(3, 1fr);
		gap: 30px 24px;
		margin-bottom: 46px;
	}
	.catalog-items__more-btn
	{
		font-size: 19px;
		line-height: 26px;
	}
}
@include mq(1540px)
{
	.catalog-items
	{
		grid-template-columns: repeat(4, 1fr);
		gap: 30px 24px;
		margin-bottom: 46px;
	}
}
</style>
