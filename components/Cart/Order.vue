<template>
	<div class="cart-order">
		<div class="cart-order__header">
			<div class="cart-order__info">
				<div class="cart-order__info-wr">
					<p class="cart-order__wr-order">
						Заказ №1
					</p>
					<p class="cart-order__wr-type">
						Коллективная закупка №1
					</p>
					<p class="cart-order__wr-supplier">
						Поставщик:
						<span class="cart-order__wr-supplier-link">
							{{ supplier.name }}
						</span>
					</p>
				</div>
				<div class="cart-order__info-date">
					<p class="cart-order__date-title">
						Дата поставки
					</p>
					<p class="cart-order__date">
						09.12.2023
					</p>
				</div>
			</div>
			<div class="cart-oder__value">
				<div class="cart-oder__progressbar">
					<ProgressbarVue :percent="pricePercent" />
					<div class="cart-oder__progressbar-text">
						<p class="cart-oder__progressbar-price">
							Мин. заказ: {{ NUMBER_FORMATTER(minimumOrderAmount) }} <i class="ruble">₽</i>
						</p>
						<p
							v-if="requiredAmount > 0"
							class="cart-oder__progressbar-balance"
						>
							Еще {{ NUMBER_FORMATTER(requiredAmount) }} <i class="ruble">₽</i>
						</p>
					</div>
				</div>
				<TrashSvg @click="deleteOrder" />
			</div>
		</div>
		<CartItem
			v-for="product in products"
			:id="product.id"
			:key="product.id"
			:active="product.active"
			:title="product.title"
			:picture="product.picture"
			:price="product.price"
			:quant="product.quant"
			:quant-unit="product.quantUnit"
			:quantity="product.quantity"
			:supplier-slug="supplier.slug"
			:link="product.link"
			:brand="product.brand"
		/>
		<div class="cart-order__footer">
			<ul class="cart-order__footer-list">
				<li class="cart-order__footer-item cart-order__footer-item--mobile">
					<span class="cart-order__footer-item-text">Товары:</span>
					<span class="cart-order__footer-item-value">{{ NUMBER_FORMATTER(currentOrderAmount) }} <i class="ruble">₽</i></span>
				</li>
				<li class="cart-order__footer-item cart-order__footer-item--mobile">
					<span class="cart-order__footer-item-text">Доставка:</span>
					<span class="cart-order__footer-item-value">Бесплатно</span>
				</li>
				<li class="cart-order__footer-item">
					<span class="cart-order__footer-item-text">Итого:</span>
					<span class="cart-order__footer-item-value">{{ NUMBER_FORMATTER(currentOrderAmount) }} <i class="ruble">₽</i></span>
				</li>
			</ul>
			<button
				class="cart-order__footer-btn button button--light-blue"
				:disabled="!canMakeOrder"
				@click="goToCheckout"
			>
				Оформить заказ
			</button>
		</div>
	</div>
</template>

<script setup>
import ProgressbarVue from '~/components/Progressbar.vue';
import CartItem from '~/components/Cart/Item.vue';

import TrashSvg from '~/public/svg/trash-orange.svg?skipsvgo';

import { NUMBER_FORMATTER } from '~/helpers/formatters.js';
import { useCartStore } from '~/store';

const props = defineProps({
	id:
	{
		type: Number,
		default: null,
	},
	active:
	{
		type: Boolean,
		default: false,
	},
	currentOrderAmount:
	{
		type: Number,
		default: 0,
	},
	minimumOrderAmount:
	{
		type: Number,
		default: 0,
	},
	supplier:
	{
		type: Object,
		default: () => ({ name: '', slug: '' }),
	},
	products:
	{
		type: Array,
		default: () => ([]),
	},
	pricePercent:
	{
		type: Number,
		default: 0,
	},
	canMakeOrder:
	{
		type: Boolean,
		default: false,
	},
	requiredAmount:
	{
		type: Number,
		default: 0,
	}
});

const emit = defineEmits(['go-to-checkout']);

const cartStore = useCartStore();

const deleteOrder = async () =>
{
	await cartStore.deleteOrder(props.id);
	cartStore.fetch(true);
};

const goToCheckout = () => emit('go-to-checkout');
</script>

<style lang="scss">
.cart-order
{
	margin-bottom: 20px;
}

.cart-order__header
{
	padding: 17px 16px;
	background-color: $lgray;
	border-radius: 10px;
}

.cart-order__info
{
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
}

.cart-order__info-wr
{
	flex-grow: 1;
}

.cart-order__wr-order
{
	color: $black;
	font-size: 14px;
	font-weight: 600;
	line-height: 20px;
	margin-bottom: 0;
}

.cart-order__wr-type
{
	color: $orange;
	font-size: 11px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.cart-order__wr-supplier
{
	color: $gray;
	font-size: 10px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 0;
	white-space: break-spaces;
	&-link
	{
		color: $blue;
	}
}

.cart-order__info-date
{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.cart-order__date-title
{
	color: $gray;
	font-size: 11px;
	font-weight: 400;
	line-height: 13px;
	margin-bottom: 0;
	white-space: nowrap;
}

.cart-order__date
{
	color: $black;
	font-size: 10px;
	font-family: Helvetica;
	font-weight: 400;
	line-height: 13px;
	margin-bottom: 0;
}

.cart-oder__value
{
	display: flex;
	justify-content: space-between;
	svg
	{
		cursor: pointer;
		@include transition();

		path
		{
			@include transition();
		}

		&:hover
		{
			transform: scale(1.1);
			path { stroke: $red; }
		}
	}
}

.cart-oder__progressbar
{
	.progressbar
	{
		width: 220px;
		margin-bottom: 4px;
	}
}

.cart-oder__progressbar-text
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 10px;
	width: 100%;
}

.cart-oder__progressbar-price
{
	color: $gray;
	font-size: 10px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 0;
}

.cart-oder__progressbar-balance
{
	color: $red;
	font-size: 10px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 0;
}

.cart-order__footer
{
	border-radius: 10px;
	padding: 16px;
	background-color: $lgray;
}

.cart-order__footer-list
{
	margin-bottom: 16px;
}

.cart-order__footer-item
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 6px;
	&:last-child
	{
		margin-bottom: 0;
	}
}

.cart-order__footer-item-text
{
	color: $gray;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;
}

.cart-order__footer-item-value
{
	color: $black;
	text-align: right;
	font-size: 12px;
	font-weight: 600;
	line-height: 100%;
}

.cart-order__footer-btn
{
	width: 100%;
	.button--light-blue
	{
		padding: 6px 30px;
	}
}

@include mq($tablet)
{
	.cart-order__header
	{
		display: flex;
		justify-content: space-between;
		column-gap: 50px;
	}

	.cart-order__info
	{
		margin-bottom: 0;
		align-items: center;
		flex-basis: 46%;
	}

	.cart-order__wr-order
	{
		font-size: 16px;
		line-height: 20px;
	}

	.cart-order__wr-supplier
	{
		font-size: 11px;
	}

	.cart-order__info-date
	{
		align-items: flex-start;
	}

	.cart-order__date-title
	{
		font-size: 12px;
		line-height: 13px;
		margin-bottom: 3px;
		white-space: nowrap;
	}

	.cart-order__date
	{
		font-size: 11px;
		line-height: 13px;
	}

	.cart-oder__progressbar
	{
		min-width: 268px;
		.progressbar
		{
			width: 100%;
		}
	}

	.cart-oder__value
	{
		column-gap: 22px;
		padding-top: 10px;
	}

	.cart-oder__progressbar-text
	{
		width: 100%;
	}
	.cart-order__footer
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
	}

	.cart-order__footer-item
	{
		column-gap: 200px;
	}

	.cart-order__footer-list
	{
		margin-bottom: 0;
	}

	.cart-order__footer-btn
	{
		max-width: 200px;
	}

	.cart-oder__progressbar-price
	{
		font-size: 11px;
	}

}

@include mq($desktop)
{
	.cart-oder__value
	{
		column-gap: 83px;
	}
}

@include mq($wd)
{
	.cart-order__wr-order
	{
		font-size: 18px;
		line-height: 20px;
	}

	.cart-order__wr-supplier
	{
		font-size: 12px;
	}

	.cart-order__date-title
	{
		font-size: 12px;
		line-height: 13px;
		margin-bottom: 6px;
	}

	.cart-order__date
	{
		font-size: 12px;
		line-height: 13px;
	}

	.cart-oder__progressbar-price
	{
		font-size: 12px;
	}

	.cart-oder__progressbar-balance
	{
		font-size: 12px;
	}

	.cart-oder__value
	{
		column-gap: 100px;
	}

	.cart-item__value-price
	{
		font-size: 18px;
	}

	.cart-item__value-count-quantity
	{
		font-size: 18px;
	}

	.cart-oder__progressbar
	{
		min-width: 280px;
		.progressbar
		{
			width: 100%;
		}
	}

	.cart-order__footer
	{
		padding: 19px 20px 19px 50px;
	}

	.cart-order__footer-list
	{
		width: 100%;
	}

	.cart-order__footer-item
	{
		width: 100%;
		margin-bottom: 0;
	}

	.cart-order__footer-item-text
	{
		font-size: 16px;
		font-weight: 600;
	}

	.cart-order__footer-item-value
	{
		font-size: 16px;
		font-weight: 600;
	}

	.cart-order__footer-item--mobile
	{
		display: none;
	}

	.cart-order__footer-btn
	{
		display: none;
	}
}
</style>
