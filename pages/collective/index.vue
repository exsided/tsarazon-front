<template>
	<NuxtLayout name="default">
		<div class="collective-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
			</div>
			<TitleSection
				title="Коллективные закупки"
				class="collective-page__list"
			>
				<CategoriesVue />
				<div class="collective-page__content">
					<div :class="{open: filtersIsOpen}" class="collective-page__filters">
						<FiltersVue class="collective-page__desktop-filters" />
						<CustomScrollbar class="collective-page__mobile-filters">
							<FiltersVue
								@close="closeFilters"
							/>
						</CustomScrollbar>
					</div>
					<div
						v-if="filtersIsOpen"
						class="collective-page__filters-overlay"
						@click="closeFilters"
					/>
					<div class="collective-page__products">
						<div class="collective-page__actions">
							<div class="collective-page__filters-btn" @click="openFilters">
								<FiltersSvg />
							</div>
							<NuxtLink class="collective-page__actions-offer button button--light-blue">
								<RoundedPlusSvg /> <span>Предложить закупку</span>
							</NuxtLink>
							<UiSelect
								v-model="sort"
								:options="sortOptions"
								placeholder="Сортировать по цене"
							/>
						</div>
						<div class="collective-page__wrapper">
							<div class="collective-page__heading">
								<div class="collective-page__column">
									Фото
								</div>
								<div class="collective-page__column">
									Наименование
								</div>
								<div class="collective-page__column">
									Город поставки
								</div>
								<div class="collective-page__column">
									Цена, <i class="ruble">₽</i>/шт.
								</div>
								<div class="collective-page__column">
									Статус
								</div>
								<div class="collective-page__column">
									Срок
								</div>
								<div class="collective-page__column">
									Ожидаемая поставка
								</div>
							</div>
							<div class="collective-page__items">
								<LargeCard v-for="item, i in 15" :key="i" />
							</div>
							<div class="collective-page__more">
								<button class="collective-page__more-btn">
									Показать еще 24 товара
								</button>
							</div>
						</div>
						<UiPagination />
						<ScrollTop />
					</div>
				</div>
			</TitleSection>
			<ContactsForm />
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import TitleSection from '~/components/TitleSection';
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import FiltersVue from '~/components/Catalog/Filters.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import UiSelect from '~/components/UI/Select.vue';
import ScrollTop from '~/components/ScrollTop.vue';
import CategoriesVue from '~/components/Catalog/Categories.vue';
import LargeCard from '~/components/Collective/LargeCard.vue';
import ContactsForm from '~/components/Forms/ContactsForm.vue';

import FiltersSvg from '~/assets/svg/filters.svg?skipsvgo';
import RoundedPlusSvg from '~/assets/svg/rounded-plus.svg?skipsvgo';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Коллективные закупки', link: '/collective' }];

useHead({ title: 'Коллективные закупки' });

const sort = ref({ name: '', code: '' });
const filtersIsOpen = ref(false);

const sortOptions =
[
	{ name: 'дорогие', code: 'expensive' },
	{ name: 'дешёвые', code: 'cheap' },
];

const openFilters = () => filtersIsOpen.value = true;
const closeFilters = () => filtersIsOpen.value = false;
</script>

<style lang="scss">
.collective-page__products
{
	width: 100%;
}

.collective-page__list
{
	.title-section__heading
	{
		margin-bottom: 20px;
	}

	.title-section__title
	{
		line-height: 28px;
		font-weight: 500;
	}
}

.collective-page__actions
{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2px;
	margin-bottom: 30px;
	position: relative;

	.select
	{
		margin-bottom: 0;
	}

	.select__label
	{
		padding: 9px 66px 9px 14px;
	}

	.select__label-arrow
	{
		right: 13px;
	}
}

.collective-page__actions-offer
{
	min-width: 40px;
	height: 34px;
	padding: 7px 10px;

	span
	{
		display: none;
	}
}

.collective-page__filters-btn
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

.collective-page__filters-overlay
{
	display: none;
}

.collective-page__mobile-filters { display: none !important; }

.collective-page__heading
{
	display: none;
}

.collective-page__items
{
	margin-bottom: 38px;
}

.collective-page__more
{
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

.collective-page__more-btn
{
	padding: 10px 20px;
	color: #2C2C2C;
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;
	border: none;
	border-radius: 10px;
	background: #F4F5F7;
}

@include mq(0, $tablet - 1px )
{
	.collective-page__filters
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

	.collective-page__filters-overlay
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

	.collective-page__desktop-filters { display: none; }
	.collective-page__mobile-filters { display: block !important; }
}

@include mq($tablet)
{
	.collective-page__filters
	{
		display: block;
	}

	.collective-page__actions
	{
		gap: 10px;

		.select__label
		{
			padding: 10px 88px 10px 17px;
		}
	}

	.collective-page__filters-btn
	{
		display: none;
	}

	.collective-page__actions-offer
	{
		height: 38px;
		padding: 9px 16px;
		gap: 10px;

		span
		{
			display: inline;
			color: $blue;
			font-size: 13px;
			line-height: 19px;
			font-weight: 600;
			letter-spacing: -0.13px;
		}
	}

	.collective-page__content
	{
		display: flex;
		column-gap: 40px;
	}

	.collective-page__more-btn
	{
		font-size: 15px;
		line-height: 21px;
	}

}

@include mq($wd)
{
	.collective-page__content
	{
		display: flex;
		column-gap: 70px;
	}

	.collective-page__actions
	{
		margin-bottom: 33px;
		justify-content: space-between;

		.select__label
		{
			padding: 11px 102px 11px 20px;
		}
	}

	.collective-page__actions-offer
	{
		height: 40px;
		padding: 8px 30px;
		gap: 10px;

		span
		{
			font-size: 16px;
			line-height: 24px;
		}
	}

	.collective-page__heading
	{
		display: flex;
		border-radius: 14px;
		background: $lgray;
		padding: 16px 16px 16px 20px;
	}

	.collective-page__column
	{
		color: #868799;
		font-size: 15px;
		line-height: 20px;

		&:nth-of-type(1)
		{
			flex-basis: 6%;
		}

		&:nth-of-type(2)
		{
			flex-basis: 23.1%;
		}

		&:nth-of-type(3)
		{
			flex-basis: 14%;
		}

		&:nth-of-type(4)
		{
			flex-basis: 10.6%;
		}

		&:nth-of-type(5)
		{
			flex-basis: 19.5%;
		}

		&:nth-of-type(6)
		{
			flex-basis: 10.2%;
		}
	}

	.collective-page__more-btn
	{
		font-size: 19px;
		line-height: 26px;
	}
}

@include mq($fullhd)
{
	.collective-page__column
	{
		&:nth-of-type(6)
		{
			flex-basis: 11.7%;
		}
	}
}
</style>
