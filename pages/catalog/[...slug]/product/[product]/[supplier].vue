<template>
	<NuxtLayout name="default">
		<div class="product-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
				<ProductHeading
					:title="product.title"
					:vendor-code="product.vendorCode"
					:quant="product.quant.amount"
					:quant-unit="product.quant.unit"
					@click-on-anchor="onClickAnchor"
				/>
				<div class="product-page__grid">
					<div class="product-page__slider">
						<PhotosSlider :slides="product.pictures" />
					</div>
					<ProductOptions />
					<div class="product-page__actions">
						<ShareBtn />
						<ProductActions
							v-if="dataIsFetched"
							:id="product.id"
							:price="product.price"
							:quant="product.quant.amount"
							:quant-unit="product.quant.unit"
							:supplier="supplierData?.name"
							:is-in-cart="isInCart"
							:quantity="counter"
							:cart-price-amount="productFromCart?.price || 0"
							:loading="loading"
							@add-to-cart="addInCart"
							@change-product-quantity="changeProductQuantity"
							@delete-from-cart="deleteFromCart"
						/>
					</div>
					<ShortInfo
						:product-type="product.type"
						:properties="product.properties.slice(0, 3)"
						@goto-properties="onClickAnchor('properties')"
					/>
					<ProductDiscount
						v-if="product.priceForQuantity.length"
						:prices="product.priceForQuantity"
						:quant-unit="product.quant.unit"
						:base-price="product.price"
						:cart-added-quantity="counter"
					/>
				</div>
			</div>
			<CollectiveList />
			<div
				v-if="dataIsFetched"
				class="product-page__tabs container"
			>
				<SupplierDescription
					v-if="supplierData"
					:logo="supplierData.logo"
					:name="supplierData.name"
					:description="supplierData.description"
				/>
				<TabsVue v-model:activeTab="activeTab" :list="tabs">
					<ProductDescription
						v-if="activeTab === 'description'"
						:content="product.description"
					/>
					<ProductSpecifications
						v-if="activeTab === 'properties'"
						:brand="brand"
						:properties="product.properties"
					/>
				</TabsVue>
			</div>
			<ProductsSlider />
			<ProductsSlider />
			<ProductsSlider />
			<ProductsSlider />
		</div>
	</NuxtLayout>
</template>

<script setup>
import SupplierDescription from '~/components/SupplierDescription';
import TabsVue from '~/components/Tabs';
import ProductSpecifications from '~/components/Product/Specifications';
import ProductDescription from '~/components/Product/Description';
import ProductHeading from '~/components/Product/Heading';
import PhotosSlider from '~/components/Sliders/PhotosSlider.vue';
import ProductOptions from '~/components/Product/Options';
import ShortInfo from '~/components/Product/ShortInfo';
import ProductActions from '~/components/Product/Actions';
import ProductDiscount from '~/components/Product/Discounts.vue';
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider';
import CollectiveList from '~/components/Collective/List.vue';
import ShareBtn from '~/components/ShareBtn.vue';

import { useMainStore } from '~/store';

import catalogModule from '~/api/catalog.js';

const router = useRouter();
const mainStore = useMainStore();

const tabs = [
	{ name: 'Описание', code: 'description' },
	{ name: 'Характеристики', code: 'properties' },
];

const dataIsFetched    = ref(false);
const activeTab        = ref(tabs[0].code);
const supplierData     = ref(null);
const brand            = ref({ title: '', slug: '' });
const loading          = ref(false);

const product = reactive({
	id: '',
	title: '',
	pictures: [],
	description: '',
	quant: { amount: '', unit: '' },
	properties: '',
	priceForQuantity: [],
	price: 0,
	vendorCode: '',
	type: '',
});
const instance = getCurrentInstance();
const productSlug = router.currentRoute.value.params.product;
const supplierSlug = router.currentRoute.value.params.supplier;

mainStore.enableLoading(instance.uid);

const fetchProduct = async () =>
{
	const { data, error } = await catalogModule.fetchProduct(productSlug, supplierSlug);

	if (error.value)
	{
		// eslint-disable-next-line no-console
		console.log('pages/productDetail/fetchProduct');
		throw createError({ statusCode: 404, message: '', fatal: true });
	}

	brand.value = data.value.data.brand;

	product.id = data.value.data.id;
	product.pictures = data.value.data.pictures;
	product.description = data.value.data.description;
	product.properties = data.value.data.properties;
	product.priceForQuantity = data.value.data.price_for_quantity;
	product.quant =
	{
		amount: +data.value.data.quant.amount,
		unit: data.value.data.quant.unit,
	};
	product.price = +data.value.data.price;
	product.title = data.value.data.title;
	product.vendorCode = data.value.data.tsVendorСode;
	product.type = data.value.data.type.title;

	dataIsFetched.value = true;

	breadcrumbs.value = breadcrumbs.value.concat(getProductBreadcrumb());
};

const fetchSupplierData = async () =>
{
	const { data, error } = await catalogModule.fetchSupplierData(supplierSlug);

	if (error.value)
	{
		// eslint-disable-next-line no-console
		console.log('pages/productDetail/fetchSupplierData');
		return;
	}

	supplierData.value =
	{
		logo: data.value.data.logo || '',
		name: data.value.data.organization_name || '',
		description: data.value.data.description || '',
	};
};

const onClickAnchor = (hash) =>
{
	if (!hash)
		return;

	const anchorTabIndex = tabs.findIndex(el => el.code === hash);

	if (anchorTabIndex !== -1)
		activeTab.value = tabs[anchorTabIndex].code;

	setTimeout(() => useScrollTo(`#${hash}`), 100);
};

const getProductBreadcrumb = () => ({ name: product?.title || 'Товар', link: router.currentRoute.value.path });

const breadcrumbs = useCatalogBreadcrumbs(
	router.currentRoute.value.params.slug || [],
	[
		{ name: 'Главная', link: '/' },
		{ name: 'Каталог', link: '/catalog' },
	],
);

const setupShare = () =>
{
	window.Ya.share2('share-btn', {
		content: {
			url: window.location.href,
			title: 'Коллективная закупка',
			description: 'Описание',
		}
	});
};

const loadYandexShare = () =>
{
	if (window?.Ya?.share2)
	{
		setupShare();
	}
	else
	{
		const script = document.createElement('script');

		script.setAttribute('src', 'https://yastatic.net/share2/share.js');
		script.addEventListener('load', () => setupShare());
		document.head.appendChild(script);
	}
};

const addInCart = async (quantity) =>
{
	counter.value = quantity;

	loading.value = true;

	await _addInCart();

	setTimeout(() => loading.value = false, 400);
};

const changeProductQuantity = (quantity) =>
{
	counter.value = quantity;

	_changeQuantity();
};

const deleteFromCart = () => _deleteFromCart();

await fetchSupplierData();
await fetchProduct();

const {
	counter,
	isInCart,
	_addInCart,
	_changeQuantity,
	_deleteFromCart,
	_checkProductQuantityInBasket,
	productFromCart,
} = useProduct(product.id, supplierSlug);

_checkProductQuantityInBasket();

mainStore.disableLoading(instance.uid);

useHead({
	title: product.title,
});

onMounted(() =>
{
	loadYandexShare();
	onClickAnchor(router.currentRoute.value.hash.replace(/#/g, ''));
});
</script>

<style lang="scss">
.product-page
{
	.tabs__menu
	{
		margin-bottom: 20px;
	}
}

.product-page__slider
{
	margin-bottom: 40px;

	.photos-slider__big-nav
	{
		right: 16px;
		bottom: 19px;
	}
}

.product-page__tabs { margin-bottom: 40px; }

.product-page__actions
{
	.share-btn
	{
		display: none;
	}
}

@include mq($tablet)
{
	.product-page
	{
		.tabs__menu
		{
			margin-bottom: 40px;
		}
	}

	.product-page__grid
	{
		display: grid;
		grid-template-columns: calc(50% - 15px) calc(50% - 15px);
		grid-template-areas:
		'slider    actions'
		'options   actions'
		'info      actions'
		'discounts discounts';
		column-gap: 30px;

		.product-options
		{
			grid-area: options;
		}

		.product-short-info
		{
			grid-area: info;
		}

		.product-discounts
		{
			grid-area: discounts;
		}
	}

	.product-page__actions
	{
		grid-area: actions;
		height: fit-content;
		.share-btn
		{
			display: flex;
			justify-content: flex-end;
			margin-bottom: 20px;
		}
	}

	.product-page__slider
	{
		grid-area: slider;
		margin-bottom: 5px;
		width: 100%;
		max-width: 100%;
		overflow: hidden;
	}

	.product-page__tabs { margin-bottom: 53px; }
}

@include mq($desktop)
{
	.product-page
	{
		.tabs__menu
		{
			margin-bottom: 30px;
		}
	}

	.product-page__actions
	{
		.share-btn
		{
			display: none;
		}
	}
}

@media (min-width: 1280px)
{
	.product-page__grid
	{
		grid-template-columns: 2.8fr 3.4fr 362px;
		grid-template-areas:
		'slider    options   actions'
		'slider    info      actions'
		'discounts discounts actions'
		'discounts discounts actions';
		column-gap: 44px;
	}

	.product-page__slider
	{
		margin-bottom: 50px;
	}
}

@include mq($fullhd)
{
	.product-page__grid
	{
		column-gap: 72px;
	}
	.product-page__tabs { margin-bottom: 80px; }
}
</style>
