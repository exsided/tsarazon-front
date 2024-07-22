<template>
	<div class="catalog-filters">
		<CloseSvg
			class="catalog-filters__btn-back"
			@click="onClose"
		/>
		<button class="button button--blue catalog-filters__btn-apply" @click="applyFilters">
			Применить фильтр
		</button>
		<div class="catalog-filters__menu">
			<!-- <div class="catalog-filters__filter">
				<p class="catalog-filters__filter-title">
					Открытая закупка
				</p>
				<div class="catalog-filters__btn-radio">
					<UiRadio>
						Да
					</UiRadio>
					<UiRadio>
						Нет
					</UiRadio>
				</div>
			</div> -->
			<div
				v-for="filter, filterCode in filters"
				:key="filterCode"
				class="catalog-filters__filter"
			>
				<p class="catalog-filters__filter-title">
					{{ filter.label }}
				</p>
				<template v-if="filter.type === 'checkbox'">
					<UiCheckbox
						v-for="option, optionIdx in filter.options"
						v-show="canShowField(optionIdx, filter.maxlength, filter.isExpanded)"
						:key="`${filterCode}-${filter.type}-${optionIdx}`"
						:name="filterCode"
						:model-value="isChecked(option.code, filter.value)"
						@update:model-value="checkoxHandler(filterCode, option.code)"
					>
						{{ option.name }}
					</UiCheckbox>
					<template v-if="filter.maxlength && filter.options.length > filter.maxlength">
						<p
							class="catalog-filters__filter-btn"
							@click="expandFilter(filterCode)"
						>
							<template v-if="filter.isExpanded">
								Свернуть
							</template>
							<template v-else>
								Показать больше
							</template>
						</p>
					</template>
				</template>
				<template v-if="filter.type === 'radio'">
					<UiRadio
						v-for="option, optionIdx in filter.options"
						v-show="canShowField(optionIdx, filter.maxlength, filter.isExpanded)"
						:key="`${filterCode}-${filter.type}-${optionIdx}`"
						:name="filterCode"
						:model-value="filter.value"
						:code="option.code"
						@update:model-value="radioHandler(filterCode, option.code)"
					>
						{{ option.name }}
					</UiRadio>
					<p class="catalog-filters__filter-btn">
						Показать больше
					</p>
				</template>
				<template v-if="filter.type === 'range'">
					<RangeFilter
						:from="filter.value.from"
						:to="filter.value.to"
						@update:from="rangeFilterHandler(filterCode, 'from', $event)"
						@update:to="rangeFilterHandler(filterCode, 'to', $event)"
					/>
				</template>
			</div>
		</div>
		<button class="button button--blue catalog-filters__btn-apply" @click="applyFilters">
			Применить фильтр
		</button>
	</div>
</template>

<script setup>
import UiRadio from '~/components/UI/Radio.vue';
import UiCheckbox from '~/components/UI/Checkbox.vue';
import RangeFilter from '~/components/Catalog/RangeFilter.vue';

import CloseSvg from '~/assets/svg/cross-mark.svg?skipsvgo';

const props = defineProps({
	filters:
	{
		type: Object,
		default: () => ({}),
	},
});
const emit = defineEmits(['close', 'update:filters', 'apply']);

const canShowField = (index, maxlength, isExpanded) =>
{
	if (maxlength === undefined)
		return true;

	if (index >= maxlength)
		return isExpanded;

	return true;
};

const expandFilter = (filter) =>
{
	const filters = { ...props.filters };
	filters[filter].isExpanded = !filters[filter].isExpanded;

	updateFilters(filters);
};

const radioHandler = (filter, value) =>
{
	const filters = { ...props.filters };
	filters[filter].value = value;

	updateFilters(filters);
};

const checkoxHandler = (filter, value) =>
{
	const filters = { ...props.filters };
	const values = filters[filter].value;
	const idx = values.findIndex(el => el === value);

	if (idx > -1)
		values.splice(idx, 1);
	else
		values.push(value);

	filters[filter].value = values;

	updateFilters(filters);
};

const rangeFilterHandler = (filter, propName, value) =>
{
	const filters = { ...props.filters };

	filters[filter].value[propName] = value;

	updateFilters(filters);
};

const isChecked = (code, values) => values.find(el => el === code) !== undefined;

const updateFilters = filters => emit('update:filters', filters);
const applyFilters = () => emit('apply');

const onClose = () => emit('close');
</script>

<style lang=scss>
.catalog-filters
{
	max-width:240px;
	padding: 47px 10px 15px;
	position: relative;
	.ui-checkbox__body{ margin-bottom: 10px; }

	.ui-checkbox__text
	{

		font-size: 12px;
		font-weight: 400;
		line-height: 22px;
		color: #868799;
	}
}

.catalog-filters__menu
{
	padding: 11px 0;
	border: 1px solid #F4F5F7;
	border-radius: 0px 18px 18px 0px;
	margin-bottom: 20px;
}

.catalog-filters__btn-back
{
	position: absolute;
	right: 15px;
	top: 15px;
}

.catalog-filters__btn-apply
{
	padding: 9px 24px;
	width: 100%;
	max-width: 210px;
	margin-bottom: 20px;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
}

.catalog-filters__filter
{
	padding: 12px 10px 15px;
	border-bottom: 1px solid #F4F5F7;
	&:last-child
	{
		border-bottom: none;
		padding-bottom: 0;
	}
}

.catalog-filters__filter-title
{
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 17px;
	color: #2C2C2C;
	margin-bottom: 16px;
}

.catalog-filters__filter-btn
{
	font-weight: 600;
	font-size: 12px;
	line-height: 17px;
	color: #F69421;
	margin: 0;
	cursor: pointer;
	width: fit-content;
}

.catalog-filters__list-item{ margin-bottom: 10px; }

.catalog-filters__btn-radio
{
	display: flex;
	align-items: center;
	column-gap: 40px;
}

@include mq($tablet)
{
	.catalog-filters{padding: 0;}

	.catalog-filters__menu{ border-radius: 10px 10px 10px 10px; }

	.catalog-filters__btn-back{ display: none;}
}

@include mq($wd)
{
	.catalog-filters { max-width:250px; }

	.catalog-filters__filter-title
	{
		font-size: 14px;
		line-height: 19px;
		color: #2C2C2C;
	}

	.catalog-filters__btn-apply
	{
		padding: 7px 24px;
		max-width: 250px;
		margin-bottom: 30px;
		font-size: 18px;
		line-height: 26px;
	}

	.catalog-filters__filter-btn
	{
		font-size: 14px;
		line-height: 19px;
	}

	.catalog-filters
	{
		.ui-checkbox__text
		{
			font-size: 13px;
			font-weight: 400;
			line-height: 22px;
		}
	}
}
</style>
