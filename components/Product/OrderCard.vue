<template>
	<div class="product-order-card">
		<div class="product-order-card__info">
			<a class="product-order-card__info-link" href="#">
				<img class="product-order-card__info-img" src="/img/collective-card-1.png">
			</a>
			<div class="product-order-card__info-desc">
				<p class="product-order-card__desc-text">
					Торт медовик - Смешанные растопленный маргарин и мёд, добавляют яйцо, растирают с сахаром, добавляют...
				</p>
				<p class="product-order-card__desc-quantity">
					12 шт
				</p>
				<p class="product-order-card__desc-price">
					35 <span><i class="ruble">₽</i>/шт</span>
				</p>
			</div>
		</div>
		<div class="product-order-card__info-price">
			<p class="product-order-card__info-price-text">
				Итого:
			</p>
			<p class="product-order-card__info-price-value">
				213324350
			</p>
			<i class="ruble">₽</i>
		</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss">
.product-order-card
{
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	cursor: pointer;
	&:last-child
	{
		margin-bottom: 0;
	}
}

.product-order-card__info
{
	display: flex;
	align-items: center;
}

.product-order-card__info-link
{
	width: 100%;
	max-width: 50px;
	flex-shrink: 0;
	margin-right: 10px;
	img
	{
		margin: 0;
		display: block;
	}
}

.product-order-card__desc-text
{
	color: #2C2C2C;
	font-size: 10px;
	font-weight: 400;
	line-height: 12px;
	margin-bottom: 0;
	&:hover
	{
		color: #3772FE;
	}
}

.product-order-card__desc-quantity
{
	color: #2C2C2C;
	font-size: 12px;
	font-weight: 400;
	line-height: 12px;
	margin-bottom: 0;
}

.product-order-card__desc-price
{
	color: #2C2C2C;
	font-size: 14px;
	font-weight: 600;
	line-height: 12px;
	margin-bottom: 0;
	span
	{
		font-size: 10px;
	}
}

.product-order-card__info-price
{
	display: flex;
	align-items: baseline;
	white-space: nowrap;
	column-gap: 5px;
	.ruble
	{
		color: #2C2C2C;
		font-size: 12px;
		font-weight: 600;
		line-height: normal;
		margin-bottom: 0;
	}
}

.product-order-card__info-price-text
{
	color: #2C2C2C;
	font-size: 11px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 0;
}

.product-order-card__info-price-value
{
	color: #2C2C2C;
	font-size: 14px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.product-order-card__desc-text
{
	margin-bottom: 3px;
}

.product-order-card__desc-quantity
{
	margin-bottom: 3px;
}

.product-order-card__info
{
	margin-bottom: 20px;
}

@include mq($tablet)
{
	.product-order-card__info-link
	{
		max-width: 56px;
	}

	.product-order-card
	{
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		column-gap: 45px;
	}

	.product-order-card__info-price
	{
		.ruble
		{
			font-size: 13px;
		}
	}

	.product-order-card__desc-text
	{
		font-size: 10px;
	}

	.product-order-card__info-price-text
	{
		font-size: 12px;
	}

	.product-order-card__info-price-value
	{
		font-size: 16px;
	}

	.product-order-card__info
	{
		margin-bottom: 0;
	}
}

@include mq($wd)
{
	.product-order-card__info-link
	{
		max-width: 60px;
	}

	.product-order-card
	{
		column-gap: 150px;
	}

	.product-order-card__desc-text
	{
		font-size: 11px;
		line-height: 14px;
	}

	.product-order-card__desc-quantity
	{
		font-size: 14px;
		line-height: 18px;
	}

	.product-order-card__desc-price
	{
		font-size: 16px;
		line-height: 18px;
		span
		{
			font-size: 12px;
			line-height: 18px;
		}
	}

	.product-order-card__info-price-text
	{
		font-size: 14px;
	}

	.product-order-card__info-price-value
	{
		font-size: 16px;
	}

	.product-order-card__info-price
	{

		.ruble
		{
			font-size: 15px;
		}
	}
}
</style>
