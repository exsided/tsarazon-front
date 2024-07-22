<template>
	<NuxtLayout name="slk">
		<div class="slk-products container">
			<div class="slk-products__actions">
				<div class="slk-products__search">
					<UiInput
						v-model="searchText"
						name="search"
						placeholder="По названию/артикулу"
					/>
					<SearchSvg />
				</div>
				<div class="slk-products__actions-btns">
					<NuxtLink class="slk-products__actions-offer button button--light-blue">
						<RoundedPlusSvg /> <span>Предложить закупку</span>
					</NuxtLink>
					<NuxtLink class="slk-products__actions-offer button button--light-blue">
						<DownloadGoodsSvg /> <span>Загрузить товары</span>
					</NuxtLink>
				</div>
			</div>
			<div class="slk-products__sort">
				<UiSelect
					v-model="category"
					:options="categoryOptions"
					placeholder="Категория"
					class="slk-products__select"
				/>
				<UiSelect
					v-model="brand"
					:options="brandOptions"
					placeholder="Бренды"
					class="slk-products__select"
				/>
				<UiSelect
					v-model="price"
					:options="priceOptions"
					placeholder="Цена"
					class="slk-products__select"
				/>
				<UiSelect
					v-model="storage"
					:options="storageOptions"
					placeholder="Условия хранения"
					class="slk-products__select"
				/>
				<UiSelect
					v-model="city"
					:options="cityOptions"
					placeholder="Склад (город)"
					class="slk-products__select"
				/>
			</div>
			<div class="slk-tablet">
				<div class="slk-tablet__heading">
					<UiCheckbox />
					<div class="slk-tablet__column">
						ID
					</div>
					<div class="slk-tablet__column">
						Артикул
					</div>
					<div class="slk-tablet__column">
						Наименование
					</div>
					<div class="slk-tablet__column">
						Цена
					</div>
					<div class="slk-tablet__column">
						Склад (город)
					</div>
					<div class="slk-tablet__column">
						<NuxtLink class="slk-tablet__column-btn button button--light-blue">
							<StockSvg />
							<span>В наличии</span>
						</NuxtLink>
						<NuxtLink class="slk-tablet__column-btn slk-tablet__column-btn--download button button--light-blue">
							<DownloadSvg />
							<span>Скачать</span>
						</NuxtLink>
						<NuxtLink class="slk-tablet__column-btn slk-tablet__column-btn--red button button--light-blue">
							<DeleteSvg />
							<span>Удалить</span>
						</NuxtLink>
					</div>
					<TooltipVue
						class="slk-tablet__heading-tippy"
						placement="left-start"
						:with-arrow="false"
						:offset="[-17, -21]"
					>
						<template #trigger>
							<MoreSvg />
						</template>
						<template #content>
							<div class="slk-product__tippy-content">
								<button class="slk-product__tippy-btn">
									<DownloadSvg />
									Скачать
								</button>
								<button class="slk-product__tippy-btn slk-product__tippy-btn--orange">
									<DeleteSvg />
									Удалить
								</button>
								<div class="slk-product__tippy-close">
									<CrossSvg />
								</div>
							</div>
						</template>
					</TooltipVue>
				</div>
				<ProductVue
					v-for="i in 15"
					:key="i"
				/>
			</div>
			<div class="slk-products__more">
				<button class="slk-products__more-btn">
					Показать еще 24
				</button>
			</div>
			<UiPagination />
			<ScrollTop />
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiInput from '~/components/UI/Input.vue';
import UiSelect from '~/components/UI/Select.vue';
import UiCheckbox from '~/components/UI/Checkbox.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import ProductVue from '~/components/Slk/Product.vue';
import TooltipVue from '~/components/Tooltip.vue';
import ScrollTop from '~/components/ScrollTop.vue';

import SearchSvg from '~/assets/svg/search.svg?skipsvgo';
import RoundedPlusSvg from '~/assets/svg/rounded-plus.svg?skipsvgo';
import DownloadGoodsSvg from '~/assets/svg/download-goods.svg?skipsvgo';
import MoreSvg from '~/assets/svg/more-vertical.svg?skipsvgo';
import StockSvg from '~/assets/svg/tippy-stock.svg?skipsvgo';
import DownloadSvg from '~/assets/svg/tippy-download.svg?skipsvgo';
import DeleteSvg from '~/assets/svg/tippy-delete.svg?skipsvgo';
import CrossSvg from '~/assets/svg/tippy-cross.svg?skipsvgo';

const category = ref({ name: '', code: '' });

const categoryOptions =
[
	{ name: 'Сладости', code: 'sweets' },
	{ name: 'Крупы', code: 'cereals' },
];

const brand = ref({ name: '', code: '' });

const brandOptions =
[
	{ name: 'Baisad', code: 'Baisad' },
	{ name: 'Nutella', code: 'Nutella' },
];

const price = ref({ name: '', code: '' });

const priceOptions =
[
	{ name: 'дорогие', code: 'expensive' },
	{ name: 'дешёвые', code: 'cheap' },
];

const storage = ref({ name: '', code: '' });

const storageOptions =
[
	{ name: 'в холодильнике', code: 'fridge' },
	{ name: 'при комнатной температуре', code: 'room' },
];

const city = ref({ name: '', code: '' });

const cityOptions =
[
	{ name: 'Владикавказ', code: 'Vladikavkaz' },
	{ name: 'Волгоград', code: 'Volgograd' },
];
</script>

<style lang="scss">
@import '~/assets/scss/slk-tablet.scss';

.slk-products
{
	margin-bottom: 50px;
}

.slk-products__actions
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 23px;
}

.slk-products__search
{
	position: relative;
	z-index: 12;
	max-height: 37px;

	svg
	{
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}

	.ui-input__field
	{
		width: 100%;
		height: 37px;
		padding: 9px 16px;
		font-size: 14px;
		line-height: 19px;
		font-weight: 400;
		background-color: $lgray;
		border-radius: 10px;
		border: unset;
		outline: unset;

		&::placeholder { color: rgba(44, 44, 44, 0.4); }
	}
}

.slk-products__actions-btns
{
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.slk-products__actions-offer
{
	width: 100%;
	gap: 8px;
	font-size: 14px;
	line-height: 21px;
	font-weight: 600;
	letter-spacing: -0.14px;
}

.slk-products__sort
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 32px;
}

.slk-products__select
{
	.select
	{
		margin-bottom: 0;
	}

	.select__label
	{
		padding: 10px 66px 10px 16px;
	}

	.select__label-arrow
	{
		right: 16px;
	}
}

.slk-products__more
{
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

.slk-products__more-btn
{
	padding: 10px 20px;
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;
	border: none;
	border-radius: 10px;
	background: $lgray;
}

@include mq($tablet)
{
	.slk-products
	{
		margin-bottom: 60px;
	}

	.slk-products__actions
	{
		flex-direction: row;
		gap: 10px;
	}

	.slk-products__search
	{
		max-height: 40px;
		flex-basis: 65%;

		.ui-input__field
		{
			height: 40px;
			padding: 10.5px 16px;
		}
	}

	.slk-products__actions-btns
	{
		flex-direction: row;
	}

	.slk-products__actions-offer
	{
		max-height: 40px;
		max-width: 202px;
		padding: 10px 14px;

		&:last-child
		{
			max-width: 180px;
		}
	}

	.slk-products__sort
	{
		flex-direction: row;
		flex-wrap: wrap;
	}

	.slk-products__select
	{
		flex-basis: 32.4%;

		&.select
		{
			margin-bottom: 0;
		}

		.select__label
		{
			border-radius: 6px;
		}

		.select__label-text
		{
			font-size: 12px;
			line-height: 16px;
		}
	}

	.slk-products__more-btn
	{
		font-size: 15px;
		line-height: 21px;
	}
}

@include mq($wd)
{
	.slk-products
	{
		margin-bottom: 80px;
	}

	.slk-products__actions
	{
		gap: unset;
		justify-content: space-between;
	}

	.slk-products__sort
	{
		flex-wrap: nowrap;
	}

	.slk-products__search
	{
		flex-basis: 41.4%;

		.ui-input__field
		{
			font-size: 16px;
			line-height: 22px;
			padding: 9px 20px;
		}
	}

	.slk-products__actions-btns
	{
		justify-content: space-between;
		gap: 16px;
	}

	.slk-products__actions-offer
	{
		padding: 11px 16px;
		max-width: 208px;
		width: 208px;

		&:last-child
		{
			max-width: 186px;
			width: 186px;
		}
	}

	.slk-products__select
	{
		flex-basis: 20%;

		.select__label
		{
			padding: 10px 66px 10px 20px;
		}

		.select__label-text
		{
			font-size: 13px;
			line-height: 18px;
		}
	}

	.slk-products__more-btn
	{
		font-size: 18px;
		line-height: 25px;
	}
}
</style>
