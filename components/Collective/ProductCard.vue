<template>
	<div class="collective-product-card">
		<a href="#" class="collective-product-card__picture">
			<img src="/img/collective-card-1.png">
		</a>
		<div class="collective-product-card__descr">
			<NuxtLink to="#" class="collective-product-card__title">
				Томатная паста, 0.25кг
			</NuxtLink>
			<p class="collective-product-card__name">
				Baisad
			</p>
		</div>
		<p class="collective-product-card__city">
			г. Москва
		</p>
		<div class="collective-product-card__price">
			<span>250</span>
			<i class="ruble">₽</i>
		</div>
		<div class="collective-product-card__amount">
			<div v-if="!isInCart" class="collective-product-card__add">
				<button class="collective-product-card__btn button button--blue">
					В корзину 12шт
				</button>
			</div>
			<div v-if="isInCart" class="collective-product-card__wrapper">
				<div class="collective-product-card__counter">
					<CounterVue :model-value="124">
						<span>шт</span>
					</CounterVue>
				</div>
				<div class="collective-product-card__cost">
					<span>250 000</span>
					<i class="ruble">₽</i>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import CounterVue from '~/components/Counter.vue';

const props = defineProps({
	isInCart:
	{
		type: Boolean,
		default: false
	}
});
</script>

<style lang="scss">
	.collective-product-card
	{
		display: grid;
		grid-template-areas:
		'picture   descr     descr     descr'
		'city      city      city      city'
		'price     price     amount    amount';
		padding: 12px 14px 16px 14px;
		grid-template-columns: 37px 24px 2fr 1fr;
		position: relative;
		z-index: 2;
		row-gap: 10px;
		background-color: #fff;

		p { margin: 0; }
	}

	.collective-product-card__picture
	{
		grid-area: picture;
		width: 31px;
		height: 30px;

		img
		{
			width: 100%;
			height: 100%;
		}
	}

	.collective-product-card__descr
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		grid-area: descr;
	}

	.collective-product-card__title
	{
		font-size: 12px;
		line-height: 12px;
		font-weight: 600;
		margin-bottom: 1px;
		@include transition();

		&:hover
		{
			color: $blue;
		}
	}

	.collective-product-card__name
	{
		color: #868799;
		font-size: 10px;
		line-height: 10px;
	}

	.collective-product-card__city
	{
		grid-area: city;
		font-size: 12px;
		line-height: 16px;
		align-self: flex-start;
	}

	.collective-product-card__price,
	.collective-product-card__cost
	{
		align-self: center;
		font-size: 13px;
		line-height: 18px;
		font-weight: 600;

		.ruble
		{
			font-size: 10px;
			line-height: 14px;
			margin-left: 2px;
		}
	}

	.collective-product-card__price
	{
		grid-area: price;
	}

	.collective-product-card__amount
	{
		grid-area: amount;
	}

	.collective-product-card__add
	{
		display: flex;
		justify-content: flex-end;
	}

	.collective-product-card__btn
	{
		width: 133px;
		height: 36px;
		font-size: 13px;
		line-height: 18px;
	}

	.collective-product-card__wrapper
	{
		display: flex;
		justify-content: space-between;
	}

	.collective-product-card__cost
	{
		text-align: right;
	}

	.collective-product-card__counter
	{
		margin-left: auto;
		margin-right: auto;
		.counter
		{
			gap: 10px;
		}

		.counter__action
		{
			background: $lgray;
			padding: 10px;

			svg
			{
				width: 10px;
				height: 10px;
			}
		}

		.counter__amount
		{
			font-size: 13px;
			line-height: 18px;

			span
			{
				font-size: 10px;
				line-height: 14px;
			}
		}
	}

	@include mq($tablet)
	{
		.collective-product-card
		{
			display: flex;
			align-items: center;
			flex-direction: row;
			padding: 12px 14px;
		}

		.collective-product-card__picture
		{
			flex-basis: 5.2%;

			img
			{
				width: fit-content;
			}
		}

		.collective-product-card__descr
		{
			flex-basis: 28%;
		}

		.collective-product-card__title
		{
			font-size: 12px;
			margin-bottom: 0;
		}

		.collective-product-card__name
		{
			font-size: 11px;
		}
		.collective-product-card__city
		{
			flex-basis: 16%;
			align-self: auto;
		}

		.collective-product-card__price,
		.collective-product-card__cost
		{
			font-size: 14px;
			line-height: 19px;
			font-weight: 400;
		}

		.collective-product-card__price
		{
			flex-basis: 12%;
		}

		.collective-product-card__amount
		{
			flex-basis: 31%;
		}

		.collective-product-card__add
		{
			justify-content: flex-start;
		}

		.collective-product-card__counter
		{
			margin-left: 7px;
			margin-right: unset;

			.counter__amount
			{
				font-size: 14px;
				line-height: 19px;
			}
		}
	}

	@include mq($wd)
	{
		.collective-product-card { padding: 15px 50px 16px; }

		.collective-product-card__picture
		{
			flex-basis: 8.2%;
			width: 60px;
			height: 59px;
		}

		.collective-product-card__img { flex-basis: 68%; }

		.collective-product-card__descr
		{
			flex-basis: 26%;
		}

		.collective-product-card__city
		{
			flex-basis: 20%;
		}

		.collective-product-card__price
		{
			flex-basis: 13.8%;
		}

		.collective-product-card__amount
		{
			flex-basis: 29%;
		}

		.collective-product-card__price,
		.collective-product-card__cost
		{
			font-weight: 600;

			.ruble
			{
				font-size: 12px;
				line-height: 16px;
			}
		}

		.collective-product-card__title,
		.collective-product-card__name,
		.collective-product-card__city,
		.collective-product-card__price,
		.collective-product-card__counter,
		.collective-product-card__cost
		{
			font-size: 16px;
			line-height: 22px;
		}

		.collective-product-card__title
		{
			line-height: 16px;
		}

		.collective-product-card__counter
		{
			margin-left: 0;

			.counter
			{
				gap: 16px;
			}

			.counter__action
			{
				padding: 11px;

				svg
				{
					width: 14px;
					height: 14px;
				}
			}

			.counter__amount
			{
				font-size: 16px;
				line-height: 22px;

				span
				{
					font-size: 12px;
					line-height: 16px;
				}
			}
		}
	}

	.collective-product-card__btn
	{
		margin-left: 10px;
	}
</style>
