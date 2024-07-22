<template>
	<div class="cart-item">
		<div class="cart-item__info">
			<UiCheckbox :model-value="active" @update:model-value="_changeActivity" />
			<div class="cart-item__preview">
				<NuxtLink :to="link" class="cart-item__preview-picture">
					<img :src="picture">
				</NuxtLink>
				<div class="cart-item__preview-descr">
					<NuxtLink :to="link" class="cart-item__descr-text">
						{{ title }}
					</NuxtLink>
					<p class="cart-item__descr-title">
						{{ brand }}
					</p>
				</div>
			</div>
		</div>
		<div class="cart-item__actions">
			<div class="cart-item__value">
				<p class="cart-item__value-price">
					{{ NUMBER_FORMATTER(price) }}<i class="ruble">₽</i>
				</p>
				<CounterVue
					:model-value="counter"
					:step="quant"
					@update:model-value="_changeQuantity"
				>
					<span>{{ quantUnit }}</span>
				</CounterVue>
				<p class="cart-item__value-price">
					{{ NUMBER_FORMATTER(price * quantity) }}<i class="ruble">₽</i>
				</p>
			</div>
			<button class="cart-item__btn-delete">
				<BtnDeleteSvg @click="_deleteFromCart" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { NUMBER_FORMATTER } from '~/helpers/formatters.js';

import UiCheckbox from '~/components/UI/Checkbox.vue';
import CounterVue from '~/components/Counter.vue';
import BtnDeleteSvg from '~/assets/svg/btn-delete.svg?skipsvgo';

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
	title:
	{
		type: String,
		default: '',
	},
	picture:
	{
		type: String,
		default: '',
	},
	price:
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
	quantity:
	{
		type: Number,
		default: 1,
	},
	link:
	{
		type: String,
		default: '#',
	},
	brand:
	{
		type: String,
		default: '',
	},
	supplierSlug:
	{
		type: String,
		default: '',
	},
});

const {
	counter,
	_changeQuantity,
	_deleteFromCart,
	_changeActivity,
	_checkProductQuantityInBasket,
} = useProduct(props.id, props.supplierSlug);

_checkProductQuantityInBasket();
</script>

<style lang="scss">
.cart-item
{
	padding: 16px 16px 20px;
}

.cart-item__info
{
	display: flex;
	margin-bottom: 22px;
	column-gap: 10px;
	.ui-checkbox__box
	{
		margin-right: 0;
	}
}

.cart-item__preview
{
	display: flex;
	align-items: center;
	column-gap: 10px;
}

.cart-item__preview-picture
{
	width: 40px;
	height: 40px;
	flex-shrink: 0;
	border-radius: 6px;
	background-color: $lgray;
	overflow: hidden;

	img
	{
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}

.cart-item__descr-text
{
	font-size: 14px;
	font-weight: 600;
	line-height: 16px;
	letter-spacing: 0em;
	margin-bottom: 4px;
	@include transition();

	&:active { color: $blue; }
	@include hover() { color: $blue; }
}

.cart-item__descr-title
{
	font-size: 13px;
	font-weight: 400;
	line-height: 14px;
	letter-spacing: 0em;
	margin-bottom: 0;
	color: #868799;
}

.cart-item__actions
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 26px;
	flex-shrink: 0;
}

.cart-item__value
{
	display: flex;
	align-items: center;
	column-gap: 6px;
	.counter__amount
	{
		font-size: 14px;
	}

	.counter__action
	{
		padding: 7px;
		max-height: 28px;
	}

	.counter
	{
		gap: 6px;
	}
}

.cart-item__value-price
{
	color: #2C2C2C;
	font-size: 14px;
	font-weight: 600;
	line-height: 100%;
	margin-bottom: 0;
}

.cart-item__img
{
	display: flex;
	align-items: center;
}

.cart-item__btn-delete
{
	border: none;
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

@include mq(600px)
{
	.cart-item
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cart-item__info
	{
		align-items: center;
		column-gap: 20px;
		margin-bottom: 0;
	}
}

@include mq($tablet)
{
	.cart-item
	{
		padding: 10px 20px;
		column-gap: 20px;
	}

	.cart-item__preview
	{
		column-gap: 20px;
	}

	.cart-item__info
	{
		width: 45%;
	}

	.cart-item__preview-picture
	{
		width: 50px;
		height: 50px;
	}

	.cart-item__descr-text
	{
		font-size: 16px;
	}

	.cart-item__descr-title
	{
		font-size: 16px;
	}

	.cart-item__actions
	{
		padding-left: 0;
		min-width: 306px;
	}

	.cart-item__value
	{
		column-gap: 10px;
		margin-right: auto;
		.counter__amount
		{
			font-size: 16px;
		}

		.counter__action
		{
			padding: 11px;
			max-height: 36px;
		}

		.counter
		{
			gap: 10px;
		}
	}

	.cart-item__value-price
	{
		font-size: 16px;
		min-width: 58px;
	}
}

@include mq($desktop)
{
	.cart-item__actions
	{
		min-width: 363px;
	}
}
@include mq($wd)
{
	.cart-item__value
	{
		column-gap: 16px;
		.counter
		{
			gap: 16px;
		}
	}

	.cart-item__preview-picture
	{
		width: 60px;
		height: 60px;
	}

	.cart-item__actions
	{
		min-width: 390px;
	}
}
</style>
