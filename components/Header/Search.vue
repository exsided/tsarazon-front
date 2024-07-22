<template>
	<div v-click-outside="close" class="header-search">
		<div class="header-search__field">
			<input
				v-model="searchText"
				type="text"
				placeholder="Поиск"
				@focus="open"
				@click="open"
				@input="onInput($event.target.value)"
			>
			<SearchSvg />
		</div>
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="header-search__modal"
			>
				<CustomScrollbar v-if="isEmpty || (result && result.length)" class="header-search__items">
					<div v-if="isEmpty" class="header-search__empty-view">
						По вашему запросу ничего не найдено
					</div>
					<template v-else>
						<NuxtLink
							v-for="item, i in result"
							:key="i"
							:to="item.link"
							:class="{'header-search__item--highlighted': highlighted === i}"
							class="header-search__item"
						>
							<img v-if="item.img" :src="item.img">
							<SearchSvg v-else />
							<template v-if="item.label">
								<div>
									<span>
										{{ item.text }}
									</span>
									<span>
										{{ item.label }}
									</span>
								</div>
							</template>
							<template v-else>
								{{ item.text }}
							</template>
						</NuxtLink>
					</template>
				</CustomScrollbar>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import SearchSvg from '~/assets/svg/search.svg?skipsvgo';

import catalogModule from '~/api/catalog.js';

const router = useRouter();

const searchText     = ref('');
const isOpen         = ref(false);
const isEmpty        = ref(false);
const requestTimeout = ref(null);
const highlighted    = ref(-1);
const result         = ref([]);

const hasItems = computed(() => result.length);

const onInput = () =>
{
	clearTimeout(requestTimeout.value);
	requestTimeout.value = setTimeout(() => searchHandler(), 400);
};

const open = () =>
{
	isOpen.value = true;

	addListeners();
};

const close = () =>
{
	isOpen.value = false;

	removeListeners();
};

const searchHandler = async () =>
{
	highlighted.value = -1;

	if (searchText.value)
	{
		const { data, error } = await catalogModule.quickSearch(searchText.value);

		if (error.value)
			// eslint-disable-next-line no-console
			console.log('HeaderSearch/searchHandler', error.value);

		if (data.value)
		{
			const responseData = data.value.data;
			let products       = [];
			let categories     = [];
			let brands         = [];

			if (responseData.products && responseData.products?.data?.length)
				products = responseData.products.data.map(el => ({
					text: el.title,
					link: `/catalog/product/${el.slug}/${el.supplier}`,
				}));

			if (responseData.categories.length)
				categories = responseData.categories.map((el) =>
				{
					return {
						text: el.title,
						img: el.picture[0] || '',
						label: el.parentsTitle,
						link: `/catalog/${el.parentsSlug}`,
						redirectOnPage: true,
					};
				});

			if (responseData.brands.length)
				brands = responseData.brands.map(el => ({
					text: el.title,
					link: `catalog/brands/${el.slug}`,
					img: el.picture[0] || '',
					label: 'Бренд',
					redirectOnPage: true
				}));

			result.value = [].concat(products, categories, brands);
		}
	}
	else
		result.value = [];

	isEmpty.value = !!searchText.value && !result.value.length;
};

const addListeners = () =>
{
	document.addEventListener('keyup', escapeHandler);
	document.addEventListener('keydown', arrowsHandler);
};

const removeListeners = () =>
{
	document.removeEventListener('keyup', escapeHandler);
	document.removeEventListener('keydown', arrowsHandler);
};

const arrowsHandler = (event) =>
{
	if (!hasItems)
		return;

	let localHighlighted = highlighted.value;

	if (event.keyCode === 38)
	{
		if (localHighlighted - 1 === 0)
			localHighlighted -= 1;
		else if (localHighlighted - 1 > 0)
			localHighlighted -= 1;
		else
			localHighlighted = result.value.length - 1;
	}

	if (event.keyCode === 40)
	{
		if (localHighlighted + 1 < result.value.length)
			localHighlighted += 1;
		else
			localHighlighted = 0;
	}

	if (localHighlighted < 0)
		localHighlighted = 0;

	highlighted.value = localHighlighted;

	// if ()
	// {
	// 	this.searchText = '';
	// 	this.searchText = selectedElement.querySelector('span').innerText;
	// }

	const selectedElement = result.value[localHighlighted];

	if ((event.keyCode === 38 || event.keyCode === 40) && selectedElement && !selectedElement.redirectOnPage)
		searchText.value = selectedElement.text;

	if (event.keyCode === 13 && selectedElement)
		redirectOnSearchPage();
};

const redirectOnSearchPage = () =>
{
	const localHighlighted = highlighted.value;
	const localResult = result.value;

	if (localHighlighted !== -1 && localResult[localHighlighted] && localResult[localHighlighted].redirectOnPage)
		router.push(localResult[localHighlighted].link);
	else
		router.push({ path: '/search', query: { query: searchText.value } });

	searchText.value = '';
	result.value = null;
	highlighted.value = -1;

	setTimeout(() => close());
};

const escapeHandler = (event) =>
{
	if (event.keyCode === 27)
	{
		close();
	}
};
</script>

<style lang="scss">
	.header-search
	{
		position: relative;
		margin-bottom: 16px;
		grid-area: search;
	}
	.header-search__field
	{
		position: relative;
		z-index: 12;

		svg
		{
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-50%);
			cursor: pointer;
		}

		input
		{
			background-color: #F4F5F7;
			border-radius: 10px;
			font-size: 14px;
			line-height: 19px;
			padding: 7px 45px 7px 10px;
			border: unset;
			outline: unset;
			width: 100%;

			&:placeholder { color: rgba(0, 0, 0, 0.4); }
		}
	}
	.header-search__modal
	{
		position: absolute;
		top: -6px;
		left: -6px;
		padding: 40px 6px 6px;
		width: calc(100% + 12px);
		min-height: 40px;
		background-color: #FFFFFF;
		border-radius: 14px;
		z-index: 11;
		box-shadow: 0px 0px 20px rgba(93, 95, 107, 0.1);
	}

	.header-search__items
	{
		max-height: calc(100vh - 139px + 30px);
		overflow: auto;
	}

	.header-search__item
	{
		display: flex;
		align-items: center;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: rgba(44, 44, 44, 0.4);
		padding: 10px 20px;
		border-radius: 4px;
		@include transition();

		svg, img { margin-right: 4px; }
		path { stroke: rgba(44, 44, 44, 0.4); stroke-width: 1; }

		img
		{
			width: 22px;
			height: 22px;
			border-radius: 4px;
			object-fit: cover;
		}

		span
		{
			display: block;

			&:nth-child(1)
			{
				font-size: 12px;
				line-height: 14px;
				color: #2C2C2C;
			}
			&:nth-child(2)
			{
				font-size: 10px;
				line-height: 12px;
				color: rgba(44, 44, 44, 0.4);
			}
		}

		&:hover, &--highlighted { background-color: #F4F5F7; }
	}
	.header-search__empty-view
	{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		font-size: 12px;
		line-height: 16px;
		color: rgba(44, 44, 44, 0.4);
		min-height: 186px;
	}

	@include mq($tablet)
	{
		.header-search
		{
			flex-grow: 1;
			margin-bottom: 0;
			margin-right: 8px;
		}

		.header-search__field
		{
			input { padding: 10px 45px 10px 10px; }
		}
	}

	@include mq($wd)
	{
		.header-search { margin-right: 30px; }
		.header-search__field
		{
			svg { right: 20px; }
			input { padding: 15px 45px 16px 20px; }
		}
		.header-search__modal
		{
			padding: 58px 6px 6px;
			min-height: 62px;
		}
		.header-search__items
		{
			max-height: calc(100vh - 142px + 30px);
			margin-top: 3px;
		}
	}
</style>
