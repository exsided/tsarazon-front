<template>
	<NuxtLayout name="lk">
		<template #page-top>
			<UiBreadcrumbs :items="breadcrumbs" />
			<h1 class="orders-page__title">
				{{ title }}
			</h1>
		</template>
		<template #page>
			<div class="orders-page">
				<div class="orders-page__filters">
					<div class="orders-page__filter">
						<NuxtLink to="#all" class="orders-page__filter-link">
							Все
						</NuxtLink>
						<OrderMeter count="6" class="orders-page__meter" />
					</div>
					<div class="orders-page__filter">
						<NuxtLink to="#active" class="orders-page__filter-link active">
							Активные
						</NuxtLink>
						<OrderMeter count="1" class="orders-page__meter" />
					</div>
					<div class="orders-page__filter">
						<NuxtLink to="#completed" class="orders-page__filter-link">
							Завершенные
						</NuxtLink>
						<OrderMeter count="1" class="orders-page__meter" />
					</div>
				</div>
				<div class="orders-page__select">
					<UiSelect
						v-model="sort"
						:options="sortOptions"
						placeholder="Сортировать по цене"
					/>
				</div>
				<div class="orders-page__list">
					<OrderCard :is-collective="isCollective = true" />
					<OrderCard
						v-for="i in 5"
						:key="i"
						:is-collective="isCollective = false"
					/>
				</div>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import UiSelect from '~/components/UI/Select.vue';
import OrderCard from '~/components/LK/OrderCard.vue';
import OrderMeter from '~/components/LK/Meter.vue';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Личный кабинет', link: '/lk' }, { name: 'Заказы', link: '/lk/orders' }];
const title = 'Заказы';
useHead({ title: 'Личный кабинет' });

const sort = ref({ name: '', code: '' });

const sortOptions =
[
	{ name: 'дорогие', code: 'expensive' },
	{ name: 'дешёвые', code: 'cheap' },
];
</script>

<style lang="scss">
.orders-page
{
	margin-bottom: 50px;
}

.orders-page__title
{
	margin-bottom: 30px;
	font-weight: 500;
	font-family: 'Ubuntu';
}

.orders-page__filters
{
	display: flex;
	gap: 16px;
	margin-bottom: 30px;
}

.orders-page__filter
{
	display: flex;
}

.orders-page__meter
{
	align-self: flex-start;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 8px;
	line-height: 9px;
}

.orders-page__filter-link
{
	font-size: 16px;
	line-height: 22px;
	font-weight: 600;
	@include transition();

	&:hover
	{
		color: $blue;
	}

	&.active
	{
		color: $blue;
	}
}

.orders-page__select
{
	display: flex;
	align-items: center;
	justify-content: flex-end;
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

.orders-page__list
{
	display: flex;
	flex-direction: column;
	gap: 20px;
}

@include mq($tablet)
{
	.orders-page
	{
		flex-basis: 71%;
		margin-bottom: 60px;
	}

	.orders-page__filters
	{
		gap: 30px;
	}

	.orders-page__meter
	{
		font-size: 10px;
		line-height: 9px;
		padding: 2px 3.5px 1px 3.5px;
	}

	.orders-page__filter-link
	{
		font-size: 18px;
		line-height: 25px;
		margin-right: 1px;
	}

	.orders-page__select
	{
		.select
		{
			margin-bottom: 0;
		}

		.select__label
		{
			padding: 10px 89px 10px 16px;
		}
	}

	.orders-page__list
	{
		margin-right: 7px;
	}
}

@include mq($wd)
{
	.orders-page
	{
		flex-basis: 76.7%;
		margin-bottom: 80px;
	}

	.orders-page__title
	{
		font-size: 26px;
		line-height: 38px;
	}

	.orders-page__filters
	{
		margin-bottom: 33px;
	}

	.orders-page__meter
	{
		font-size: 14px;
		line-height: 12px;
		padding: 2px 4px;
	}

	.orders-page__filter-link
	{
		font-size: 22px;
		line-height: 30px;
		margin-right: 1px;
	}

	.orders-page__select
	{
		.select__label
		{
			padding: 11px 103px 11px 20px;
		}

		.select__label-arrow
		{
			right: 19px;
		}
	}

	.orders-page__list
	{
		margin-right: 0;
	}
}
</style>
