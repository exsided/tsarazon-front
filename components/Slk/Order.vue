<template>
	<div class="slk-order">
		<UiCheckbox />
		<p class="slk-order__id">
			12483-46
		</p>
		<p class="slk-order__icon">
			<CollectiveSvg />
		</p>
		<p class="slk-order__data">
			12.06.23
		</p>
		<p class="slk-order__price">
			10 845
			<i class="ruble">₽</i>
		</p>
		<div
			class="slk-order__status"
			@click="statusToggler"
		>
			<span class="slk-order__circle slk-order__circle--blue" />
			<span class="slk-order__text">Выполняется</span>
			<div
				v-if="isVisible"
				v-click-outside="statusToggler"
				class="slk-order__popup"
			>
				<div class="slk-order__popup-item">
					<span class="slk-order__circle slk-order__circle--blue" />
					<span class="slk-order__text">Выполняется</span>
				</div>
				<div class="slk-order__popup-item">
					<span class="slk-order__circle slk-order__circle--orange" />
					<span class="slk-order__text">Выполнен</span>
				</div>
				<div class="slk-order__popup-item">
					<span class="slk-order__circle slk-order__circle--gray" />
					<span class="slk-order__text">Рассматривается</span>
				</div>
				<div class="slk-order__popup-item">
					<span class="slk-order__circle slk-order__circle--red" />
					<span class="slk-order__text">Отменен</span>
				</div>
			</div>
		</div>
		<div class="slk-order__supply shipment">
			<p class="slk-order__supply-title">
				Откуда:
			</p>
			<p class="slk-order__supply-city">
				Владикавказ
			</p>
		</div>
		<div class="slk-order__supply delivery">
			<p class="slk-order__supply-title">
				Куда:
			</p>
			<p class="slk-order__supply-city">
				Владикавказ
			</p>
		</div>
	</div>
</template>

<script setup>
import UiCheckbox from '~/components/UI/Checkbox.vue';
import CollectiveSvg from '~/assets/svg/order-collective.svg?skipsvgo';

const isVisible = ref(false);

const statusToggler = () =>
{
	isVisible.value = !isVisible.value;
};
</script>

<style lang="scss">
.slk-order
{
	display: grid;
	grid-template-areas:
	'id        icon      icon      data'
	'status    price     price     price'
	'shipment  shipment  delivery  delivery';
	grid-template-columns: 95px 1fr 1fr 1fr;
	row-gap: 15px;

	padding: 10px;
	position: relative;

	.ui-checkbox
	{
		position: absolute;
		top: 10px;
		left: 10px;
	}

	.ui-checkbox__body
	{
		align-items: flex-start;
	}

	.ui-checkbox__box
	{
		border: 1px solid $gray;
		margin-right: 0;
	}

	.ui-checkbox__input
	{
		&:enabled
		{
			&:checked
			{
				& ~ .ui-checkbox__body .ui-checkbox__box
				{
					border: 1px solid $blue;
				}
			}
		}
	}

	p { margin-bottom: 0; }
}

.slk-order__id
{
	grid-area: id;
	font-size: 13px;
	line-height: 18px;
	font-weight: 600;
	margin-left: 28px;
}

.slk-order__icon
{
	grid-area: icon;
	display: flex;
	align-items: center;
	svg
	{
		width: 17px;
		height: 12px;
	}
	path { stroke: $gray; }
}

.slk-order__data
{
	grid-area: data;
	font-size: 13px;
	line-height: 18px;
	font-weight: 600;
	text-align: right;
}

.slk-order__status
{
	grid-area: status;
	display: flex;
	align-items: center;
	position: relative;
	cursor: pointer;
}

.slk-order__circle
{
	display: inline-block;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	margin-right: 2px;

	&--blue
	{
		background: $blue;
	}

	&--gray
	{
		background: $lgray;
	}

	&--orange
	{
		background: $orange;
	}

	&--red
	{
		background: $red;
	}
}

.slk-order__text
{
	font-size: 11px;
	line-height: 15px;
	color: $black;
}

.slk-order__popup
{
	position: absolute;
	z-index: 1;
	top: -10px;
	left: -10px;
	background: $white;
	border-radius: 10px;
	box-shadow: 0px 0px 13px 0px rgba(93, 95, 107, 0.10);
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 10px;
}

.slk-order__popup-item
{
	display: flex;
	align-items: center;
}

.slk-order__price
{
	grid-area: price;
	font-size: 11px;
	line-height: 15px;
	text-align: right;
}

.slk-order__supply
{
	&.shipment { grid-area: shipment; }
	&.delivery
	{
		grid-area: delivery;
		text-align: right;
	}
}

.slk-order__supply-title
{
	color: $gray;
	font-size: 10px;
	line-height: 13px;
}

.slk-order__supply-city
{
	font-size: 11px;
	line-height: 15px;
}

@include mq($tablet)
{
	.slk-order
	{
		display: flex;
		align-items: center;
		padding: 16px 10px 16px 38px;

		.ui-checkbox
		{
			top: 16.5px;
		}
	}

	.slk-order__id
	{
		font-weight: 400;
		margin-left: 0;
	}

	.slk-order__data,
	.slk-order__price,
	.slk-order__text,
	.slk-order__supply-city
	{
		font-size: 13px;
		line-height: 18px;
		font-weight: 400;
	}

	.slk-order__supply-title
	{
		display: none;
	}

	.slk-order__id
	{
		order: 0;
		flex-basis: 12.2%;
	}

	.slk-order__data
	{
		order: 1;
		flex-basis: 15%;
		text-align: left;
	}

	.slk-order__status
	{
		order: 2;
		flex-basis: 20.8%;
	}

	.slk-order__popup
	{
		padding: 16px;
		gap: 16px;
		top: -16px;
		left: -16px;
	}

	.slk-order__supply
	{
		&.shipment
		{
			order: 3;
			flex-basis: 16.3%;
		}
		&.delivery
		{
			order: 4;
			flex-basis: 18.9%;
			text-align: left;
		}
	}

	.slk-order__price
	{
		order: 5;
		flex-basis: 10%;
		text-align: left;
	}

	.slk-order__icon
	{
		order: 6;
		flex-grow: 1;
		justify-content: flex-end;

		svg
		{
			width: 20px;
			height: 14px;
		}
	}
}

@include mq($wd)
{
	.slk-order
	{
		padding: 28px 30px 28px 88px;

		.ui-checkbox
		{
			top: 30px;
			left: 30px;
		}
	}

	.slk-order__id,
	.slk-order__data,
	.slk-order__price,
	.slk-order__text,
	.slk-order__supply-city
	{
		font-size: 16px;
		line-height: 22px;
	}

	.slk-order__id
	{
		flex-basis: 11%;
	}

	.slk-order__data
	{
		flex-basis: 15.1%;
	}

	.slk-order__status
	{
		flex-basis: 17%;
	}

	.slk-order__circle
	{
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.slk-order__supply
	{
		&.shipment
		{
			flex-basis: 17.1%;
		}
		&.delivery
		{
			flex-basis: 20%;
		}
	}

	.slk-order__price
	{
		flex-basis: 10%;
	}

	.slk-order__icon
	{
		svg
		{
			width: 28px;
			height: 19px;
		}
	}
}
</style>
