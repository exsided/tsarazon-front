<template>
	<div class="cart-order-info">
		<p class="cart-order-info__title">
			Заказ 1
		</p>
		<p v-if="requiredAmount > 0" class="cart-oder-info__text">
			Не набранна минимальная сумма заказа
		</p>
		<div class="cart-oder-info__progressbar">
			<ProgressbarVue :percent="pricePercent" />
			<p class="cart-oder-info__progressbar-text">
				{{ pricePercent }}%
			</p>
		</div>
		<p v-if="requiredAmount > 0" class="cart-order-info__price">
			Еще {{ NUMBER_FORMATTER(requiredAmount) }} <i class="ruble">₽</i>
		</p>
		<ul class="cart-order-info__list">
			<li class="cart-order-info__item">
				<span class="cart-order-info__item-text">Товар:</span>
				<span class="cart-order-info__item-price">{{ NUMBER_FORMATTER(currentOrderAmount) }} <i class="ruble">₽</i></span>
			</li>
			<li class="cart-order-info__item">
				<span class="cart-order-info__item-text">Доставка:</span>
				<span class="cart-order-info__item-price">Бесплатно</span>
			</li>
			<li class="cart-order-info__item">
				<span class="cart-order-info__item-text">Итого:</span>
				<span class="cart-order-info__item-price">{{ NUMBER_FORMATTER(currentOrderAmount) }} <i class="ruble">₽</i></span>
			</li>
		</ul>
		<button
			class="cart-order-info__btn button button--light-blue"
			:disabled="!canMakeOrder"
			@click="goToCheckout"
		>
			Оформить заказ
		</button>
	</div>
</template>

<script setup>
import ProgressbarVue from '@/components/Progressbar.vue';

import { NUMBER_FORMATTER } from '~/helpers/formatters';

defineProps({
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
	},
});

const emit = defineEmits(['go-to-checkout']);

const goToCheckout = () => emit('go-to-checkout');
</script>

<style lang="scss">
.cart-order-info{
	display: none;
}
@include mq($wd)
{
	.cart-order-info
    {
		display: block;
		margin-bottom: 30px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}

	.cart-order-info__title
	{
		color: #2C2C2C;
		font-size: 16px;
		font-weight: 400;
		line-height: 18px;
		margin-bottom: 10px;
	}

	.cart-oder-info__text
	{
		color: #F86635;
		font-size: 12px;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 0;
	}

	.cart-oder-info__progressbar
	{
		display: flex;
		align-items: center;
		column-gap: 8px;
		width: 100%;
		margin-bottom: 16px;

		.progressbar
		{
			width: 280px;
		}
	}

	.cart-oder-info__progressbar-text
	{
		margin-bottom: 0;
		color:  #868799;
		font-size: 16px;
		font-weight: 400;
		line-height: 18px;
	}

	.cart-order-info__price
	{
		margin-bottom: 16px;
		color:  #F86635;
		font-size: 12px;
		font-weight: 400;
		line-height: normal;
	}

	.cart-order-info__list
	{
		width: 100%;
		margin-bottom: 20px;
	}

	.cart-order-info__item
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 10px;
        &:last-child
        {
            margin-bottom: 0;
        }
	}

	.cart-order-info__item-text
	{
		color: #868799;
		font-size: 15px;
		font-weight: 400;
		line-height: normal;
	}

	.cart-order-info__item-price
	{
		color: #2C2C2C;
		text-align: right;
		font-size: 16px;
		font-weight: 600;
		line-height: 100%;
	}

	.cart-order-info__btn
	{
		display: block;
		width: 100%;
	}
}
</style>
