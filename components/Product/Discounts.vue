<template>
	<div id="discounts" class="product-discounts">
		<div class="product-discounts__heading">
			<h2 class="product-discounts__title">
				Скидки за количество
			</h2>
			<p class="product-discounts__subtitle">
				Цена указаны без учета транспортировки
			</p>
		</div>
		<div class="product-discounts__content">
			<div class="product-discounts__info">
				<div class="product-discounts__info-current">
					<p class="product-discounts__info-price">
						<span class="product-discounts__value">{{ currentPrice }}</span>
						<span class="product-discounts__currency">
							<i class="ruble">₽</i>/{{ quantUnit }}
						</span>
					</p>
					<p class="product-discounts__info-text">
						Ваша цена сейчас
					</p>
				</div>
				<p class="product-discounts__info-text">
					Здесь представлены цены с учетом скидок за количество. Чем больше товара, тем дешевле можно его приобрести у поставщика.
				</p>
			</div>
			<div class="product-discounts__table-wr">
				<div class="product-discounts__gradient" />
				<table class="product-discounts__table">
					<tr class="product-discounts__table-row product-discounts__table-row--head">
						<th class="product-discounts__table-cell">
							Количество
						</th>
						<th class="product-discounts__table-cell">
							Цена за ед.
						</th>
						<th class="product-discounts__table-cell">
							Стоимость
						</th>
						<th class="product-discounts__table-cell">
							Скидка
						</th>
					</tr>

					<tr
						v-for="item, i in items"
						:key="i"
						:class="{'product-discounts__table-row--orange': higlidtedPriceIndex === i}"
						class="product-discounts__table-row"
					>
						<td class="product-discounts__table-cell">
							{{ item.quantity }} {{ quantUnit }}
						</td>
						<td class="product-discounts__table-cell">
							{{ item.price }}
							<i class="ruble">₽</i>
						</td>
						<td class="product-discounts__table-cell">
							{{ item.cost }}
							<i class="ruble">₽</i>
						</td>
						<td class="product-discounts__table-cell">
							{{ item.discountPercent }} <i>%</i>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { NUMBER_FORMATTER } from '~/helpers/formatters.js';

const props = defineProps({
	prices:
	{
		type: Array,
		default: () => ([]),
	},
	quantUnit:
	{
		type: String,
		default: ''
	},
	basePrice:
	{
		type: Number,
		default: 0,
	},
	cartAddedQuantity:
	{
		type: Number,
		default: 0,
	}
});

const items = props.prices.map((el) =>
{
	return {
		price: NUMBER_FORMATTER(el.price),
		quantity: NUMBER_FORMATTER(el.quantity),
		cost: NUMBER_FORMATTER(el.price * el.quantity),
		discountPercent: (100 - (el.price * 100 / props.basePrice)).toFixed(),
	};
});

const higlidtedPriceIndex = computed(() =>
{
	const quantities = props.prices.map(el => el.quantity);

	for (let i = quantities.length; i >= -1; i--)
		if (quantities[i] <= props.cartAddedQuantity)
			return i;

	return -1;
});

const currentPrice = computed(() =>
{
	return props.prices[higlidtedPriceIndex.value]?.price || props.basePrice;
});
</script>

<style lang="scss">
	.product-discounts
	{
		margin-bottom: 40px;
	}

	.product-discounts__heading
	{
		margin-bottom: 26px;
	}

	.product-discounts__title
	{
		font-size: 19px;
		line-height: 30px;
		font-family: 'Ubuntu';
		font-weight: 500;
		color: #000;
		margin: 0;
		margin-bottom: 6px;
	}

	.product-discounts__subtitle
	{
		color: #868799;
		font-size: 13px;
		line-height: 18px;
		margin: 0;
	}

	.product-discounts__content
	{
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.product-discounts__gradient
	{
		display: none;
		width: 174px;
		height: 41px;
		position: absolute;
		top: 0;
		left: -98px;
		background: linear-gradient(90deg, #FFF 28.13%, #E3EEF2 100%);
		pointer-events: none;
	}

	.product-discounts__info
	{
		border-radius: 10px;
		box-shadow: 0px 0px 14px 0px rgba(93, 95, 107, 0.10);
		padding: 20px 28px 26px 20px;
	}

	.product-discounts__info-current
	{
		margin-bottom: 16px;
	}

	.product-discounts__info-price
	{
		color: #F69421;
		font-weight: 600;
		margin: 0;
		margin-bottom: 2px;
	}

	.product-discounts__value
	{
		font-size: 22px;
		line-height: 20px;
		margin-right: 4px;
	}

	.product-discounts__currency
	{
		font-size: 14px;
		line-height: 20px;
	}

	.product-discounts__info-text
	{
		font-size: 10px;
		line-height: 12px;
		color: #868799;
		margin: 0;
	}

	.product-discounts__table-wr
	{
		border-radius: 12px;
		overflow: hidden;
	}

	.product-discounts__table
	{
		width: 100%;
	}

	.product-discounts__table-row
	{
		background: #F4F5F7;

		&--head
		{
			background: #E3EEF2;

			.product-discounts__table-cell
			{
				color: #868799;
				padding: 12px 0 13px;
				font-size: 10px;
				line-height: 15px;
				font-weight: 400;
				letter-spacing: -0.1px;
				text-align: left;
				white-space: nowrap;
			}
		}

		&--orange
		{
			.product-discounts__table-cell
			{
				color: #F69421;
				font-weight: 600;
			}
		}

		&:nth-child(2)
		{
			.product-discounts__table-cell
			{
				padding-top: 18px;
			}
		}

		&:last-child
		{
			.product-discounts__table-cell
			{
				padding-top: 8px;
				padding-bottom: 26px;
			}
		}
	}

	.product-discounts__table-cell
	{
		color: #2C2C2C;
		font-size: 12px;
		line-height: 14px;
		padding-top: 8px;
		box-sizing: content-box;
		width: 25%;
		white-space: nowrap;

		i
		{
			font-size: 10px;
			font-style: normal;
		}

		&:nth-child(1)
		{
			width: 57px;
			padding-left: 20px;
		}

		&:nth-child(2)
		{
			width: 52px;
			padding-left: 16px;
		}

		&:nth-child(3)
		{
			padding-left: 16px;
		}

		&:nth-child(4)
		{
			padding-left: 16px;
		}
	}

	@include mq($tablet)
	{
		.product-discounts
		{
			margin-bottom: 50px;
		}

		.product-discounts__heading
		{
			margin-bottom: 20px;
		}

		.product-discounts__title
		{
			font-size: 26px;
			line-height: 38px;
			margin-bottom: 6px;
		}

		.product-discounts__subtitle
		{
			font-size: 14px;
			line-height: 19px;
		}

		.product-discounts__content
		{
			flex-direction: row;
			box-shadow: 0px 0px 14px 0px rgba(93, 95, 107, 0.10);
			border-radius: 10px;
			overflow: hidden;
			position: relative;
			width: fit-content;
		}

		.product-discounts__gradient
		{
			display: block;
		}

		.product-discounts__info
		{
			border-radius: 10px;
			box-shadow: none;
			max-width: 285px;
			padding: 34px 0 26px 30px;
		}

		.product-discounts__table-wr
		{
			border-radius: 0;
			position: relative;
			overflow: visible;
		}

		.product-discounts__table-cell
		{
			&:nth-child(1)
			{
				padding-left: 77px;
			}

			&:nth-child(2)
			{
				padding-left: 41px;
			}

			&:nth-child(3)
			{
				padding-left: 41px;
			}

			&:nth-child(4)
			{
				padding-right: 30px;
				padding-left: 41px;
			}
		}

		.product-discounts__table-row
		{
			background: #fff;

			&--head
			{
				background: #E3EEF2;
				.product-discounts__table-cell
				{
					font-size: 11px;
					line-height: 16px;
				}
			}

			&:last-child
			{
				.product-discounts__table-cell
				{
					padding-bottom: 20px;
				}
			}
		}
	}

	@include mq($wd)
	{
		.product-discounts
		{
			margin-bottom: 60px;
			width: 100%;
		}

		.product-discounts__content
		{
			border-radius: 14px;
		}

		.product-discounts__heading
		{
			margin-bottom: 30px;
		}

		.product-discounts__title
		{
			font-size: 30px;
			line-height: 38px;
			margin-bottom: 8px;
		}

		.product-discounts__subtitle
		{
			font-size: 16px;
			line-height: 22px;
		}

		.product-discounts__value
		{
			font-size: 24px;
		}

		.product-discounts__currency
		{
			font-size: 16px;
		}

		.product-discounts__info
		{
			max-width: 308px;
			padding-top: 37px;
		}

		.product-discounts__gradient
		{
			height: 50px;
		}

		.product-discounts__table-row
		{
			&--head
			{
				.product-discounts__table-cell
				{
					padding-top: 15px;
					padding-bottom: 17px;
					font-size: 12px;
					line-height: 18px;
				}
			}

			&:last-child
			{
				.product-discounts__table-cell
				{
					padding-bottom: 26px;
				}
			}
		}

		.product-discounts__table-cell
		{
			font-size: 14px;
			line-height: 14px;

			i { font-size: 11px; }

			&:nth-child(1)
			{
				padding-left: 160px;
			}

			&:nth-child(2)
			{
				padding-left: 60px;
			}

			&:nth-child(3)
			{
				padding-left: 57px;
			}

			&:last-child
			{
				padding-right: 50px;
				padding-left: 60px;
			}
		}
	}
</style>
