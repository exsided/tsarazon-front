<template>
	<div class="product-actions">
		<div>
			<NuxtLink class="product-actions__btn button button--blue">
				Коллективная закупка
			</NuxtLink>
			<transition name="fade">
				<div v-if="order" class="product-actions__total">
					<p class="product-actions__total-title">
						Заказ {{ order.name }}
					</p>
					<div class="product-actions__summary">
						<p class="product-actions__summary-label">
							Итого:
						</p>
						<p class="product-actions__cost">
							{{ NUMBER_FORMATTER(order.currentOrderAmount) }}
							<i class="ruble">₽</i>
						</p>
					</div>
				</div>
			</transition>
			<transition name="fade">
				<div v-if="order" class="product-actions__order">
					<p class="product-actions__text">
						Мин. заказ: {{ NUMBER_FORMATTER(order.minimumOrderAmount) }} <i class="ruble">₽</i>
					</p>
					<div class="product-actions__progressbar">
						<ProgressbarVue :percent="order.pricePercent" />
						<p class="product-actions__progressbar-value">
							{{ order.pricePercent }}%
						</p>
					</div>
					<transition name="fade">
						<p v-if="order.requiredAmount > 0" class="product-actions__text product-actions__text--orange">
							Еще {{ NUMBER_FORMATTER(order.requiredAmount) }} <i class="ruble">₽</i>
						</p>
					</transition>
				</div>
			</transition>
			<div class="product-actions__info">
				<p class="product-actions__name">
					Торт медовик, Анечка, 570г
				</p>
				<div class="product-actions__price">
					{{ formattedPrice }}
					<span>
						<i class="ruble">₽</i>/{{ quantUnit }}
					</span>
				</div>
				<div class="product-actions__supplier">
					<p class="product-actions__text">
						Поставщик:
					</p>
					<p class="product-actions__supplier-name">
						{{ supplier }}
					</p>
				</div>
				<p class="product-actions__text product-actions__text--blue">
					Без учета транспортировки
				</p>
				<p class="product-actions__pack">
					{{ quant }} {{ quantUnit }} в упаковке
				</p>
			</div>
			<div v-if="isInCart" class="product-actions__counter">
				<CounterVue
					:model-value="quantity"
					:step="quant"
					@update:model-value="changeProductQuantity"
				>
					<span>{{ quantUnit }}</span>
				</CounterVue>
				<p class="product-actions__cost">
					{{ formattedCost }}
					<i class="ruble">₽</i>
				</p>
				<div class="product-actions__counter-close" @click="deleteFromCart">
					<CounterClose />
				</div>
			</div>
			<div class="product-actions__cart">
				<TooltipVue>
					<template #trigger>
						<NuxtLink
							class="product-actions__text product-actions__text--blue"
							to="#discounts"
							@click="scrollToDiscounts"
						>
							Как купить дешевле?
						</NuxtLink>
					</template>
					<template #content>
						<span class="product-actions__cart-tooltip">
							Покупать дешевле можно участвую коллективных закупка или покупать больше единиц товара.
						</span>
					</template>
				</TooltipVue>
				<NuxtLink
					v-if="isInCart"
					to="/cart"
					class="product-actions__btn button button--light-blue"
				>
					Перейти в корзину
				</NuxtLink>
				<button
					v-else
					class="product-actions__btn button button--light-blue"
					@click="addToCart(quant)"
				>
					В корзину {{ quant }} {{ quantUnit }}
				</button>
			</div>
		</div>
		<transition name="fade">
			<LoaderVue v-if="loading" />
		</transition>
	</div>
</template>

<script setup>
import ProgressbarVue from '~/components/Progressbar.vue';
import CounterVue from '~/components/Counter.vue';
import TooltipVue from '~/components/Tooltip.vue';
import LoaderVue from '~/components/Loader.vue';

import CounterClose from '~/assets/svg/counter-close.svg?skipsvgo';

import { NUMBER_FORMATTER } from '~/helpers/formatters.js';

import { useCartStore } from '~/store';

const emit = defineEmits('add-to-cart', 'delete-from-cart');
const props = defineProps({
	id:
	{
		type: Number,
		default: null,
	},
	price:
	{
		type: Number,
		default: 0,
	},
	quantity:
	{
		type: Number,
		default: 0,
	},
	quant:
	{
		type: Number,
		default: 1,
	},
	quantUnit:
	{
		type: String,
		default: '',
	},
	supplier:
	{
		type: String,
		default: '',
	},
	isInCart:
	{
		type: Boolean,
		default: false,
	},
	cartPriceAmount:
	{
		type: Number,
		default: 0,
	},
	loading:
	{
		type: Boolean,
		default: false,
	},
});

const cartStore = useCartStore();

const formattedPrice = computed(() => NUMBER_FORMATTER(props.price));
const formattedCost = computed(() => NUMBER_FORMATTER(props.cartPriceAmount));

const scrollToDiscounts = () => useScrollTo('#discounts');
const addToCart = count => emit('add-to-cart', count);
const changeProductQuantity = count => emit('change-product-quantity', count);
const deleteFromCart = () => emit('delete-from-cart');

const order = computed(() => cartStore.getOrderByProductId(props.id));
</script>

<style lang="scss">
	.product-actions
	{
		position: relative;
		border-radius: 10px;
		background: $lgray;
		padding: 20px 16px;
		margin-bottom: 20px;

		p
		{
			margin: 0;
		}

		.loader
		{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #2C2C2C60;
			border-radius: 10px;
		}
	}

	.product-actions__btn
	{
		font-size: 14px;
		line-height: 19px;
		width: 100%;
		font-weight: 600;

		&:first-child
		{
			margin-bottom: 20px;
		}
	}

	.product-actions__total
	{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.product-actions__total-title
	{
		font-size: 16px;
		line-height: 18px;
	}

	.product-actions__summary
	{
		display: flex;
		align-items: flex-end;
		gap: 6px;
		margin-right: 3px;
	}

	.product-actions__summary-label
	{
		color: $gray;
		font-size: 13px;
		line-height: 14px;
	}

	.product-actions__cost
	{
		display: flex;
		align-items: flex-end;
		font-size: 18px;
		line-height: 18px;
		font-weight: 600;

		.ruble
		{
			font-size: 12px;
			line-height: 12px;
			margin-left: 2px;
		}
	}

	.product-actions__order
	{
		margin-bottom: 20px;
	}

	.product-actions__progressbar
	{
		display: flex;
		align-items: center;
		gap: 8px;

		.progressbar
		{
			width: 100%;
			background-color: $white;
		}
	}

	.product-actions__progressbar-value
	{
		color: $gray;
		font-size: 16px;
		line-height: 18px;
	}

	.product-actions__text
	{
		color: $gray;
		font-size: 11px;
		line-height: 15px;

		&--orange
		{
			color: $red;
		}

		&--blue
		{
			color: $blue;
		}
	}

	.product-actions__info
	{
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 16px;
	}

	.product-actions__name
	{
		font-size: 14px;
		line-height: 19px;
	}

	.product-actions__price
	{
		font-size: 16px;
		line-height: 22px;
		font-weight: 600;

		span
		{
			font-size: 11px;
			line-height: 15px;
		}
	}

	.product-actions__supplier
	{
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.product-actions__supplier-name
	{
		font-size: 13px;
		line-height: 18px;
		color: $orange;
	}

	.product-actions__pack
	{
		color: $gray;
		font-size: 13px;
		line-height: 18px;
	}

	.product-actions__counter
	{
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 20px;
	}

	.product-actions__counter-close
	{
		cursor: pointer;
		@include transition();

		&:hover
		{
			path { stroke: $blue; }
		}
	}

	.product-actions__cart
	{
		.product-actions__text
		{
			margin-bottom: 6px;
			font-size: 12px;
		}
	}

	.product-actions__cart-tooltip
	{
		display: inline-block;
		max-width: 210px;
	}

	@include mq($tablet)
	{
		.product-actions
		{
			padding: 26px 20px;
		}

		.product-actions__btn
		{
			height: 46px;
		}

		.product-actions__summary-label
		{
			font-size: 14px;
		}

		.product-actions__text
		{
			font-size: 12px;
			line-height: 16px;
		}

		.product-actions__name
		{
			font-size: 15px;
			line-height: 20px;
		}

		.product-actions__supplier-name,
		.product-actions__pack
		{
			font-size: 14px;
			line-height: 19px;
		}
	}

</style>
