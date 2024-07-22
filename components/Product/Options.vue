<template>
	<div class="product-options">
		<div class="product-options__item">
			<p class="product-options__item-title">
				Вес товара, г.:
			</p>
			<div class="product-options__item-btns">
				<button class="product-options__item-btn button">
					100
				</button>
				<button class="product-options__item-btn button active">
					200
				</button>
				<button class="product-options__item-btn button">
					300
				</button>
				<button class="product-options__item-btn button">
					500
				</button>
				<button class="product-options__item-btn button">
					1000
				</button>
				<button class="product-options__item-btn button">
					2000
				</button>
			</div>
		</div>
		<div class="product-options__item">
			<p class="product-options__item-title">
				Начинка
			</p>
			<div class="product-options__item-btns">
				<button class="product-options__item-btn button">
					Клубника
				</button>
				<button class="product-options__item-btn button active">
					Шоколад
				</button>
				<button class="product-options__item-btn button">
					Орех
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="scss">
	.product-options
	{
		margin-bottom: 20px;
	}

	.product-options__item
	{
		&:first-child
		{
			margin-bottom: 14px;
		}
	}

	.product-options__item-title
	{
		color: #868799;
		font-size: 12px;
		line-height: 16px;
		margin-bottom: 6px;
	}

	.product-options__item-btns
	{
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.product-options__item-btn
	{
		border: none;
		border-radius: 7px;
		background: #FFF;
		box-shadow: 0px 0px 14px 0px rgba(93, 95, 107, 0.10);
		padding: 7px 20px;
		font-size: 12px;
		line-height: 16px;
		@include transition();

		&:hover
		{
			color: $blue;
		}

		&.active
		{
			background: #3772FE;
			box-shadow: none;
			color: #fff;
		}
	}

	@include mq($tablet)
	{
		.product-options__item-btns
		{
			gap: 10px;
		}
	}

	@include mq($wd)
	{
		.product-options
		{
			max-width: 100%;
		}

		.product-options__item
		{
			&:first-child
			{
				margin-bottom: 20px;

				.product-options__item-btns
				{
					overflow: visible;
					padding-bottom: 0;
				}
			}
		}

		.product-options__item-btn
		{
			font-size: 14px;
			line-height: 19px;
		}
	}
</style>
