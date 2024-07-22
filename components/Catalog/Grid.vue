<template>
	<TitleSection
		title="Каталог"
		class="catalog-grid-"
	>
		<div class="catalog-grid__wr">
			<CatalogGridItem
				v-for="item, i in items"
				:key="i"
				:name="item.name"
				:img="item.img"
				:slug="item.slug"
			/>
		</div>
	</TitleSection>
</template>

<script setup>
import TitleSection from '@/components/TitleSection';
import CatalogGridItem from '@/components/Catalog/GridItem.vue';

import { CATALOG } from '~/consts/test';

const items = CATALOG.list;

</script>

<style lang="scss">
	.catalog-grid__wr
	{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px 16px;
	}

	@include mq($tablet)
	{
		.catalog-grid__wr
		{
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@include mq($wd)
	{
		.catalog-grid__wr
		{
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 40px 30px;
		}
	}
</style>
