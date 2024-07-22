<template>
	<NuxtLayout name="default">
		<div class="container">
			<UiBreadcrumbs v-model:items="breadcrumbs" />
			<h1 class="catalog-page__title">
				{{ title }}
			</h1>
			<div class="catalog-page__wr">
				<GridItem
					v-for="item in categories"
					:key="item.id"
					:name="item.title"
					:img="item.picture"
					:slug="item.slug"
				/>
			</div>
		</div>
		<ScrollTop />
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import GridItem from '~/components/Catalog/GridItem.vue';
import ScrollTop from '~/components/ScrollTop.vue';
import { useCatalogStore } from '~/store';

const breadcrumbs = reactive([
	{ name: 'Главная', link: '/' },
	{ name: 'Каталог', link: '/catalog' },
]);
const title = 'Каталог';
const catalogStore = useCatalogStore();

const categories = computed(() =>
{
	return catalogStore.getCategoriesWithLinks.map(({ id, title, picture, slug }) => ({
		id,
		title,
		picture,
		slug
	}));
});
useHead({ title: 'Каталог' });
</script>

<style lang="scss">
	.catalog-page__title
	{
		font-family: "Ubuntu", sans-serif;
		font-size: 26px;
		font-weight: 700;
		line-height: 38px;
		margin-bottom: 10px;
	}

	.catalog-page__wr
	{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px 16px;
		margin-bottom: 50px;
	}

	@include mq($tablet)
	{
		.catalog-page__title
		{

			margin-bottom: 20px;
		}

		.catalog-page__wr
		{
			grid-template-columns: repeat(4, 1fr);
			margin-bottom: 70px;
		}
	}

	@include mq($wd)
	{
		.catalog-page__title
		{
			margin-bottom: 30px;
		}

		.catalog-page__wr
		{
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 40px 30px;
			margin-bottom: 100px;
		}
	}
</style>
