<template>
	<header class="header">
		<div class="container">
			<div class="header__top">
				<NuxtLink class="header__logo" to="/">
					Царазон
				</NuxtLink>
				<HeaderBurgerSvg class="header__burger" @click="openHeaderMenu" />
				<HeaderSearch />
				<div class="header__actions">
					<div class="header__city" @click="openCitiesModal">
						<LocationSvg />
						<span>
							{{ selectedCity }}
						</span>
						<HeaderCities
							v-if="citiesModalIsOpen"
							v-click-outside="closeCitiesModal"
						/>
					</div>
					<div class="header__cart-info">
						<span>
							{{ cartStatus.productsCount }}
						</span>
						<span v-html="cartStatus.ordersPrice" />
						<NuxtLink to="/cart" />
					</div>
					<div class="header__btns">
						<NuxtLink to="/cart" class="header__btn">
							<CartSvg />
						</NuxtLink>
						<div class="header__btns-separator" />
						<NuxtLink
							v-if="isAuth"
							to="/lk"
							class="header__btn"
						>
							<UserSvg />
							<span>
								Профиль
							</span>
						</NuxtLink>
						<div
							v-else
							class="header__btn"
							@click="openAuthPopup"
						>
							<UserSvg />
							<span>
								Войти
							</span>
						</div>
					</div>
				</div>
			</div>
			<nav class="header__bottom">
				<div class="header__bottom-catalog" @mouseleave="closeCatalogMenu">
					<NuxtLink
						class="header__bottom-catalog-btn g-material-link"
						to="/catalog"
						@mouseover="openCatalogMenu"
					>
						<HeaderBurgerSvg />
						Каталог
					</NuxtLink>
					<HeaderCatalog v-if="catalogMenuIsOpen" />
				</div>
				<div class="header__bottom-links">
					<NuxtLink
						v-for="link, i in bottomLinks"
						:key="i"
						:to="link.href"
						:style="{ color: link.color }"
						class="g-material-link"
					>
						<img v-if="link.icon" :src="link.icon">
						{{ link.name }}
					</NuxtLink>
					<NuxtLink class="g-material-link" to="/collective">
						Коллективные закупки
					</NuxtLink>
				</div>
				<div class="header__bottom-nav">
					<NuxtLink class="g-material-link" to="/about">
						<TwoPersonsSvg />
						О нас
					</NuxtLink>
					<NuxtLink class="g-material-link" to="/collective">
						<ThreePersonsSvg />
						Коллективные закупки
					</NuxtLink>
					<NuxtLink class="g-material-link" to="/news">
						<BooksSvg />
						Блог
					</NuxtLink>
					<NuxtLink class="g-material-link" to="/contacts">
						<PhoneSvg />
						Контакты
					</NuxtLink>
					<a href="tel:+78002011069">
						+7 (800) 201-10-69
					</a>
				</div>
			</nav>
		</div>
		<div class="header__bottom-menu">
			<Transition name="header__bottom-cities-modal">
				<HeaderCities
					v-if="mobileCitiesModalIsOpen"
					v-click-outside="closeMobileCitiesModal"
				/>
			</Transition>
			<div class="header__bottom-menu-btn" @click="openMobileCitiesModal">
				<LocationSvg />
				<span class="header__bottom-menu-btn-text">
					Город
				</span>
			</div>
			<NuxtLink class="header__bottom-menu-btn" to="/catalog">
				<CatalogSvg />
				<span class="header__bottom-menu-btn-text">
					Каталоог
				</span>
			</NuxtLink>
			<NuxtLink class="header__bottom-menu-btn" to="/cart">
				<CartSvg />
				<span class="header__bottom-menu-btn-text">
					Корзина
				</span>
			</NuxtLink>
			<div
				v-if="isAuth"
				to="/lk"
				class="header__bottom-menu-btn"
				@click="openMobileMenuPopup"
			>
				<UserSvg />
				<span class="header__bottom-menu-btn-text">
					Профиль
				</span>
			</div>
			<div
				v-else
				class="header__bottom-menu-btn"
				@click="openAuthPopup"
			>
				<UserSvg />
				<span class="header__bottom-menu-btn-text">
					Войти
				</span>
			</div>
		</div>
		<HeaderMenu v-if="headerMenuIsOpen" @close="closeHeaderMenu" />
	</header>
</template>

<script setup>
import { PRODUCTS_WORDS } from '~/consts/words.js';
import { NUMBER_FORMATTER, NUM_WORD } from '~/helpers/formatters.js';
import { usePopupsStore, useUserStore, useCitiesStore, useCartStore } from '~/store';

import HeaderSearch from '~/components/Header/Search.vue';

import HeaderBurgerSvg from '~/assets/svg/header-burger.svg?skipsvgo';
import TwoPersonsSvg from '~/assets/svg/two-persons.svg?skipsvgo';
import ThreePersonsSvg from '~/assets/svg/three-persons.svg?skipsvgo';
import BooksSvg from '~/assets/svg/books.svg?skipsvgo';
import PhoneSvg from '~/assets/svg/phone.svg?skipsvgo';
import LocationSvg from '~/assets/svg/location.svg?skipsvgo';
import UserSvg from '~/assets/svg/user.svg?skipsvgo';
import CartSvg from '~/assets/svg/cart.svg?skipsvgo';
import CatalogSvg from '~/assets/svg/catalog.svg?skipsvgo';

const HeaderCatalog = defineAsyncComponent(() => import('@/components/Header/Catalog.vue'));
const HeaderCities  = defineAsyncComponent(() => import('@/components/Header/Cities.vue'));
const HeaderMenu    = defineAsyncComponent(() => import('@/components/Header/Menu.vue'));

const popupsStore = usePopupsStore();
const userStore   = useUserStore();
const citiesStore = useCitiesStore();
const cartStore   = useCartStore();

const bottomLinks =
	[
		{ name: 'Акции', href: '#', icon: '/svg/discounts.svg', color: '#F69421' },
		{ name: 'Хиты', href: '#' },
		{ name: 'Новинки', href: '#' },
		{ name: 'Летний сезон', href: '#' },
		{ name: 'Здоровый выбор', href: '#' },
	];

const catalogMenuIsOpen       = ref(false);
const citiesModalIsOpen       = ref(false);
const mobileCitiesModalIsOpen = ref(false);
const headerMenuIsOpen        = ref(false);

const selectedCity = computed(() => citiesStore.current.title);
const cartStatus = computed(() =>
{
	let productsCount = 'В корзине ничего нету';
	let ordersPrice = 'Выберите товары';

	if (cartStore.productsCount)
		productsCount = `В корзине ${NUMBER_FORMATTER(cartStore.productsCount)} ${NUM_WORD(cartStore.productsCount, PRODUCTS_WORDS)}`;

	if (cartStore.ordersPrice)
		ordersPrice = `На сумму ${NUMBER_FORMATTER(cartStore.ordersPrice)} <i class="ruble">₽</i>`;

	return {
		productsCount,
		ordersPrice,
	};
});

const isAuth = computed(() => userStore.isAuth);

const openCatalogMenu = () => catalogMenuIsOpen.value = true;
const closeCatalogMenu = () => catalogMenuIsOpen.value = false;

const openCitiesModal = () => citiesModalIsOpen.value = true;
const closeCitiesModal = () => citiesModalIsOpen.value = false;

const openMobileCitiesModal = () => mobileCitiesModalIsOpen.value = true;
const closeMobileCitiesModal = () => mobileCitiesModalIsOpen.value = false;

const openHeaderMenu = () =>
{
	headerMenuIsOpen.value = true;
	window.addEventListener('resize', headerMenuResizeHandler);
};
const closeHeaderMenu = () =>
{
	headerMenuIsOpen.value = false;
	window.removeEventListener('resize', headerMenuResizeHandler);
};

const headerMenuResizeHandler = () =>
{
	if (window.outerWidth > 767)
		closeHeaderMenu();
};

const openAuthPopup = () => popupsStore.setState(['AuthPopup', true]);
const openMobileMenuPopup = () => popupsStore.setState(['MobileMenuPopup', true]);
</script>

<style lang="scss">
	.header
	{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 15px 0 16px;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 20px rgba(93, 95, 107, 0.1);
		margin-bottom: 20px;
		z-index: 20;

		.header-catalog { display: none; }
	}
	.header__top
	{
		display: grid;
		grid-template-areas:
		'logo   .      burger'
		'search search search';
	}
	.header__logo
	{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 700;
		font-size: 22px;
		line-height: 33px;
		letter-spacing: -0.01em;
		color: #3772FE;
		grid-area: logo;
		margin-bottom: 10px;
	}
	.header__bottom
	{
		display: flex;
		grid-area: bottom;
		overflow: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
		margin: 0 -15px;
		padding: 0 15px;

		&::-webkit-scrollbar { display: none; }
	}
	.header__bottom-nav
	{
		display: none;
	}
	.header__burger
	{
		grid-area: burger;
		margin-left: auto;
	}
	.header__bottom-catalog-btn
	{
		display: none;
	}
	.header__bottom-links
	{
		display: flex;
		gap: 16px;

		a
		{
			font-weight: 600;
			font-size: 12px;
			line-height: 16px;
			white-space: nowrap;
			color: #2C2C2C;

			img
			{
				width: 10px;
				height: 10px;
				margin-right: 4px;
			}
		}
	}
	.header__city { display: none; }
	.header__actions { display: none; }
	.header__bottom-menu-btn
	{
		cursor: pointer;
		text-align: center;
		path { @include transition(); }

		&:first-child:hover path { fill: #3772FE; }
		&:not(:first-child):hover path { stroke: #3772FE; }

		&:hover .header__bottom-menu-btn-text { color: #3772FE; }

		svg
		{
			display: block;
			height: 23px;
			width: 23px;
			margin: 0 auto 2px;
		}

		&:nth-child(2) svg { height: 22px; }
		&:nth-child(2) svg { height: 22px; }
		&:nth-child(2) svg { width: 21px; }

	}
	.header__bottom-menu-btn-text
	{
		display: block;
		font-size: 13px;
		line-height: 15px;
		text-align: center;
		color: #868799;
		@include transition();
	}
	.header__bottom-menu
	{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		height: 60px;
		padding: 10px 15px;
		display: flex;
		justify-content: space-between;
		z-index: 12;
		box-shadow: 0px 0px 20px rgba(93, 95, 107, 0.1);

		.header-cities
		{
			position: fixed;
			top: 57px;
			left: 15px;
			width: calc(100% - 30px);
		}

		.custom-scrollbar { max-height: calc(100vh - 60px - 117px) !important; }
	}

	.header__bottom-cities-modal-enter-active, .header__bottom-cities-modal-leave-active
	{
		transition: transform .3s, opacity .3s;
	}
	.header__bottom-cities-modal-enter-from, .header__bottom-cities-modal-leave-to
	{
		opacity: 0;
		transform: translateY(-100%);
	}

	@include mq($tablet)
	{
		.header { margin-bottom: 30px; }
		.header__top
		{
			position: relative;
			display: flex;
			align-items: center;
			margin-bottom: 14px;
			z-index: 2;
		}
		.header__logo
		{
			margin: 0 16px 0 0;
		}
		.header__burger
		{
			display: none;
		}
		.header__cart-info
		{
			position: relative;
			background-color: #E3EEF2;
			border-radius: 14px;
			padding: 4px 36px 4px 20px;
			margin-right: -16px;

			span
			{
				position: relative;
				display: block;
				z-index: 1;
				width: fit-content;

				&:nth-child(1)
				{
					font-size: 14px;
					line-height: 18px;
					color: #3772FE;
				}
				&:nth-child(2)
				{
					font-weight: 600;
					font-size: 11px;
					line-height: 14px;
					color: rgba(55, 114, 254, 0.6);
				}
			}

			a
			{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
		}
		.header__bottom-catalog-btn
		{
			position: relative;
			display: flex;
			align-items: center;
			font-weight: 600;
			font-size: 14px;
			line-height: 16px;
			color: #3772FE;
			border: unset;
			@include transition();
			z-index: 1;
			border-right: 1px solid #E5E5FA;
			padding-right: 20px;
			margin-right: 20px;
			height: 16px;

			svg
			{
				margin-right: 6px;
				min-width: 14px;
				width: 14px;
				height: 14px;
				transform: rotate(180deg);
			}
		}
		.header__actions
		{
			position: relative;
			display: flex;
			filter: drop-shadow(0px 0px 16px rgba(93, 95, 107, 0.14));
			z-index: 12;
		}
		.header__btns
		{
			position: relative;
			display: flex;
			background-color: #FFFFFF;
			border-radius: 10px;
			z-index: 1;
		}
		.header__btn
		{
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 14px;
			cursor: pointer;

			span { display: none; }

			path, span { @include transition(); }

			&:not(:last-child)
			{
				position: relative;
				margin-right: 1px;

				&:after
				{
					content: '';
					position: absolute;
					height: 30px;
					width: 1px;
					background-color: #E5E5FA;
					right: -1px;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			&:hover
			{
				path { stroke: #3772FE; }
				span { color: #3772FE; }
			}
		}
		.header__city
		{
			position: relative;
			display: block;
			text-align: center;
			background: #FFFFFF;
			border-radius: 10px 0px 0px 10px;
			padding: 5px 36px 5px 14px;
			margin-right: -22px;
			z-index: -1;
			cursor: pointer;

			svg, span { display: block; margin: 0 auto; }

			span
			{
				font-size: 12px;
				line-height: 16px;
				color: #868799;
			}

			.header-cities
			{
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 8px;
				z-index: 12;
				width: 267px;
				cursor: auto;
			}

			.custom-scrollbar { max-height: min(400px, calc(100vh - 130px)); }
		}

		.header__bottom-menu { display: none; }
		.header__bottom-catalog
		{
			position: relative;

			.header-catalog
			{
				position: absolute;
				top: 100%;
				left: 0;
			}
		}
		.header__bottom
		{
			overflow: unset;
		}
	}

	@include mq($wd)
	{
		.header
		{
			.header-catalog { display: flex; }
		}
		.header__logo
		{
			font-weight: 700;
			font-size: 41px;
			line-height: 61px;
			margin-right: 23px;
		}
		.header__btn
		{
			span
			{
				display: block;
				font-size: 14px;
				line-height: 19px;
				color: #868799;
				margin-left: 6px;
			}
		}
		.header__top
		{
			margin-bottom: 20px;
		}
		.header__bottom
		{
			display: flex;
			align-items: center;
		}
		.header__bottom-nav
		{
			display: flex;

			a
			{
				font-weight: 600;
				font-size: 16px;
				line-height: 22px;
				color: #2C2C2C;
				@include transition();

				path { @include transition(); }

				&:first-child
				{
					color: #F69421;

					path { stroke: #F69421; }
				}

				&:not(:last-child)
				{
					margin-right: 18px;
				}
			}

			svg { height: 14px; }
		}

		.header__bottom-links
		{
			margin-right: auto;
			gap: 18px;

			a
			{
				font-size: 16px;
				line-height: 22px;
				@include transition();

				svg { margin-right: 6px; }

				&:last-child { display: none; }
			}
		}
		.header__bottom-catalog-btn
		{
			font-size: 16px;
			line-height: 22px;
			height: 30px;

			svg { height: 19px; }
		}
		.header__actions
		{
			height: 50px;
		}
		.header__city
		{
			padding: 8px 37px 7px 16px;

			svg
			{
				width: 18px;
				height: 16px;
			}

			span
			{
				&:nth-child(1)
				{
					font-size: 15px;
					line-height: 20px;
				}
				&:nth-child(2)
				{
					font-size: 12px;
					line-height: 16px;
				}
			}
		}
		.header__cart-info
		{
			padding: 7px 36px 7px 16px;
		}
		.header__btn
		{
			padding: 19px 15px;
		}
	}
</style>
