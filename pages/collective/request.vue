<template>
	<NuxtLayout name="default">
		<div class="request-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
				<h1>
					Предложить закупку
				</h1>
				<form>
					<div class="request-page__form">
						<div class="request-page__select">
							<UiSelect
								v-model="addProduct"
								:options="productOptions"
								placeholder="Добавить товар"
							/>
						</div>
						<div
							v-for="product, i in selectedProducts"
							:key="i"
							class="request-page__item"
						>
							<div class="request-page__item-name">
								{{ product.name }}
							</div>
							<UiInput
								v-model="product.sum"
								is-number
								name="sum"
								label="Сумма"
							/>
							<CounterVue :model-value="100">
								<span>кг</span>
							</CounterVue>
							<div class="request-page__item-delete">
								<RecycleBin />
							</div>
						</div>
						<div class="request-page__fields">
							<UiInput
								v-model="comment"
								name="comment"
								textarea
								label="Ваш комментарий"
							/>
							<UiInput
								v-model="fio"
								name="fio"
								label="ФИО"
							/>
							<UiInput
								v-model="address"
								name="address"
								label="Адрес"
							/>
							<UiInput
								v-model="phone"
								name="phone"
								mask="+7 (###) ###-##-##"
								label="Телефон"
							/>
							<UiInput
								v-model="email"
								name="email"
								label="Email"
							/>
						</div>
						<button class="request-page__form-btn button button--blue">
							Предложить
						</button>
					</div>
				</form>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import UiInput from '~/components/UI/Input.vue';
import UiSelect from '~/components/UI/Select.vue';
import CounterVue from '~/components/Counter.vue';
import RecycleBin from '~/assets/svg/recycle-bin.svg?skipsvgo';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Коллективные закупки', link: '/collective' }, { name: 'Предложить закупку', link: '/collective/request' }];

useHead({ title: 'Предложить закупку' });

const addProduct = ref({ name: '', code: '' });
const comment = ref('');
const fio = ref('');
const address = ref('');
const phone = ref('');
const email = ref('');

const productOptions =
[
	{ name: 'Томатная паста, Baisad, 0.25кг', code: '1' },
	{ name: 'Томатная паста, Baisad, 0.25кг', code: '2' },
	{ name: 'Томатная паста, Baisad, 0.25кг', code: '3' },
	{ name: 'Томатная паста, Baisad, 0.25кг', code: '4' },
];

const selectedProducts = reactive([
	{
		name: 'Томатная паста, Baisad, 0.25кг',
		sum: '',
	},
	{
		name: 'Гречка, Baisad, 0.25кг',
		sum: '',
	},
]);

</script>

<style lang="scss">
.request-page
{
	margin-bottom: 40px;

	h1
	{
		font-family: 'Ubuntu';
		font-weight: 700;
		line-height: 22px;
		margin-bottom: 30px;
	}

	p
	{
		margin-bottom: 0;
	}
}

.request-page__form
{
	.ui-input
	{
		margin-bottom: 0;
	}

	.ui-input__field
	{
		&:not(&--textarea)
		{
			height: 36px;
		}
		font-weight: 400;
	}

	.ui-input__label
	{
		top: 20px;
	}
}

.request-page__select
{
	margin-bottom: 20px;

	.select__label
	{
		padding: 9px 40px 9px 20px;
	}

	.select__label-text
	{
		font-size: 13px;
		line-height: 18px;
		font-weight: 600;
	}
}

.request-page__item
{
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 10px;
	margin-bottom: 10px;

	.ui-input
	{
		flex-basis: 41%;
	}

	.counter
	{
		gap: 8px;

		.counter__action
		{
			box-shadow: 0px 0px 14px 0px rgba(93, 95, 107, 0.10);
		}
	}
}

.request-page__item-name
{
	border-radius: 10px;
	background: $lgray;
	font-size: 13px;
	line-height: 18px;
	width: 100%;
	padding: 9px 20px;
}

.request-page__item-delete
{
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
}

.request-page__fields
{
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	.ui-input__field
	{
		&--textarea
		{
			height: 140px;
			margin-bottom: 5px;
			padding-top: 20px;
		}
	}
}

.request-page__form-btn
{
	font-size: 14px;
	line-height: 19px;
	width: 180px;
	height: 46px;
}

@include mq($tablet)
{
	.request-page
	{
		margin-bottom: 50px;

		h1
		{
			line-height: 30px;
		}
	}

	.request-page__form
	{
		max-width: 616px;

		.ui-input__field
		{
			&:not(&--textarea) { height: 40px; }
		}
	}

	.request-page__select
	{
		max-width: 280px;
		.select__label
		{
			padding: 11px 40px 11px 20px;
		}
	}

	.request-page__item
	{
		.ui-input
		{
			flex-basis: 22.8%;
		}

		.counter
		{
			margin-right: 9px;

			.counter__action
			{
				padding: 13px;
				max-height: unset;
			}

			.counter__amount
			{
				font-size: 15px;

				span
				{
					font-size: 11px;
					line-height: 15px;
				}
			}
		}
	}

	.request-page__item-name
	{
		max-width: 280px;
		padding: 11px 20px;
	}

	.request-page__fields
	{
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;

		.ui-input
		{
			flex-basis: calc(50% - 5px);
			&--textarea
			{
				flex-basis: 100%;
			}
		}

		.ui-input__field
		{
			&--textarea
			{
				height: 120px;
			}
		}
	}
}

@include mq($wd)
{
	.request-page
	{
		h1
		{
			line-height: 37px;
		}
	}

	.request-page__form
	{
		max-width: 630px;

		.ui-input__field
		{
			&:not(&--textarea) { height: 46px; }
		}

		.ui-input__label { top: 23px; }
	}

	.request-page__select
	{
		.select__label
		{
			padding: 14px 40px 14px 20px;
		}
	}

	.request-page__item
	{
		.ui-input
		{
			flex-basis: 22%;
		}

		.counter
		{
			margin-right: 9px;

			.counter__action
			{
				padding: 16px;
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

	.request-page__item-name
	{
		padding: 14px 20px;
	}

	.request-page__fields
	{
		margin-bottom: 30px;

		.ui-input__field
		{
			&:not(&--textarea)
			{
				padding: 21px 20px 14px;
			}

			&--textarea
			{
				margin-bottom: 14px;
			}
		}
	}
}
</style>
