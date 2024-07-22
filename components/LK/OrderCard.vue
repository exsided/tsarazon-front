<template>
	<div class="order-card">
		<div class="order-card__heading">
			<div class="order-card__descr">
				<NuxtLink to="#" class="order-card__title">
					Заказ №3 от 9 апреля 2023
					<CollectiveSvg v-if="isCollective" />
				</NuxtLink>
				<p v-if="isCollective" class="order-card__number">
					Коллективная закупка №3
				</p>
			</div>
			<div class="order-card__paid">
				<span>оплачено:</span>
				<p>
					330 500<i class="ruble">₽</i>
				</p>
			</div>
		</div>
		<div class="order-card__info">
			<div class="order-card__info-wr">
				<div>
					<div class="order-card__delivery">
						<p class="order-card__title">
							Доставка по адресу
						</p>
						<OrderStatus title="Получено" />
					</div>
					<p class="order-card__data">
						Дата доставки: 11 апреля 2023
					</p>
				</div>
				<div class="order-card__products">
					<div class="order-card__images">
						<NuxtLink to="#" class="order-card__image">
							<img src="/img/orders-1.png">
						</NuxtLink>
						<NuxtLink to="#" class="order-card__image">
							<img src="/img/orders-2.png">
						</NuxtLink>
						<NuxtLink to="#" class="order-card__image">
							<img src="/img/orders-3.png">
						</NuxtLink>
					</div>
					<div class="order-card__more">
						еще<span class="order-card__more-amount">+5</span>
					</div>
				</div>
			</div>
			<div class="order-card__return" @click="openGoodsReturnPopup">
				Вернуть товар
			</div>
		</div>
	</div>
</template>

<script setup>
import CollectiveSvg from '~/assets/svg/order-collective.svg?skipsvgo';
import OrderStatus from '~/components/Status.vue';

import { usePopupsStore } from '~/store';

const popupsStore = usePopupsStore();

const props = defineProps({
	isCollective:
	{
		type: Boolean,
		default: false
	}
});

const openGoodsReturnPopup = () => popupsStore.setState(['GoodsReturnPopup', true]);
</script>

<style lang="scss">
.order-card
{
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0px 0px 13px 0px rgba(93, 95, 107, 0.10);

	p { margin-bottom: 0; }
}

.order-card__heading
{
	padding: 17px 20px;
	background: $lgray;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.order-card__descr
{
	display: flex;
	flex-direction: column;
	margin-bottom: 2px;

	.order-card__title
	{
		@include transition();

		&:hover
		{
			color: $blue;
		}
	}
}

.order-card__title
{
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;

	svg
	{
		margin-left: 8px;
		vertical-align: text-top;
	}
}

.order-card__number
{
	font-size: 11px;
	line-height: 15px;
	font-weight: 600;
	color: $blue;
}

.order-card__paid
{
	display: flex;
	align-items: flex-end;

	span
	{
		font-size: 12px;
		line-height: 22px;
		margin-right: 3px;
	}

	p
	{
		font-size: 16px;
		line-height: 22px;
		font-weight: 600;
	}

	.ruble
	{
		font-size: 13px;
		line-height: 22px;
		margin-left: 3px;
	}
}

.order-card__info
{
	padding: 16px 20px;
}

.order-card__info-wr
{
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 20px;
}

.order-card__delivery
{
	display: flex;
	gap: 7px;
	margin-bottom: 4px;
}

.order-card__label
{
	background: $blue;
	border-radius: 16px;
	padding: 3px 12px;
	color: $white;
	font-weight: 600;
	font-size: 10px;
	line-height: 14px;
}

.order-card__data
{
	color: $gray;
	font-size: 11px;
	line-height: 15px;
}

.order-card__products
{
	display: flex;
	align-items: center;
	gap: 10px;
}

.order-card__images
{
	display: flex;
	gap: 10px;
}

.order-card__image
{
	max-width: 56px;

	img
	{
		display: block;
	}
}

.order-card__more
{
	display: flex;
	align-items: center;
	cursor: pointer;
	color: $orange;
	font-size: 12px;
	line-height: 16px;
}

.order-card__more-amount
{
	font-size: 16px;
	line-height: 22px;
	margin-left: 4px;
}

.order-card__return
{
	display: block;
	height: fit-content;
	width: fit-content;
	color: $blue;
	font-size: 13px;
	line-height: 18px;
	font-weight: 600;
	cursor: pointer;
	@include transition();

	&:hover
	{
		color: $orange;
	}
}

@include mq($mobile)
{
	.order-card__heading
	{
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: unset;
	}

	.order-card__info-wr
	{
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: unset;
		margin-bottom: 10px;
	}

	.order-card__images
	{
		img
		{
			&:last-child
			{
				display: none;
			}
		}
	}
}

@include mq($tablet)
{
	.order-card__heading
	{
		padding: 16px;
		padding-bottom: 13px;
	}

	.order-card__title
	{
		font-size: 16px;
		line-height: 22px;
		margin-bottom: 2px;
	}

	.order-card__number
	{
		font-size: 12px;
		line-height: 16px;
	}

	.order-card__info
	{
		padding: 16px 18px;
	}

	.order-card__data
	{
		font-size: 12px;
		line-height: 16px;
	}
}

@include mq($wd)
{
	.order-card__heading
	{
		padding: 17px 30px;
	}

	.order-card__title
	{
		font-size: 18px;
		line-height: 25px;
		margin-bottom: 0;

		svg
		{
			margin-top: 2px;
			margin-left: 13px;
			width: 30px;
			height: 20px;
		}
	}

	.order-card__number
	{
		display: block;
		font-size: 14px;
		line-height: 19px;
	}

	.order-card__paid
	{
		align-items: center;
		span
		{
			font-size: 14px;
			line-height: 19px;
		}

		p
		{
			font-size: 18px;
			line-height: 25px;
		}

		.ruble
		{
			font-size: 15px;
			line-height: 20px;
		}
	}

	.order-card__info
	{
		padding: 16px 30px;
		display: flex;
		justify-content: space-between;
	}

	.order-card__info-wr
	{
		flex-basis: 77.5%;
		margin-bottom: 0;
	}

	.order-card__delivery
	{
		.order-card__title
		{
			line-height: 21px;
		}
	}

	.order-card__data
	{
		font-size: 14px;
		line-height: 19px;
	}

	.order-card__images
	{
		img
		{
			&:last-child
			{
				display: inline;
			}
		}
	}

	.order-card__more
	{
		font-size: 13px;
		line-height: 18px;
	}

	.order-card__more-amount
	{
		font-size: 18px;
		line-height: 25px;
		margin-left: 3px;
	}

	.order-card__return
	{
		font-size: 14px;
		line-height: 19px;
		margin-right: 11px;
	}
}
</style>
