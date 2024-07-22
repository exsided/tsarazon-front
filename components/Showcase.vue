<template>
	<TitleSection
		v-if="tabs.length"
		title="Витрина"
		class="showcase"
	>
		<template #default>
			<ProductGrid
				:tabs="tabs"
				:products="visibleItems"
				:active-tab="activeTab"
				@update:active-tab="setActiveCategory"
			/>
		</template>
		<template #bottom>
			<NuxtLink
				v-if="categoryLink"
				class="button button--light-blue"
				:to="categoryLink"
			>
				Смотреть все товары
			</NuxtLink>
		</template>
	</TitleSection>
</template>

<script setup>
import TitleSection from '@/components/TitleSection';
import ProductGrid from '~/components/Product/Grid.vue';

import { GET_RECURSIVE_ITEM_BY_PROPS } from '~/helpers/index.js';
import { useCatalogStore } from '~/store';
import catalogModule from '~/api/catalog.js';

const catalogStore = useCatalogStore();

const {
	activeTab,
	tabs,
	items,
	visibleItems,
	_setProducts,
	_setupData,
} = useShowcase();

const fetchCategories = async () =>
{
	const { data, error } = await catalogModule.fetchShowcaseCategories();

	if (error.value)
	{
		// eslint-disable-next-line no-console
		console.log('ProductGrid/fetchCategories', error.value);
		activeTab.value = '';
		return;
	}

	const { _tabs } = _setupData(data.value.data, 'title', 'slug');

	await nextTick();

	setActiveCategory(_tabs[0].code);
};

const setActiveCategory = async (code) =>
{
	activeTab.value = code;

	if (!items.value[code].length)
		await fetchProductsBySlug(code);
};

const fetchProductsBySlug = async (code) =>
{
	const { data, error } = await catalogModule.fetchShowcaseProducts(code);

	if (error.value)
	{
		// eslint-disable-next-line no-console
		console.log('ProductGrid/fetchProductsBySlug', error.value);
		activeTab.value = '';
		return;
	}

	if (data.value)
		_setProducts(data.value.data.data, code);
};

onMounted(() =>
{
	setTimeout(() => fetchCategories());
});

const categoryLink = computed(() =>
{
	if (activeTab.value)
		return GET_RECURSIVE_ITEM_BY_PROPS(catalogStore.getCategoriesWithLinks, 'slug', 'childrens', activeTab.value)?.path || '';
	return '';
});
</script>

<style lang="scss">

	.showcase
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

	.showcase__items
	{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px 18px;
		margin-bottom: 20px;
	}

	@include mq($tablet)
	{
		.showcase
		{
			.tabs__menu
			{
				margin-bottom: 36px;
			}
		}

		.showcase__items
		{
			grid-template-columns: repeat(3, 1fr);
			gap: 30px 24px;
		}
	}

	@include mq($wd)
	{
		.showcase
		{
			.tabs__menu
			{
				margin-bottom: 20px;
			}
		}

		.showcase__items
		{
			grid-template-columns: repeat(5, 1fr);
			gap: 56px 32.5px;
			margin-bottom: 18px;
		}
	}
</style>
