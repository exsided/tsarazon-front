<template>
	<div class="slk-product">
		<UiCheckbox />
		<p class="slk-product__id">
			10000598
		</p>
		<p class="slk-product__article">
			123-4
		</p>
		<p class="slk-product__title">
			Томатная паста Baisad, 0.25кг
		</p>
		<p class="slk-product__price">
			25-35
			<i class="ruble">₽</i>
		</p>
		<div class="slk-product__icons">
			<div class="slk-product__stock">
				<span class="slk-product__stock-circle slk-product__stock-circle--blue" />
				<span class="slk-product__stock-text">В наличии</span>
			</div>
			<div class="slk-product__download">
				<ProductDownloadSvg />
			</div>
			<div class="slk-product__delete">
				<ProductDeleteSvg />
			</div>
		</div>
		<p class="slk-product__city">
			г. Владикавказ ГПК
		</p>
		<TooltipVue
			class="slk-product__tippy"
			placement="left-start"
			:with-arrow="false"
			:offset="[-10, -15]"
		>
			<template #trigger>
				<MoreSvg />
			</template>
			<template #content>
				<div class="slk-product__tippy-content">
					<button class="slk-product__tippy-btn">
						<StockSvg />
						В наличии
					</button>
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
</template>

<script setup>
import UiCheckbox from '~/components/UI/Checkbox.vue';
import TooltipVue from '~/components/Tooltip.vue';

import MoreSvg from '~/assets/svg/more-vertical.svg?skipsvgo';
import StockSvg from '~/assets/svg/tippy-stock.svg?skipsvgo';
import DownloadSvg from '~/assets/svg/tippy-download.svg?skipsvgo';
import DeleteSvg from '~/assets/svg/tippy-delete.svg?skipsvgo';
import CrossSvg from '~/assets/svg/tippy-cross.svg?skipsvgo';
import ProductDownloadSvg from '~/assets/svg/slk-order-download.svg?skipsvgo';
import ProductDeleteSvg from '~/assets/svg/slk-order-delete.svg?skipsvgo';
</script>

<style lang="scss">
.slk-product
{
	display: grid;
	grid-template-areas:
	'id     article   article   article'
	'title  title     title     price'
	'stock  city     city      city';
	grid-template-columns: 38% 38% 15px 40%;
	grid-template-columns: 75px 1fr 1fr 1fr;
	row-gap: 16px;

	padding: 10px;
	padding-left: 38px;
	position: relative;

	.ui-checkbox
	{
		position: absolute;
		top: 10px;
		left: 10px;
	}

	.ui-checkbox__body
	{
		align-items: flex-start;
	}

	.ui-checkbox__box
	{
		border: 1px solid $gray;
		margin-right: 0;
	}

	.ui-checkbox__input
	{
		&:enabled
		{
			&:checked
			{
				& ~ .ui-checkbox__body .ui-checkbox__box
				{
					border: 1px solid $blue;
				}
			}
		}
	}

	p { margin-bottom: 0; }
}

.slk-product__tippy
{
	position: absolute;
	top: 10px;
	right: 10px;
}

.slk-product__tippy-content
{
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-right: 28px;
	padding-bottom: 2px;
}

.slk-product__tippy-btn
{
	display: flex;
	align-items: center;
	gap: 4px;
	border: none;
	color: $blue;
	font-size: 13px;
	line-height: 18px;
	font-weight: 600;
	font-family: 'Open Sans';

	&--orange
	{
		color: $red;
	}
}

.slk-product__tippy-close
{
	position: absolute;
	top: 0;
	right: -5px;
}

.slk-product__id
{
	grid-area: id;
	font-size: 13px;
	line-height: 18px;
	font-weight: 600;
}

.slk-product__article
{
	grid-area: article;
	font-size: 11px;
	line-height: 15px;
}

.slk-product__title
{
	grid-area: title;
	font-size: 11px;
	line-height: 15px;
}

.slk-product__price
{
	grid-area: price;
	font-size: 11px;
	line-height: 15px;
	text-align: right;
}

.slk-product__stock
{
	grid-area: stock;
	display: flex;
	align-items: center;
}

.slk-product__stock-circle
{
	display: inline-block;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	margin-right: 2px;

	&--blue
	{
		background: $blue;
	}

	&--gray
	{
		background: $lgray;
	}
}

.slk-product__stock-text
{
	font-size: 11px;
	line-height: 15px;
	color: $black;
}

.slk-product__city
{
	grid-area: city;
	font-size: 11px;
	line-height: 15px;
	text-align: right;
}

.slk-product__download,
.slk-product__delete
{
	display: none;
}

@include mq($tablet)
{
	.slk-product
	{
		display: flex;
		align-items: center;
		padding: 16px 16px 16px 38px;

		.ui-checkbox
		{
			top: 16.5px;
		}
	}

	.slk-product__tippy
	{
		top: 16px;
		right: 16px;
	}

	.slk-product__article,
	.slk-product__title,
	.slk-product__price,
	.slk-product__city
	{
		font-size: 13px;
		line-height: 18px;
	}

	.slk-product__id
	{
		font-weight: 400;
		flex-basis: 11%;
	}

	.slk-product__article
	{
		flex-basis: 10.8%;
	}

	.slk-product__title
	{
		flex-basis: 32%;
	}

	.slk-product__price
	{
		text-align: left;
		flex-basis: 11%;
	}

	.slk-product__city
	{
		text-align: left;
		flex-basis: 18%;
	}

	.slk-product__icons
	{
		order: 1;
		flex-basis: 12.4%;
	}

	.slk-product__stock
	{
		justify-content: center;
	}

	.slk-product__stock-text
	{
		display: none;
	}
}

@include mq($wd)
{
	.slk-product
	{
		padding: 28px 20px 28.5px 58px;

		.ui-checkbox
		{
			top: 28px;
			left: 20px;
		}
	}

	.slk-product__tippy
	{
		display: none;
	}

	.slk-product__id,
	.slk-product__article,
	.slk-product__title,
	.slk-product__price,
	.slk-product__city
	{
		font-size: 16px;
		line-height: 22px;
	}

	.slk-product__id
	{
		flex-basis: 10%;
	}

	.slk-product__article
	{
		flex-basis: 8%;
	}

	.slk-product__title
	{
		flex-basis: 24.5%;
	}

	.slk-product__price
	{
		flex-basis: 11.5%;
	}

	.slk-product__city
	{
		flex-basis: 16%;
	}

	.slk-product__icons
	{
		display: flex;
		flex-basis: 30%;
		gap: 104px;
		justify-content: flex-end;
	}

	.slk-product__stock-circle
	{
		width: 20px;
		height: 20px;
	}

	.slk-product__download,
	.slk-product__delete
	{
		display: block;
	}

	.slk-product__delete
	{
		margin-right: 47px;
	}
}
</style>
