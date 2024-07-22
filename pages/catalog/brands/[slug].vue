<template>
	<NuxtLayout name="default">
		<div class="brand-detail-page">
			<div class="container">
				<UiBreadcrumbs v-model:items="breadcrumbs" />
				<transition name="fade">
					<h1 v-if="brand.title">
						Товары бренда <i>{{ brand.title }}</i>
					</h1>
				</transition>
				<transition name="fade">
					<span
						v-if="pagination.total"
						class="brand-detail-page__subtitle"
					>
						{{ pagination.total }} {{ productsCountWord }}
					</span>
				</transition>
				<transition name="fade">
					<SupplierDescription
						v-if="brand.title"
						:logo="brand.picture"
						:name="brand.title"
						:description="brand.description"
					/>
				</transition>
				<CategoriesVue
					v-if="categories.length"
					v-model="category"
					:items="categories"
					:base-path="router.currentRoute.value.path"
					@update:model-value="changeCategory"
				/>
				<div class="brand-detail-page__content">
					<div :class="{open: filtersIsOpen}" class="brand-detail-page__filters">
						<FiltersVue
							v-model:filters="filters"
							class="brand-detail-page__desktop-filters"
							@apply="applyFilters"
						/>
						<CustomScrollbar class="brand-detail-page__mobile-filters">
							<FiltersVue
								v-model:filters="filters"
								@close="closeFilters"
								@apply="applyFilters"
							/>
						</CustomScrollbar>
					</div>
					<div
						v-if="filtersIsOpen"
						class="brand-detail-page__filters-overlay"
						@click="closeFilters"
					/>
					<div class="brand-detail-page__content-wr">
						<div class="brand-detail-page__actions">
							<div class="brand-detail-page__filters-btn" @click="openFilters">
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
import CategoriesVue from '~/components/Catalog/Categories.vue';
import FiltersVue from '~/components/Catalog/Filters.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import UiSelect from '~/components/UI/Select.vue';
import ScrollTop from '~/components/ScrollTop.vue';
import CatalogItems from '~/components/Catalog/Items.vue';
import EmptyCatalog from '~/components/Catalog/Empty.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider.vue';
import SupplierDescription from '~/components/SupplierDescription.vue';

import FiltersSvg from '~/assets/svg/filters.svg?skipsvgo';

import { PRODUCTS_WORDS } from '~/consts/words.js';
import { NUM_WORD } from '~/helpers/formatters.js';
import { useMainStore } from '~/store';
import brandsModule from '~/api/brands.js';

const router = useRouter();

const mainStore = useMainStore();

const slug = router.currentRoute.value.params.slug;

const {
	fetchData,
	items,
	sort,
	sortOptions,
	filters,
	pagination,
	category,
	categories,
	loading,
	hasError,
	showMoreItemsCount,
	isEmpty,
	brand,
} = useCatalog(brandsModule.fetchProducts, {
	_brand: slug,
	_itemsBaseUrl: '/catalog/product/'
});

const productsCountWord = ref('');
const filtersIsOpen = ref(false);

const instance = getCurrentInstance();

const openFilters      = () => filtersIsOpen.value = true;
const closeFilters     = () => filtersIsOpen.value = false;
const changeSort       = () => fetchData(false, true);
const changePagination = () => fetchData(false, true);
const applyFilters     = () =>
{
	pagination.currentPage = 1;
	fetchData(false, true);
};
const changeCategory = () => fetchData(false, true);
const showMore = () =>
{
	pagination.currentPage++;
	fetchData(false, true, true, true);
};

await fetchData(false, false, true, false, true);

productsCountWord.value = NUM_WORD(items.value.length, PRODUCTS_WORDS);

watchEffect(() =>
{
	if (hasError.value)
	{
		mainStore.disableLoading(instance.uid);
		throw createError({ statusCode: 404, message: '', fatal: true });
	}
});
watchEffect(() => useHead({ title: `Товары бренда ${brand.title}` }));
watchEffect(() => mainStore[loading.value ? 'enableLoading' : 'disableLoading'](instance.uid));

const breadcrumbs = computed(() => ([
	{ name: 'Главная', link: '/' },
	{ name: 'Каталог', link: '/catalog' },
	{ name: `Каталог Бренда ${brand.title}`, link: `/catalog/brands/${brand.slug}/` },
]));
</script>

<style lang="scss">
.brand-detail-page__subtitle
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

.brand-detail-page__actions
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;
}

.brand-detail-page__filters-btn
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

.brand-detail-page__filters-overlay
{
	display: none;
}

.brand-detail-page__mobile-filters { display: none !important; }
.brand-detail-page__content-wr { flex: 1; }

@include mq(0, $tablet - 1px )
{
	.brand-detail-page__filters
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

	.brand-detail-page__filters-overlay
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
	.brand-detail-page__desktop-filters { display: none; }
	.brand-detail-page__mobile-filters { display: block !important; }
}

@include mq($tablet){
	.brand-detail-page__subtitle
	{
		font-size: 14px;
		line-height: 18px;
	}

	.brand-detail-page__filters
	{
		display: block;
	}

	.brand-detail-page__filters-btn
	{
		display: none;
	}

	.brand-detail-page__actions
	{
		display: flex;
		justify-content: flex-end;
	}

	.brand-detail-page__content
	{
		display: flex;
		column-gap: 40px;
	}

	.brand-detail-page__actions
	{
		margin-bottom: 0;
	}
}

@include mq($wd){
	.brand-detail-page__subtitle
	{
		font-size: 16px;
		line-height: 21px;
		margin-bottom: 30px;
	}

	.brand-detail-page__content
	{
		display: flex;
		column-gap: 70px;
	}
}
</style>
