<template>
	<NuxtLayout name="default">
		<div class="catalog-page">
			<div class="container">
				<UiBreadcrumbs v-model:items="breadcrumbs" />
				<transition name="fade">
					<h1 v-if="title">
						{{ title }}
					</h1>
				</transition>
				<transition name="fade">
					<span
						v-if="pagination.total"
						class="catalog-page__subtitle"
					>
						{{ pagination.total }} {{ productsCountWord }}
					</span>
				</transition>
				<CategoriesVue
					v-if="categories.length"
					:items="categories"
					:base-path="router.currentRoute.value.path"
				/>
				<div class="catalog-page__content">
					<div :class="{open: filtersIsOpen}" class="catalog-page__filters">
						<FiltersVue
							v-model:filters="filters"
							class="catalog-page__desktop-filters"
							@apply="applyFilters"
						/>
						<CustomScrollbar class="catalog-page__mobile-filters">
							<FiltersVue
								v-model:filters="filters"
								@close="closeFilters"
								@apply="applyFilters"
							/>
						</CustomScrollbar>
					</div>
					<div
						v-if="filtersIsOpen"
						class="catalog-page__filters-overlay"
						@click="closeFilters"
					/>
					<div class="catalog-page__content-wr">
						<div class="catalog-page__actions">
							<div class="catalog-page__filters-btn" @click="openFilters">
								<FiltersSvg />
							</div>
							<UiSelect
								v-if="sortOptions.length"
								v-model="sort"
								:options="sortOptions"
								placeholder="Сортировка"
								@update:model-value="changeSort"
							/>
						</div>
						<EmptyCatalog v-if="isEmpty" />
						<template v-else>
							<CatalogItems :items="items" />
							<div v-if="showMoreItemsCount" class="catalog-items__more">
								<button class="catalog-item__more-btn button button--grey" @click="showMore">
									Показать еще {{ showMoreItemsCount }} товара
								</button>
							</div>
							<UiPagination
								v-model:current-page="pagination.currentPage"
								:per-page="pagination.perPage"
								:total="pagination.total"
								:total-pages="pagination.totalPages"
								@change="changePagination"
							/>
						</template>
						<ScrollTop />
					</div>
				</div>
			</div>
			<CollectiveList />
			<ProductsSlider />
			<ProductsSlider />
		</div>
	</NuxtLayout>
</template>

<script setup>
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import CategoriesVue from '~/components/Catalog/Categories.vue';
import CollectiveList from '~/components/Collective/List.vue';
import FiltersVue from '~/components/Catalog/Filters.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import UiSelect from '~/components/UI/Select.vue';
import ScrollTop from '~/components/ScrollTop.vue';
import CatalogItems from '~/components/Catalog/Items.vue';
import EmptyCatalog from '~/components/Catalog/Empty.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider.vue';

import FiltersSvg from '~/assets/svg/filters.svg?skipsvgo';

import { PRODUCTS_WORDS } from '~/consts/words.js';
import { NUM_WORD } from '~/helpers/formatters.js';
import { GET_RECURSIVE_ITEM_BY_PROPS } from '~/helpers/index.js';
import { useCatalogStore, useMainStore } from '~/store';
import catalogModule from '~/api/catalog.js';

const router = useRouter();

const mainStore    = useMainStore();
const catalogStore = useCatalogStore();

const slug = router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1];

const {
	fetchData,
	items,
	sort,
	sortOptions,
	filters,
	pagination,
	categories,
	loading,
	showMoreItemsCount,
	isEmpty,
} = useCatalog(catalogModule.fetchProducts, {
	_category: slug,
	_itemsBaseUrl: `${router.currentRoute.value.path}/product/`
});

const title             = ref('');
const productsCountWord = ref('');
const filtersIsOpen     = ref(false);

const instance = getCurrentInstance();

watch(loading, newState => mainStore[newState ? 'enableLoading' : 'disableLoading'](instance.uid));

const openFilters      = () => filtersIsOpen.value = true;
const closeFilters     = () => filtersIsOpen.value = false;
const changeSort       = () => fetchData(false, true);
const changePagination = () => fetchData(false, true);
const applyFilters     = () =>
{
	pagination.currentPage = 1;
	fetchData(false, true);
};
const showMore = () =>
{
	pagination.currentPage++;
	fetchData(false, true, true, true);
};

await fetchData(false, false, true, false, true);

const currentCategory = GET_RECURSIVE_ITEM_BY_PROPS(catalogStore.items, 'slug', 'childrens', slug);

title.value = currentCategory.title;

productsCountWord.value = NUM_WORD(items.value.length, PRODUCTS_WORDS);

const breadcrumbs = useCatalogBreadcrumbs(
	router.currentRoute.value.params.slug,
	[
		{ name: 'Главная', link: '/' },
		{ name: 'Каталог', link: '/catalog' },
	],
);

useHead({ title: title.value });
definePageMeta({ middleware: ['catalog'] });
</script>

<style lang="scss">
.catalog-page__subtitle
{
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: -0.01em;
	color: #222222;
	margin-bottom: 20px;
}

.catalog-page__actions
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;
}

.catalog-page__filters-btn
{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 34px;
	height: 34px;
	border-radius: 6px;
	background: #F4F5F7;
	margin-right: auto;

	svg
	{
		width: 20px;
		height: 18px;
	}
}

.catalog-page__filters-overlay
{
	display: none;
}

.catalog-page__mobile-filters { display: none !important; }
.catalog-page__content-wr { flex: 1; }

@include mq(0, $tablet - 1px )
{
	.catalog-page__filters
	{
		position: fixed;
		left: 0;
		top: 139px;
		z-index: 5;
		background-color: $white;
		transform: translateX(-100vw);
		@include transition();

		&.open
		{
			transform: translateX(0);
		}

		.custom-scrollbar { max-height: calc(100vh - 139px - 60px); }
	}

	.catalog-page__filters-overlay
	{
		position: fixed;
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: $black;
		opacity: .2;
		z-index: 3;
	}
	.catalog-page__desktop-filters { display: none; }
	.catalog-page__mobile-filters { display: block !important; }
}

@include mq($tablet){
	.catalog-page__subtitle
	{
		font-size: 14px;
		line-height: 18px;
	}

	.catalog-page__filters
	{
		display: block;
	}

	.catalog-page__filters-btn
	{
		display: none;
	}

	.catalog-page__actions
	{
		display: flex;
		justify-content: flex-end;
	}

	.catalog-page__content
	{
		display: flex;
		column-gap: 40px;
	}

	.catalog-page__actions
	{
		margin-bottom: 0;
	}
}

@include mq($wd){
	.catalog-page__subtitle
	{
		font-size: 16px;
		line-height: 21px;
		margin-bottom: 30px;
	}

	.catalog-page__content
	{
		display: flex;
		column-gap: 70px;
	}
}
</style>
