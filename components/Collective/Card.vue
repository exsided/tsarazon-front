<template>
	<div class="collective-card">
		<div class="collective-card__info">
			<div class="collective-card__info-btns">
				<NuxtLink to="#" class="collective-card__info-btn button button--box-shadow">
					Перейти к товару
				</NuxtLink>
				<NuxtLink to="#" class="collective-card__info-btn button button--box-shadow">
					Перейти к закупке
				</NuxtLink>
			</div>
			<a href="#" class="collective-card__picture">
				<img src="/img/collective-card-1.png">
			</a>
			<div class="collective-card__descr">
				<NuxtLink to="#" class="collective-card__title">
					Томатная паста, 0.25кг
				</NuxtLink>
				<p class="collective-card__name">
					Baisad
				</p>
			</div>
			<p class="collective-card__city">
				г. Москва
			</p>
			<div class="collective-card__progress">
				<div class="collective-card__status">
					Закрыта
				</div>
				<div class="collective-card__progressbar">
					<ProgressbarVue />
					<p class="collective-card__progressbar-value">
						60%
					</p>
				</div>
			</div>
			<div class="collective-card__price">
				<span>240</span>
				<span class="collective-card__price-to"> - 260</span>
				<span class="collective-card__price-rub">
					<i class="ruble">₽</i>/шт
				</span>
			</div>
			<div class="collective-card__supply acceptance">
				<p class="collective-card__supply-title">
					Прием заявок
				</p>
				<p class="collective-card__supply-data">
					09.12.2023
				</p>
			</div>
			<div class="collective-card__supply expected">
				<p class="collective-card__supply-title">
					Ожидаемая поставка
				</p>
				<p class="collective-card__supply-data">
					09.12.2023
				</p>
			</div>
		</div>
		<div class="collective-card__discount-wr">
			<div class="collective-card__discount">
				<div class="collective-card__discount-item">
					<p class="collective-card__discount-amount">
						1уп./8шт.
					</p>
					<div class="collective-card__discount-price">
						35
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-card__discount-item">
					<p class="collective-card__discount-amount">
						10уп./80шт.
					</p>
					<div class="collective-card__discount-price">
						25
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-card__discount-item">
					<p class="collective-card__discount-amount">
						100уп./800шт.
					</p>
					<div class="collective-card__discount-price">
						20
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-card__discount-item">
					<p class="collective-card__discount-amount">
						1000уп./8000шт.
					</p>
					<div class="collective-card__discount-price">
						15
						<span>
							<i class="ruble">₽</i>/шт.
						</span>
					</div>
				</div>
				<div class="collective-card__discount-item">
					<p class="collective-card__discount-amount">
						2000уп./16000шт.
					</p>
					<div class="collective-card__discount-price">
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
	.collective-card { background: #F4F5F7; }

	.collective-card__info
	{
		display: grid;
		grid-template-areas:
		'picture    descr      city'
		'progress   progress   price'
		'acceptance acceptance expected-delivery';
		padding: 12px 9px;
		grid-template-columns: 37px 1fr 40%;
		position: relative;
		z-index: 2;
		row-gap: 9px;
		background-color: #fff;

		p { margin: 0; }
	}

	.collective-card__info-btns { display: none; }

	.collective-card__info-btn
	{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		line-height: 24px;
		font-weight: 500;
		letter-spacing: -0.16px;
		height: 40px;
		min-width: 180px;
	}

	.collective-card__item
	{
		display: flex;
		justify-content: space-between;
		align-items: center;

		&:nth-of-type(2) { margin-bottom: 9px; }

		&:nth-of-type(3) { margin-bottom: 14px; }
	}

	.collective-card__picture
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

	.collective-card__descr
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		grid-area: descr;
	}

	.collective-card__title
	{
		font-size: 11px;
		line-height: 12px;
		font-weight: 600;
		margin-bottom: 1px;
	}

	.collective-card__name
	{
		color: #868799;
		font-size: 10px;
		line-height: 10px;
	}

	.collective-card__city
	{
		grid-area: city;
		font-size: 11px;
		line-height: 15px;
		align-self: flex-start;
		text-align: right;
	}

	.collective-card__progress
	{
		order: 1;
		grid-area: progress;
	}

	.collective-card__status
	{
		font-size: 13px;
		line-height: 18px;
	}

	.collective-card__progressbar
	{
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.collective-card__progressbar-value
	{
		color: #868799;
		font-size: 14px;
		line-height: 19px;
	}

	.collective-card__price
	{
		grid-area: price;
		align-self: center;
		text-align: right;
		font-size: 18px;
		line-height: 24px;
		font-weight: 600;
	}

	.collective-card__price-to { display: none; }

	.collective-card__price-rub
	{
		font-size: 12px;
		line-height: 16px;
		margin-left: 5px;
	}

	.collective-card__supply
	{
		&.acceptance { grid-area: acceptance; }
		&.expected
		{
			grid-area: expected-delivery;
			text-align: right;
		}
	}

	.collective-card__supply-title
	{
		color: #868799;
		font-size: 10px;
		line-height: 13px;
	}

	.collective-card__supply-data
	{
		font-size: 11px;
		line-height: 15px;
	}

	/*card discount*/
	.collective-card__discount-wr { display: none; }

	.collective-card__discount
	{
		padding: 8px 15px;
		border-radius: 0px 0px 10px 10px;
		background: #F4F5F7;
	}

	.collective-card__discount-item
	{
		padding-right: 20px;
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

	.collective-card__discount-amount
	{
		color: #868799;
		font-size: 10px;
		line-height: 14px;
		margin: 0;
	}

	.collective-card__discount-price
	{
		font-size: 14px;
		line-height: 16px;
		font-weight: 600;

		span { font-size: 10px; }
	}

	@include mq($mobile)
	{
		.collective-card__info
		{
			grid-template-areas:
			'picture    descr    city price'
			'progress   progress acceptance expected-delivery';
			grid-template-columns: 37px 40% 1fr 1fr;
		}

		.collective-card__city { align-self: center; }
		.collective-card__city { text-align: left; }
		.collective-card__descr { padding-right: 10px; }
	}
	@include mq($tablet)
	{
		.collective-card__info-btns
		{
			display: flex;
			gap: 10px;
			position: absolute;
			z-index: 3;
			top: 8px;
			left: 110px;
			background-color: #fff;
			padding: 20px 0 20px 70px;
			opacity: 0;

			@include transition();
		}

		.collective-card
		{
			border-radius: 10px;

			&:hover
			{
				box-shadow: 0px 0px 13px 0px rgba(33, 33, 53, 0.04);

				.collective-card__discount-wr { max-height: 200px; }
			}
		}

		.collective-card__info
		{
			display: flex;
			align-items: center;
			flex-direction: row;
			border-radius: 10px;
			padding: 15px;
		}

		.collective-card__picture
		{
			flex-basis: 6%;
			order: 1;
		}

		.collective-card__descr
		{
			flex-basis: 22%;
			order: 2;
		}

		.collective-card__city
		{
			flex-basis: 10.5%;
			order: 3;
		}

		.collective-card__price
		{
			flex-basis: 12%;
			order: 4;
		}

		.collective-card__progress
		{
			flex-basis: 17.5%;
			order: 5;
		}

		.collective-card__supply.acceptance
		{
			flex-basis: 13.5%;
			order: 6;
		}

		.collective-card__supply.expected { order: 7; }

		.collective-card__picture
		{
			width: 36px;
			height: 35px;

			img
			{
				width: fit-content;
			}
		}

		.collective-card__title
		{
			font-size: 12px;
			line-height: 16px;
			margin-bottom: 0;
		}

		.collective-card__name
		{
			font-size: 11px;
			line-height: 15px;
		}

		.collective-card__city
		{
			font-size: 12px;
			line-height: 16px;
		}

		.collective-card__price
		{
			font-size: 12px;
			line-height: 16px;
			text-align: left;
		}

		.collective-card__progress
		{
			align-self: flex-start;

			.progressbar
			{
				width: 80px;
			}
		}

		.collective-card__progressbar-value
		{
			font-size: 10px;
			line-height: 14px;
		}

		.collective-card__price-to
		{
			display: inline;
		}

		.collective-card__status
		{
			font-size: 11px;
			line-height: 15px;
		}

		.collective-card__price-rub
		{
			display: none;
		}

		.collective-card__supply
		{
			&:last-child
			{
				text-align: left;
			}
		}

		.collective-card__supply-title
		{
			display: none;
		}

		.collective-card__supply-data
		{
			font-size: 12px;
			line-height: 16px;
		}

		.collective-card__discount-wr
		{
			display: block;

			position: relative;
			z-index: 0;
			overflow: hidden;
			max-height: 0;

			@include transition(.5s);
		}

		.collective-card__discount
		{
			display: flex;
			gap: 21px;
			flex-wrap: wrap;
		}
	}

	@include mq($wd)
	{
		.collective-card
		{
			&:hover
			{
				.collective-card__info-btns
				{
					opacity: 1;
				}
			}
		}

		.collective-card__info-btns
		{
			display: flex;
			gap: 10px;
			position: absolute;
			z-index: 3;
			top: 8px;
			left: 110px;
			background-color: #fff;
			padding: 20px 0 20px 70px;
			opacity: 0;

			@include transition();
		}

		.collective-card__descr
		{
			flex-basis: 25%;
		}

		.collective-card__city
		{
			flex-basis: 15%;
		}

		.collective-card__price
		{
			flex-basis: 10.5%;
		}

		.collective-card__progress
		{
			flex-basis: 17%;
		}

		.collective-card__supply.acceptance
		{
			flex-basis: 13.5%;
		}

		.collective-card__info { padding: 15px 50px; }

		.collective-card__img { flex-basis: 68%; }

		.collective-card__picture
		{
			width: 60px;
			height: 59px;
		}

		.collective-card__title,
		.collective-card__name,
		.collective-card__city,
		.collective-card__price,
		.collective-card__status
		{
			font-size: 16px;
			line-height: 22px;
		}

		.collective-card__price-to { display: inline; }

		.collective-card__progress
		{
			align-self: auto;

			.progressbar { width: 120px; }
		}

		.collective-card__progressbar-value
		{
			font-size: 14px;
			line-height: 19px;
		}

		.collective-card__supply-data
		{
			font-size: 16px;
			line-height: 18px;
		}

		.collective-card__discount
		{
			padding: 18px 50px 10px;
			gap: 26px;
		}

		.collective-card__discount-item
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

		.collective-card__discount-amount
		{
			font-size: 12px;
			line-height: 16px;
		}

		.collective-card__discount-price
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
</style>
