<template>
	<div class="product-card">
		<div class="product-card__img">
			<div class="product-card__label">
				<div
					v-if="discountPercent"
					class="product-card__label-discount"
				>
					-{{ discountPercent }}%
				</div>
				<div
					v-if="collective"
					class="product-card__label-group"
				>
					<span>Коллективная закупка</span>
					<img src="/svg/group-buying.svg" alt="">
				</div>
			</div>
			<button class="product-card__fast-view" @click="openPreviewPopup">
				Быстрый просмотр
			</button>
			<NuxtLink :to="link" class="product-card__picture">
				<img :src="pictures[0]">
			</NuxtLink>
			<div v-if="pictures.lenght" class="product-card__slider">
				<NuxtLink
					v-for="picture, i in pictures"
					:key="i"
					:to="link"
					class="product-card__slide"
				>
					<img :src="picture" class="product-card__slide-img">
					<div class="product-card__slide-dot" />
				</NuxtLink>
			</div>
		</div>
		<NuxtLink :to="link" class="product-card__title">
			{{ title }}
		</NuxtLink>
		<div class="product-card__text">
			{{ quant }} {{ quantUnit }} в упаковке
		</div>
		<div class="product-card__buy">
			<div class="product-card__price">
				<span class="product-card__price-from">от</span>{{ formattedPrice }}
				<span>
					<i class="ruble">₽</i>/{{ quantUnit }}
				</span>
			</div>
			<NuxtLink
				v-if="isInCart"
				to="/cart"
				class="product-card__btn button button--blue"
			>
				В корзине
			</NuxtLink>
			<NuxtLink
				v-else
				:to="link"
				class="product-card__btn button button--blue"
			>
				В корзину {{ quant }}{{ quantUnit }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { NUMBER_FORMATTER } from '~/helpers/formatters.js';
import { usePopupsStore } from '~/store';

const props = defineProps({
	title:
	{
		type: String,
		default: 'Паста ореховая "Шоколадно -фундучная" без добавления сахара',
	},
	id:
	{
		type: Number,
		default: 0,
		required: true,
	},
	pictures:
	{
		type: Array,
		default: () =>
			[
				'/img/index-product-card.png',
				'/img/index-product-card-2.png',
				'/img/index-product-card.png',
				'/img/index-product-card-2.png',
				'/img/index-product-card.png',
				'/img/index-product-card-2.png',
				'/img/index-product-card.png',
				'/img/index-product-card-2.png',
			],
	},
	link:
	{
		type: String,
		default: '',
	},
	price:
	{
		type: Number,
		default: 0,
	},
	oldPrice:
	{
		type: Number,
		default: 0,
	},
	quant:
	{
		type: Number,
		default: 12,
	},
	quantUnit:
	{
		type: String,
		default: 'шт',
	},
	collective:
	{
		type: Boolean,
		default: true,
	}
});
const popupsStore = usePopupsStore();
const {
	isInCart,
} = useProduct(props.id);

const discountPercent = computed(() =>
{
	if (props.oldPrice)
		return Math.abs(100 - Math.floor((props.price * 100) / props.oldPrice));
	return 0;
});
const formattedPrice = computed(() => NUMBER_FORMATTER(props.price));
const openPreviewPopup = () => popupsStore.setState(['PreviewPopup', true]);
</script>

<style lang="scss">

.product-card__img
{
	width: 100%;
	border-radius: 6px;
	margin-bottom: 8px;
	position: relative;
	display: flex;
	justify-content: center;
	background: linear-gradient(-90deg, rgba(93, 95, 107, 0.30) 0%, rgba(217, 217, 217, 0.00) 120%);
}

.product-card__picture
{
	border-radius: 6px;
	width: 100%;
	aspect-ratio: 1/1;

	img
	{
		border-radius: 6px;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}
}

/* slider */
.product-card__slider
{
	position: absolute;
	z-index: 1;
	inset: 0;
	display: none;
	&:not(:hover) .product-product-card__slide:first-child .product-product-card__slide-img
	{
		z-index: -1;
		opacity: 1;
	}

	&:hover { background-color: $white; }
}

.product-card__slide
{
	position: static;
	display: flex;
	flex: 1;
	align-items: flex-end;
	height: 100%;
	.product-card__slide-img{opacity: 0;}
	&:hover
	{
		.product-card__slide-dot:after{background-color: #3772FE;}
		.product-card__slide-img
		{
			z-index: -1;
			opacity: 1;
		}
	}
	&:first-child .product-card__slide-dot:after{left: 3px;}
	&:last-child .product-card__slide-dot:after{right: 3px;}
}

.product-card__slide-img
{
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border: 0;
	border-radius: 8px;
	object-fit: contain;
	overflow: hidden;
	z-index: -2;
	transition: .4s;
	background: linear-gradient(-90deg, rgba(93, 95, 107, 0.30) 0%, rgba(217, 217, 217, 0.00) 120%);
}

.product-card__slide-dot
{
	position: relative;
	z-index: 4;
	bottom: -16px;
	flex: 1;
	min-height: 7px;
	opacity: 0;
	transition: .3s;
}

.product-card__slide-dot:after
{
	position: absolute;
	top: 1px;
	right: 1px;
	bottom: 2px;
	left: 1px;
	height: 6px;
	border-radius: 6px;
	content: "";
	background-color: #E3EEF2;;
	transition: background-color .2s;
}

/* slider */

.product-card__label
{
	position: absolute;
	top: 10px;
	left: 10px;
	display: flex;
	height: 20px;
	gap: 4px;
	z-index: 4;
}

.product-card__label-discount
{
	background: #F86635;
	padding: 3px 6.5px;
	border-radius: 10px;
	font-size: 10px;
	line-height: 14px;
	color: #FFFFFF;
}

.product-card__label-group
{
	background: #3772FE;
	padding: 4px 6.5px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	span
	{
		display: inline-block;
		font-size: 10px;
		line-height: 14px;
		color: #FFFFFF;
		transition: .3s;
		max-width: 0;
		overflow: hidden;
		white-space: nowrap;
	}

	img
	{
		width: 15px;
	}
}

.product-card__fast-view
{
	@include transition();
	opacity: 0;
	width: 180px;
	padding: 8px 0;
	position: absolute;
	top: calc(50% - 20px);
	left: calc(50% - 90px);
	z-index: 4;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 10px;
	border: none;
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
	color: #868799;
	display: none;
	&:hover
	{
		color: rgb(55, 114, 254);
	}
}

.product-card__title
{
	display: block;
	font-weight: 600;
	font-size: 10px;
	line-height: 14px;
	color: #2C2C2C;
	margin-bottom: 8px;
}

.product-card__text
{
	font-size: 11px;
	line-height: 15px;
	color: #868799;
	margin-bottom: 12px;
}

.product-card__buy
{
	display: flex;
	flex-direction: column;
}

.product-card__buy-wr
{
	margin-bottom: 11px;
}

.product-card__price
{
	font-weight: 600;
	font-size: 20px;
	line-height: 18px;
	margin-bottom: 11px;

	span
	{
		font-size: 14px;
		margin-left: -2px;
		display: inline-block;
		&::first-letter
		{
			font-family: system-ui;
		}
	}
}

.product-card__price-from
{
	display: none;
}

.product-card__btn
{
	width: 100%;
	height: 36px;
	padding: 0;
	font-size: 13px;
	line-height: 18px;
}

@include mq($tablet)
{
	.product-card__img
	{
		margin-bottom: 26px;
	}

	.product-card__picture
	{
		aspect-ratio: 1.51/1;
	}

	.product-card__title
	{
		display: block;
		font-size: 12px;
		line-height: 16px;
		margin-bottom: 14px;
	}

	.product-card__text
	{
		font-size: 12px;
		line-height: 16px;
		margin-bottom: 13px;
	}

	.product-card__buy
	{
		max-height: 36px;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}

	.product-card__price
	{
		margin-bottom: 0;
	}

	.product-card__buy-wr
	{
		margin-bottom: 0;
	}

	.product-card__btn
	{
		max-width: 128px;
	}
}

@include mq($wd)
{
	.product-card
	{
		&:hover
		{
			.product-card__fast-view
			{
				display: block;
				opacity: 1;
			}

			.product-card__slide-dot
			{
				opacity: 1;
			}
		}
	}

	.product-card__img
	{
		margin-bottom: 26px;
	}

	.product-card__picture
	{
		aspect-ratio: 5/4;
	}

	.product-card__slider
	{
		display: flex;
	}

	.product-card__title
	{
		font-size: 13px;
		line-height: 18px;
		margin-bottom: 8px;
	}

	.product-card__text
	{
		font-size: 14px;
		line-height: 19px;
		margin-bottom: 14px;
	}

	.product-card__label-group
	{
		&:hover
		{
			span
			{
				max-width: 160px;
				margin-right: 6px;
			}
		}
	}

	.product-card__buy
	{
		max-height: 38px;
	}

	.product-card__buy-wr
	{
		display: flex;
		align-items: flex-end;
	}

	.product-card__price
	{
		font-size: 16px;
		line-height: 18px;
		margin-bottom: 5px;

		span
		{
			font-size: 14px;
			line-height: 20px;
			margin-left: 0;
			margin-right: 2px;
		}
	}

	.product-card__price-from
	{
		display: inline;
	}

	.product-card__btn
	{
		height: 38px;
		max-width: 132px;
	}
}

@include mq($fullhd)
{
	.product-card__img
	{
		max-height: 160px;
	}

	.product-card__price
	{
		font-size: 20px;
		line-height: 20px;
	}
}
</style>
