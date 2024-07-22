<template>
	<div class="header-cities">
		<div class="header-cities__field">
			<input
				v-model="searchText"
				type="text"
				placeholder="Поиск"
				@input="searchHandler"
			>
			<SearchSvg />
		</div>
		<CustomScrollbar>
			<template v-if="cities.length">
				<button
					v-for="city in cities"
					:key="city.slug"
					:class="{current: city.slug === currentCity.slug}"
					class="header-cities__item"
					@click="selectCity(city)"
				>
					{{ city.title }}
				</button>
			</template>
			<div v-else class="header-cities__empty-view">
				По вашему запросу ничего не найдено
			</div>
		</CustomScrollbar>
	</div>
</template>

<script setup>
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import SearchSvg from '~/assets/svg/search.svg?skipsvgo';

import { useCitiesStore } from '~/store';

const emit = defineEmits(['close']);

const citiesStore = useCitiesStore();
const searchText = ref('');
const timeout = ref(null);

const fetchCities = async () =>
{
	await citiesStore.fetch(searchText.value);
};

const searchHandler = () =>
{
	clearTimeout(timeout.value);
	timeout.value = setTimeout(() => fetchCities(), 200);
};

const selectCity = (city) =>
{
	citiesStore.selectCity(city);
	emit('close');
};

const cities = computed(() => citiesStore.list);
const currentCity = computed(() => citiesStore.current);

if (!cities.length)
	fetchCities();

onBeforeUnmount(() =>
{
	if (searchText.value)
		citiesStore.list = [];
});
</script>

<style lang="scss">
	.header-cities
	{
		background-color: #FFFFFF;
		border-radius: 10px;
		box-shadow: 0px 0px 20px rgba(93, 95, 107, 0.1);
		padding: 6px;
	}
	.header-cities__field
	{
		position: relative;
		margin-bottom: 6px;

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
	.header-cities__item
	{
		display: block;
		margin-bottom: 10px;
		font-weight: 600;
		font-size: 15px;
		line-height: 22px;
		color: #868799;
		width: 100%;
		border: unset;
		border-radius: 4px;
		@include transition();
		text-align: left;
		padding: 2px 10px;

		&.current { color: $blue; }

		&:hover { background-color: #F4F5F7; }
	}
	.header-cities__empty-view
	{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		font-size: 12px;
		line-height: 16px;
		color: rgba(44, 44, 44, 0.4);
	}
</style>
