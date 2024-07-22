<template>
	<div class="collective-large-card">
		<div class="collective-large-card__info">
			<div class="collective-large-card__info-btns">
				<NuxtLink to="#" class="collective-large-card__info-btn button button--box-shadow">
					Перейти к товару
				</NuxtLink>
				<NuxtLink to="#" class="collective-large-card__info-btn button button--box-shadow">
					Перейти к закупке
				</NuxtLink>
			</div>
			<a href="#" class="collective-large-card__picture">
				<img src="/img/collective-card-1.png">
			</a>
			<div class="collective-large-card__descr">
				<NuxtLink to="#" class="collective-large-card__title">
					Томатная паста, 0.25кг
				</NuxtLink>
				<p class="collective-large-card__name">
					Baisad
				</p>
			</div>
			<p class="collective-large-card__city">
				г. Москва
			</p>
			<div class="collective-large-card__progress">
				<div class="collective-large-card__status">
					Закрыта
				</div>
				<div class="collective-large-card__progressbar">
					<ProgressbarVue />
					<p class="collective-large-card__progressbar-value">
						60%
					</p>
				</div>
			</div>
			<div class="collective-large-card__price">
				<span>250</span>
				<span class="collective-large-card__price-rub">
					<i class="ruble">₽</i>/шт
				</span>
			</div>
			<div class="collective-large-card__supply acceptance">
				<p class="collective-large-card__supply-title">
					Прием заявок
				</p>
				<p class="collective-large-card__supply-data">
					09.12.2023
				</p>
			</div>
			<div class="collective-large-card__supply expected">
				<p class="collective-large-card__supply-title">
					Ожидаемая поставка
				</p>
				<p class="collective-large-card__supply-data">
					09.12.2023
				</p>
			</div>
		</div>
		<div class="collective-large-card__discount-wr">
			<div class="collective-large-card__discount">
				<div class="collective-large-card__discount-item">
					<p class="collective-large-card__discount-amount">
						1уп./8шт.
					</p>
					<div class="collective-large-card__discount-price">
						35
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-large-card__discount-item">
					<p class="collective-large-card__discount-amount">
						10уп./80шт.
					</p>
					<div class="collective-large-card__discount-price">
						25
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-large-card__discount-item">
					<p class="collective-large-card__discount-amount">
						100уп./800шт.
					</p>
					<div class="collective-large-card__discount-price">
						20
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-large-card__discount-item">
					<p class="collective-large-card__discount-amount">
						1000уп./8000шт.
					</p>
					<div class="collective-large-card__discount-price">
						15
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-large-card__discount-item">
					<p class="collective-large-card__discount-amount">
						2000уп./16000шт.
					</p>
					<div class="collective-large-card__discount-price">
						13
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import ProgressbarVue from '@/components/Progressbar.vue';
</script>

<style lang="scss">
	/*card info*/
	.collective-large-card { background: #F4F5F7; }

	.collective-large-card__info
	{
		display: grid;
		grid-template-areas:
		'picture    descr      city'
		'progress   progress   price'
		'acceptance acceptance expected-delivery';
		padding: 12px 9px 10px;
		grid-template-columns: 37px 1fr 40%;
		position: relative;
		z-index: 2;
		row-gap: 10px;
		background-color: #fff;

		p { margin: 0; }
	}

	.collective-large-card__info-btns { display: none; }

	.collective-large-card__item
	{
		display: flex;
		justify-content: space-between;
		align-items: center;

		&:nth-of-type(2) { margin-bottom: 9px; }

		&:nth-of-type(3) { margin-bottom: 14px; }
	}

	.collective-large-card__picture
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

	.collective-large-card__descr
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		grid-area: descr;
	}

	.collective-large-card__title
	{
		font-size: 11px;
		line-height: 12px;
		font-weight: 600;
		margin-bottom: 1px;
	}

	.collective-large-card__name
	{
		color: #868799;
		font-size: 10px;
		line-height: 10px;
	}

	.collective-large-card__city
	{
		grid-area: city;
		font-size: 11px;
		line-height: 15px;
		align-self: center;
		text-align: right;
	}

	.collective-large-card__progress
	{
		order: 1;
		grid-area: progress;
		margin-bottom: 5px;
	}

	.collective-large-card__status
	{
		font-size: 13px;
		line-height: 18px;
	}

	.collective-large-card__progressbar
	{
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.collective-large-card__progressbar-value
	{
		color: #868799;
		font-size: 14px;
		line-height: 19px;
	}

	.collective-large-card__price
	{
		grid-area: price;
		align-self: center;
		text-align: right;
		font-size: 18px;
		line-height: 24px;
		font-weight: 600;
	}

	.collective-large-card__price-rub
	{
		font-size: 12px;
		line-height: 16px;
		margin-left: 5px;
	}

	.collective-large-card__supply
	{
		&.acceptance { grid-area: acceptance; }
		&.expected
		{
			grid-area: expected-delivery;
			text-align: right;
		}
	}

	.collective-large-card__supply-title
	{
		color: #868799;
		font-size: 10px;
		line-height: 13px;
	}

	.collective-large-card__supply-data
	{
		font-size: 11px;
		line-height: 15px;
	}

	/*card discount*/
	.collective-large-card__discount-wr { display: none; }

	.collective-large-card__discount
	{
		padding: 8px 15px;
		border-radius: 0px 0px 10px 10px;
		background: #F4F5F7;
	}

	.collective-large-card__discount-item
	{
		padding-right: 5px;
		position: relative;

		&:not(:last-child)
		{
			&:after
			{
				content: '';
				position: absolute;
				width: 1px;
				height: 28px;
				background: rgba(132, 133, 152, 0.20);
				top: 2px;
				right: -1px;
			}
		}
	}

	.collective-large-card__discount-amount
	{
		color: #868799;
		font-size: 10px;
		line-height: 14px;
		margin: 0;
	}

	.collective-large-card__discount-price
	{
		font-size: 14px;
		line-height: 16px;
		font-weight: 600;

		span { font-size: 10px; }
	}

	@include mq($mobile)
	{
		.collective-large-card__info
		{
			grid-template-areas:
			'picture    descr    city       price'
			'progress   progress acceptance expected-delivery';
			grid-template-columns: 37px 43.3% 1fr 1fr;
		}

		.collective-large-card__city { align-self: center; }
		.collective-large-card__city { text-align: left; }
		.collective-large-card__descr { padding-right: 10px; }
	}

	@include mq($tablet)
	{
		.collective-large-card
		{
			border-radius: 10px;

			&:hover
			{
				box-shadow: 0px 0px 13px 0px rgba(33, 33, 53, 0.04);

				.collective-large-card__discount-wr { max-height: 200px; }
			}
		}

		.collective-large-card__info
		{
			border-radius: 10px;
			padding: 12px 14px;
			row-gap: 11px;

			.collective-large-card__city
			{
				margin-top: 5px;
			}
		}

		.collective-large-card__title
		{
			font-size: 12px;
			margin-bottom: 0;
		}

		.collective-large-card__name
		{
			font-size: 11px;
			line-height: 10px;
		}

		.collective-large-card__city
		{
			font-size: 12px;
			line-height: 16px;
			align-self: flex-start;
		}

		.collective-large-card__price
		{
			align-self: flex-start;
		}

		.collective-large-card__price-rub
		{
			margin-left: 3px;
		}

		.collective-large-card__progress
		{
			align-items: flex-start;
			margin-bottom: 0;
		}

		.collective-large-card__status
		{
			font-size: 12px;
			line-height: 16px;
		}

		.collective-large-card__discount-wr
		{
			display: block;

			position: relative;
			z-index: 0;
			overflow: hidden;
			max-height: 0;

			@include transition(.5s);
		}

		.collective-large-card__discount
		{
			display: flex;
			gap: 21px;
			flex-wrap: wrap;
		}
	}

	@include mq($wd)
	{
		.collective-large-card
		{
			&:hover
			{
				.collective-large-card__info-btns
				{
					opacity: 1;
				}
			}
		}

		.collective-large-card__info
		{
			display: flex;
			align-items: center;
			flex-direction: row;
			padding: 15px 20px 16px;

			.collective-large-card__city
			{
				margin-top: 0px;
			}

			.collective-large-card__supply-data
			{
				margin-top: 5px;
			}
		}

		.collective-large-card__info-btns
		{
			display: flex;
			gap: 10px;
			position: absolute;
			z-index: 3;
			top: 8px;
			left: 74px;
			background-color: #fff;
			padding: 12px 0 10px 9px;
			opacity: 0;
			min-width: 31%;

			@include transition();
		}

		.collective-large-card__info-btn
		{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			line-height: 22px;
			font-weight: 500;
			letter-spacing: -0.16px;
			height: 40px;
			padding: 0 15px;
			min-width: 48%;
		}

		.collective-large-card__picture
		{
			flex-basis: 6%;
			order: 1;
		}

		.collective-large-card__descr
		{
			flex-basis: 23.3%;
			order: 2;
		}

		.collective-large-card__city
		{
			flex-basis: 14%;
			order: 3;
		}

		.collective-large-card__price
		{
			flex-basis: 10.6%;
			order: 4;
		}

		.collective-large-card__progress
		{
			flex-basis: 19.5%;
			order: 5;
		}

		.collective-large-card__supply.acceptance
		{
			flex-basis: 10.7%;
			order: 6;
		}

		.collective-large-card__supply.expected { order: 7; }

		.collective-large-card__img { flex-basis: 68%; }

		.collective-large-card__picture
		{
			width: 50px;
			height: 49px;

			img
			{
				width: fit-content;
			}
		}

		.collective-large-card__descr { padding-right: 0; }

		.collective-large-card__city
		{
			align-self: center;
			margin-top: 0;
		}

		.collective-large-card__price
		{
			align-self: center;
			text-align: left;
		}

		.collective-large-card__price-rub
		{
			display: none;
		}

		.collective-large-card__supply
		{
			&:last-child
			{
				text-align: left;
			}
		}

		.collective-large-card__supply-title
		{
			display: none;
		}

		.collective-large-card__supply-data
		{
			font-size: 12px;
			line-height: 16px;
		}

		.collective-large-card__title,
		.collective-large-card__name,
		.collective-large-card__city,
		.collective-large-card__price,
		.collective-large-card__status,
		.collective-large-card__supply-data
		{
			font-size: 16px;
			line-height: 22px;
		}

		.collective-large-card__progress
		{
			align-self: auto;

			.progressbar { width: 120px; }
		}

		.collective-large-card__progressbar-value
		{
			font-size: 14px;
			line-height: 19px;
		}

		.collective-large-card__discount
		{
			padding: 18px 50px 10px;
			gap: 26px;
		}

		.collective-large-card__discount-item
		{
			padding-right: 25px;

			&:not(:last-child)
			{
				&:after
				{
					height: 36px;
					top: 0;
				}
			}
		}

		.collective-large-card__discount-amount
		{
			font-size: 12px;
			line-height: 16px;
		}

		.collective-large-card__discount-price
		{
			font-size: 18px;
			line-height: 25px;

			span
			{
				font-size: 12px;
				line-height: 16px;
			}
		}
	}

	@include mq($fullhd)
	{
		.collective-large-card__supply.acceptance
		{
			flex-basis: 11.7%;
		}
	}
</style>
