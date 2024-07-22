<template>
	<TitleSection
		title="Товары из этой закупки"
		class="collective-products"
	>
		<div class="collective-products__content">
			<div :class="{open: filtersIsOpen}" class="collective-products__filters">
				<FiltersVue class="collective-products__desktop-filters" />
				<CustomScrollbar class="collective-products__mobile-filters">
					<FiltersVue
						@close="closeFilters"
					/>
				</CustomScrollbar>
			</div>
			<div
				v-if="filtersIsOpen"
				class="collective-products__filters-overlay"
				@click="closeFilters"
			/>
			<div class="collective-products__purchase">
				<div class="collective-products__actions">
					<div
						class="collective-products__filters-btn"
						@click="openFilters"
					>
						<FiltersSvg />
						<span>Фильтр</span>
					</div>
					<UiSelect
						v-model="sort"
						:options="sortOptions"
						placeholder="Сортировать по цене"
					/>
				</div>
				<div class="collective-products__list-wr">
					<div class="collective-products__heading">
						<div class="collective-products__column">
							Фото
						</div>
						<div class="collective-products__column">
							Наименование
						</div>
						<div class="collective-products__column">
							Город поставки
						</div>
						<div class="collective-products__column">
							Цена, <i class="ruble">₽</i>/шт.
						</div>
						<div class="collective-products__column">
							Стоимость
						</div>
					</div>
					<div class="collective-products__list">
						<ProductCard :is-in-cart="isInCart = true" class="collective-products__card" />
						<ProductCard :is-in-cart="isInCart = false" />
						<ProductCard v-for="i in 6" :key="i" :is-in-cart="isInCart = true" />
					</div>
					<div class="collective-products__total" :class="{'sticky': totalIsSticky}">
						<p class="collective-products__total-title">
							Итого:
						</p>
						<div class="collective-products__total-amount">
							<p class="collective-products__total-value">
								124
								<span>шт</span>
							</p>
							<div class="collective-products__total-cost">
								<span>900 000 </span>
								<i class="ruble">₽</i>
							</div>
						</div>
					</div>
					<div class="collective-products__nosticky" />
				</div>
				<button class="collective-products__purchase-btn button button--light-blue">
					Оформить
				</button>
			</div>
		</div>
	</TitleSection>
</template>

<script setup>
import TitleSection from '~/components/TitleSection.vue';
import FiltersVue from '~/components/Catalog/Filters.vue';
import ProductCard from '~/components/Collective/ProductCard.vue';
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import UiSelect from '~/components/UI/Select.vue';

import FiltersSvg from '~/assets/svg/filters.svg?skipsvgo';

const sort = ref({ name: '', code: '' });
const filtersIsOpen = ref(false);
const totalIsSticky = ref(false);

const sortOptions =
[
	{ name: 'дорогие', code: 'expensive' },
	{ name: 'дешёвые', code: 'cheap' },
	{ name: 'по алвавиту', code: 'alphabetically' },
	{ name: 'не алвавиту', code: 'not_alphabetically' },
];

const openFilters = () => filtersIsOpen.value = true;
const closeFilters = () => filtersIsOpen.value = false;

const scrollHandler = () =>
{
	const card = document.querySelector('.collective-products__card');
	const list = document.querySelector('.collective-products__list');
	const total = document.querySelector('.collective-products__total');
	const end = document.querySelector('.collective-products__nosticky');

	const posStart = list.getBoundingClientRect().top;
	const posEnd = end.getBoundingClientRect().top;

	if (posStart < window.innerHeight - (card.clientHeight + total.clientHeight) && posEnd > window.innerHeight - 85)
		totalIsSticky.value = true;
	else
		totalIsSticky.value = false;
};

onMounted(() =>
{
	scrollHandler();
	window.addEventListener('scroll', scrollHandler);
});

onBeforeUnmount(() =>
{
	window.removeEventListener('scroll', scrollHandler);
});
</script>

<style lang="scss">
.collective-products__purchase
{
	width: 100%;

	p { margin: 0; }
}

.collective-products__actions
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;

	.select__label
	{
		padding: 9px 66px 9px 14px;
	}

	.select__label-arrow
	{
		right: 13px;
	}
}

.collective-products__filters-btn
{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 34px;
	height: 34px;
	border-radius: 6px;
	background: $lgray;
	margin-right: auto;

	svg
	{
		width: 20px;
		height: 18px;
	}

	span { display: none; }
}

.collective-products__heading
{
	display: none;
}

.collective-products__list-wr
{
	margin-bottom: 30px;
	position: relative;
}

.collective-products__total
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	background: $lgray;
	padding: 14px;
	font-size: 11px;
	line-height: 15px;
	font-weight: 600;
	min-height: 40px;

	&.sticky
	{
		position: sticky;
		bottom: 60px;
		z-index: 3;
	}
}

.collective-products__total-title
{
	color: $gray;
}

.collective-products__total-amount
{
	display: flex;
	justify-content: space-between;
	gap: 32px;
}

.collective-products__total-value
{
	span
	{
		font-size: 10px;
		line-height: 14px;
	}
}

.collective-products__total-cost
{
	.ruble
	{
		font-size: 10px;
		line-height: 14px;
	}
}

.collective-products__purchase-btn
{
	margin: 0 auto;
	height: 38px;
	padding: 12px 20px;
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;
}

.collective-products__filters-overlay
{
	display: none;
}

.collective-products__mobile-filters { display: none !important; }

@include mq(0, $tablet - 1px)
{
	.collective-products__filters
	{
		.custom-scrollbar { max-height: calc(100vh - 139px - 60px); }
	}
}

@include mq(0, $wd - 1px)
{
	.collective-products__filters
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

		.collective-products__filters
		{
			.custom-scrollbar { max-height: calc(100vh - 101px); }
		}
	}

	.collective-products__filters-overlay
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
	.collective-products__desktop-filters { display: none; }
	.collective-products__mobile-filters { display: block !important; }
}

@include mq($tablet)
{
	.collective-products__filters
	{
		top: 101px;

		.catalog-filters
		{
			padding: 47px 10px 15px;
		}

		.catalog-filters__btn-back
		{
			display: inline;
		}
	}

	.collective-products__purchase
	{
		.collective-products__total-value
		{
			margin-left: 47px;
			margin-right: 48px;
		}
	}

	.collective-products__actions
	{
		align-items: flex-start;
		margin-bottom: 21px;

		.select
		{
			margin-bottom: 0;
		}

		.select__label
		{
			padding: 10px 89px 10px 16px;
		}
	}

	.collective-products__filters-btn
	{
		gap: 13px;
		padding: 6.5px 20px;
		border-radius: 6px;
		width: fit-content;
		height: 38px;

		svg
		{
			width: 22px;
			height: 21px;
		}

		span
		{
			display: inline;
			color: $blue;
			font-size: 18px;
			line-height: 25px;
			font-weight: 600;
		}
	}

	.collective-products__list-wr
	{
		margin-bottom: 20px;
	}

	.collective-products__total
	{
		padding: 12.5px 14px;
		justify-content: unset;

		&.sticky
		{
			bottom: 0;
		}
	}

	.collective-products__total-title
	{
		font-size: 12px;
		line-height: 16px;
		flex-basis: 61.2%;
	}

	.collective-products__total-amount
	{
		gap: 0;
		flex-basis: 31.3%;
	}

	.collective-products__total-value,
	.collective-products__total-cost
	{
		font-size: 14px;
		line-height: 19px;
		font-weight: 400;
	}

	.collective-products__purchase-btn
	{
		font-size: 15px;
		line-height: 20px;
	}
}

@include mq($wd)
{
	.collective-products__content
	{
		display: flex;
		column-gap: 40px;
	}

	.collective-products__filters
	{
		display: block;

		.catalog-filters
		{
			padding: 0;
		}

		.catalog-filters__btn-back
		{
			display: none;
		}
	}

	.collective-products__filters-btn
	{
		display: none;
	}

	.collective-products__actions
	{
		display: flex;
		justify-content: flex-end;
	}

	.collective-products__actions
	{
		margin-bottom: 20px;

		.select__label
		{
			padding: 11px 102px 11px 20px;
		}

		.select__label-arrow
		{
			right: 18px;
		}
	}

	.collective-products__heading
	{
		display: flex;
		border-radius: 14px;
		background: $lgray;
		padding: 16px 50px;
	}

	.collective-products__column
	{
		color: $gray;
		font-size: 16px;
		line-height: 22px;
		white-space: nowrap;

		&:nth-of-type(1)
		{
			flex-basis: 8.3%;
		}

		&:nth-of-type(2)
		{
			flex-basis: 26%;
		}

		&:nth-of-type(3)
		{
			flex-basis: 20%;
		}

		&:nth-of-type(4)
		{
			flex-basis: 10.5%;
		}

		&:nth-of-type(5)
		{
			flex-basis: 33.6%;
			text-align: right;
		}
	}

	.collective-products__total
	{
		padding: 19px 50px;
	}

	.collective-products__total-title
	{
		font-size: 16px;
		line-height: 22px;
		flex-basis: 68.5%;
	}

	.collective-products__total-amount
	{
		flex-basis: 28.5%;
	}

	.collective-products__total-value,
	{
		font-size: 16px;
		line-height: 22px;
		font-weight: 600;

		span
		{
			font-size: 12px;
			line-height: 16px;
		}
	}

	.collective-products__total-cost
	{
		font-size: 16px;
		line-height: 22px;
		font-weight: 600;

		.ruble
		{
			font-size: 12px;
			line-height: 16px;
		}
	}

	.collective-products__purchase-btn
	{
		height: 40px;
		padding: 10px 30px;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: -0.16px;
	}
}

@include mq($fullhd)
{
	.collective-products__content
	{
		display: flex;
		column-gap: 71px;
	}
}
</style>
