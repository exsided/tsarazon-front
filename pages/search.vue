<template>
	<NuxtLayout name="default">
		<div class="search-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
				<transition name="fade">
					<h1 v-if="pageIsLoaded">
						{{ title }}
					</h1>
				</transition>
				<div class="search-page__content">
					<div :class="{open: filtersIsOpen}" class="search-page__filters">
						<FiltersVue
							v-model:filters="filters"
							class="search-page__desktop-filters"
							@apply="applyFilters"
						/>
						<CustomScrollbar class="search-page__mobile-filters">
							<FiltersVue
								v-model:filters="filters"
								@close="closeFilters"
								@apply="applyFilters"
							/>
						</CustomScrollbar>
					</div>
					<div
						v-if="filtersIsOpen"
						class="search-page__filters-overlay"
						@click="closeFilters"
					/>
					<div class="search-page__content-wr">
						<div class="search-page__actions">
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
			<ProductsSlider />
			<ProductsSlider />
		</div>
	</NuxtLayout>
</template>

<script setup>
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import FiltersVue from '~/components/Catalog/Filters.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import UiSelect from '~/components/UI/Select.vue';
import ScrollTop from '~/components/ScrollTop.vue';
import CatalogItems from '~/components/Catalog/Items.vue';
import EmptyCatalog from '~/components/Catalog/Empty.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider.vue';

import FiltersSvg from '~/assets/svg/filters.svg?skipsvgo';

import { PRODUCTS_WORDS, FINDED_WORDS } from '~/consts/words.js';
import { NUM_WORD } from '~/helpers/formatters.js';

import { useMainStore } from '~/store';
import catalogModule from '~/api/catalog.js';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Страница поиска', link: '/search' }];
useHead({ title: 'Результаты поиска' });

const router = useRouter();
const {
	fetchData,
	items,
	sort,
	sortOptions,
	filters,
	pagination,
	loading,
	showMoreItemsCount,
	query,
	isEmpty,
} = useCatalog(catalogModule.search, {
	_itemsBaseUrl: '/catalog/product/'
});

const mainStore = useMainStore();

query.value = router.currentRoute.value.query.query;

const pageIsLoaded  = ref(false);
const filtersIsOpen = ref(false);

const instance = getCurrentInstance();

const title = computed(() => `${NUM_WORD(pagination.total, FINDED_WORDS)} ${pagination.total} ${NUM_WORD(pagination.total, PRODUCTS_WORDS)}`);

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

const init = async (needGetDataFromHistory = false) =>
{
	query.value = router.currentRoute.value.query.query;

	await fetchData(false, true, needGetDataFromHistory);

	pageIsLoaded.value = true;
};

watch(loading, newState => mainStore[newState ? 'enableLoading' : 'disableLoading'](instance.uid));

init(true);

onBeforeRouteUpdate(async (to, from, next) =>
{
	await next();

	if (to.name === from.name)
		setTimeout(() => init());
});

definePageMeta({
	middleware: ['search']
});
</script>

<style lang="scss">
.search-page
{
	h1
	{
		&::first-letter { text-transform: uppercase; }
	}
}
.search-page__actions
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

.search-page__filters-overlay
{
	display: none;
}

.search-page__mobile-filters { display: none !important; }
.search-page__content-wr { flex: 1; }

@include mq(0, $tablet - 1px)
{
	.search-page__filters
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

	.search-page__filters-overlay
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
	.search-page__desktop-filters { display: none; }
	.search-page__mobile-filters { display: block !important; }
}

@include mq($tablet)
{
	.search-page__filters
	{
		display: block;
	}

	.catalog-page__filters-btn
	{
		display: none;
	}

	.search-page__actions
	{
		display: flex;
		justify-content: flex-end;
	}

	.search-page__content
	{
		display: flex;
		column-gap: 40px;
	}

	.search-page__actions
	{
		margin-bottom: 0;
	}
}

@include mq($wd)
{
	.search-page__content
	{
		display: flex;
		column-gap: 70px;
	}
}
</style>
