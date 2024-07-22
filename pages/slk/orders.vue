<template>
	<NuxtLayout name="slk">
		<div class="slk-orders container">
			<div class="slk-orders__actions">
				<div class="slk-orders__search">
					<UiInput
						v-model="searchText"
						name="search"
						placeholder="Найти по номеру"
					/>
					<SearchSvg />
				</div>
				<div class="slk-orders__actions-inputs">
					<div class="slk-orders__data">
						<UiDatepicker
							label="Дата создания"
						/>
					</div>
					<div class="slk-orders__data">
						<UiDatepicker
							label="Дата изменения статуса"
						/>
					</div>
				</div>
			</div>
			<div class="slk-orders__sort">
				<UiSelect
					v-model="status"
					:options="statusOptions"
					placeholder="Статус заказа"
					class="slk-orders__select"
				/>
				<UiSelect
					v-model="delivery"
					:options="deliveryOptions"
					placeholder="Города доставки"
					class="slk-orders__select"
				/>
				<UiSelect
					v-model="storage"
					:options="storageOptions"
					placeholder="Склад/Город хранения"
					class="slk-orders__select"
				/>
				<UiSelect
					v-model="type"
					:options="typeOptions"
					placeholder="Тип заказа"
					class="slk-orders__select"
				/>
			</div>
			<div class="slk-orders__tablet slk-tablet">
				<div class="slk-tablet__heading">
					<UiCheckbox />
					<div class="slk-tablet__column">
						Номер
					</div>
					<div class="slk-tablet__column">
						Дата создания
					</div>
					<div class="slk-tablet__column">
						Статус
					</div>
					<div class="slk-tablet__column">
						Город отправки
					</div>
					<div class="slk-tablet__column">
						Город доставки
					</div>
					<div class="slk-tablet__column">
						Стоимость
					</div>
				</div>
				<OrderVue
					v-for="i in 16"
					:key="i"
				/>
			</div>
			<div class="slk-orders__more">
				<button class="slk-orders__more-btn">
					Показать еще 24
				</button>
			</div>
			<UiPagination />
			<ScrollTop />
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiInput from '~/components/UI/Input.vue';
import UiSelect from '~/components/UI/Select.vue';
import UiCheckbox from '~/components/UI/Checkbox.vue';
import UiDatepicker from '~/components/UI/Datepicker.vue';
import OrderVue from '~/components/Slk/Order.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import ScrollTop from '~/components/ScrollTop.vue';

import SearchSvg from '~/assets/svg/search.svg?skipsvgo';

const status = ref({ name: '', code: '' });

const statusOptions =
[
	{ name: 'Рассматривается', code: 'сonsidered' },
	{ name: 'Выполняется', code: 'executed' },
	{ name: 'Выполнен', code: 'done' },
	{ name: 'Отменен', code: 'canceled' },
];

const delivery = ref({ name: '', code: '' });

const deliveryOptions =
[
	{ name: 'Владикавказ', code: 'Vladikavkaz' },
	{ name: 'Волгоград', code: 'Volgograd' },
];

const type = ref({ name: '', code: '' });

const typeOptions =
[
	{ name: 'Обычный заказ', code: 'usual' },
	{ name: 'Заказ со скидкой', code: 'discount' },
];

const storage = ref({ name: '', code: '' });

const storageOptions =
[
	{ name: 'Владикавказ', code: 'Vladikavkaz' },
	{ name: 'Волгоград', code: 'Volgograd' },
];
</script>

<style lang="scss">
@import '~/assets/scss/slk-tablet.scss';

.slk-orders
{
	margin-bottom: 50px;
}

.slk-orders__actions
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 10px;
}

.slk-orders__search
{
	position: relative;
	z-index: 12;
	max-height: 37px;

	svg
	{
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}

	.ui-input__field
	{
		width: 100%;
		height: 37px;
		padding: 9px 16px;
		font-size: 14px;
		line-height: 19px;
		font-weight: 400;
		background-color: $lgray;
		border-radius: 10px;
		border: unset;
		outline: unset;

		&::placeholder { color: rgba(44, 44, 44, 0.4); }
	}
}

.slk-orders__actions-inputs
{
	display: flex;
	gap: 10px;
	position: relative;
}

.slk-orders__data
{
	display: flex;
	flex-direction: column;
	background-color: $lgray;
	border-radius: 7px;
	padding: 6px 10px;
	flex-grow: 1;

	&:first-child
	{
		flex-basis: 50%;
	}
}

.slk-orders__sort
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 30px;
}

.slk-orders__select
{
	.select
	{
		margin-bottom: 0;
	}

	.select__label
	{
		padding: 10px 66px 10px 16px;
	}

	.select__label-arrow
	{
		right: 16px;
	}
}

.slk-orders__more
{
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

.slk-orders__more-btn
{
	padding: 10px 20px;
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;
	border: none;
	border-radius: 10px;
	background: $lgray;
}

@include mq($mobile)
{
	.slk-orders__data
	{
		&:first-child
		{
			flex-basis: unset;
		}
	}
}

@include mq($tablet)
{
	.slk-orders
	{
		margin-bottom: 60px;
	}

	.slk-orders__actions
	{
		flex-direction: row;
		gap: 10px;
		margin-bottom: 20px;
	}

	.slk-orders__search
	{
		max-height: 45px;
		flex-grow: 1;

		svg
		{
			right: 20px;
		}

		.ui-input__field
		{
			height: 45px;
			padding: 10.5px 20px;
			font-size: 16px;
			line-height: 22px;
		}
	}

	.slk-orders__data
	{
		width: 180px;
		max-height: 45px;
		padding-left: 16px;
		flex-grow: 0;
	}

	.slk-orders__sort
	{
		flex-direction: row;
		flex-wrap: wrap;
	}

	.slk-orders__select
	{
		flex-basis: 32.4%;

		&.select
		{
			margin-bottom: 0;
		}

		.select__label
		{
			border-radius: 6px;
		}

		.select__label-text
		{
			font-size: 12px;
			line-height: 16px;
		}
	}

	.slk-orders__more-btn
	{
		font-size: 15px;
		line-height: 21px;
	}

	.slk-orders__tablet
	{
		.slk-tablet__heading
		{
			padding: 16px 10px 16px 38px;

			.ui-checkbox
			{
				top: 16px;
			}
		}

		.slk-tablet__column
		{
			&:nth-of-type(1)
			{
				flex-basis: 12.2%;
			}

			&:nth-of-type(2)
			{
				flex-basis: 15%;
			}

			&:nth-of-type(3)
			{
				flex-basis: 20.8%;
			}

			&:nth-of-type(4)
			{
				flex-basis: 16.3%;
			}

			&:nth-of-type(5)
			{
				flex-basis: 18.9%;
			}

			&:nth-of-type(6)
			{
				flex-basis: 10%;
				display: block;
			}
		}
	}
}

@include mq($wd)
{
	.slk-orders
	{
		margin-bottom: 80px;
	}

	.slk-orders__actions
	{
		margin-bottom: 23px;
	}

	.slk-orders__search
	{
		flex-grow: 0;
		flex-basis: 38.3%;

		.ui-input__field
		{
			font-size: 16px;
			line-height: 22px;
			padding: 9px 20px;
		}
	}

	.slk-orders__sort
	{
		flex-wrap: nowrap;
	}

	.slk-orders__select
	{
		flex-basis: 19.4%;

		.select__label
		{
			padding: 10px 66px 10px 20px;
		}

		.select__label-text
		{
			font-size: 13px;
			line-height: 18px;
		}

		.select__label-arrow
		{
			right: 20px;
		}
	}

	.slk-orders__actions-inputs
	{
		position: static;
	}

	.slk-orders__tablet
	{
		.slk-tablet__heading
		{
			padding: 16px 30px 16px 88px;

			.ui-checkbox
			{
				top: 18px;
				left: 30px;
			}
		}

		.slk-tablet__column
		{
			&:nth-of-type(1)
			{
				flex-basis: 11%;
			}

			&:nth-of-type(2)
			{
				flex-basis: 15.1%;
			}

			&:nth-of-type(3)
			{
				flex-basis: 17%;
			}

			&:nth-of-type(4)
			{
				flex-basis: 17.1%;
			}

			&:nth-of-type(5)
			{
				flex-basis: 20%;
			}

			&:nth-of-type(6)
			{
				flex-basis: 10%;
			}
		}
	}

	.slk-orders__more-btn
	{
		font-size: 18px;
		line-height: 25px;
	}
}

</style>
