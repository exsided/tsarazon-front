<template>
	<NuxtLayout name="default">
		<div class="container">
			<UiBreadcrumbs :items="breadcrumbs" />
			<h1>
				{{ title }}
			</h1>

			<p>
				deliveryType - {{ deliveryType }}
			</p>
			<p>
				type - {{ type }}
			</p>

			<button @click="type = 'collective'">
				Коллективная
			</button>

			<button @click="type = 'individual'">
				Индивидуальная
			</button>

			<div class="purchase-page">
				<div class="purchase-page__info">
					<div class="purchase-page__info-order">
						<div class="purchase-page__order">
							<h3 class="purchase-page__order-title">
								Заказ №{{ currentOrder.name }}
							</h3>
							<p
								v-if="isCollecvtive"
								class="purchase-page__order-subtitle"
							>
								Коллективная закупка №1
							</p>
							<p class="purchase-page__order-text">
								Поставщик:
								<span>
									{{ supplier.name }}
								</span>
							</p>
						</div>

						<div class="purchase-page__wr">
							<p class="purchase-page__wr-title">
								Способ доставки
							</p>
							<div class="purchase-page__wr-btn">
								<button
									class="purchase-page__btn"
									:class="{ 'active': deliveryType === 'courier' }"
									@click="deliveryType = 'courier'"
								>
									Курьером
								</button>
								<button
									class="purchase-page__btn"
									:class="{ 'active': deliveryType === 'pickup' }"
									@click="deliveryType = 'pickup'"
								>
									Самовывоз
								</button>
							</div>
						</div>

						<Transition name="purchase-data-changing">
							<div v-if="isCourier && isIndividual">
								<p
									v-if="isIndividual"
									class="purchase-page__order-price-info"
								>
									Примерная стоимость доставки
								</p>
								<p class="purchase-page__order-price">
									650 <i class="ruble">₽</i>
								</p>
							</div>
						</Transition>

						<Transition name="purchase-data-changing">
							<div v-if="isPickup && isCollecvtive">
								<p
									v-if="isCollecvtive"
									class="purchase-page__order-price-info"
								>
									Фиксированная стоимость самовывоза
								</p>
								<p class="purchase-page__order-price">
									Бесплатно
								</p>
							</div>
						</Transition>

						<Transition name="purchase-data-changing">
							<div v-if="isCourier && isCollecvtive">
								<p
									v-if="isCollecvtive"
									class="purchase-page__order-price-info"
								>
									Фиксированная стоимость доставки по городу
								</p>
								<p class="purchase-page__order-price">
									650 <i class="ruble">₽</i>
								</p>
							</div>
						</Transition>
					</div>

					<Transition name="purchase-data-changing">
						<div
							v-if="isPickup"
							class="purchase-page__point"
						>
							<p class="purchase-page__point-title">
								Адреса складов (пункты самовывоза):
							</p>
							<div class="purchase-page__point-wr">
								<div class="purchase-page__wr-desc">
									<PointSvg />
									<p class="purchase-page__desc-text">
										ГС/ул.Горькова 32;
									</p>
								</div>
								<div class="purchase-page__wr-desc">
									<PointSvg />
									<p class="purchase-page__desc-text">
										ГС/ул.Горькова 32;
									</p>
								</div>
							</div>
						</div>
					</Transition>

					<div class="purchase-page__info-form">
						<div
							v-if="isCourier"
							class="purchase-page__form-address"
						>
							<p class="purchase-page__adress-title">
								Заказ будет доставлен по адресу
							</p>
							<CityAutocomplite
								v-model="form.address"
								label="Населеный пункт, улица, номер дома"
								name="address"
								:error="$v.address?.$error || apiErrors.address"
								:error-text="apiErrors.address"
							/>
						</div>
						<div class="purchase-page__form-recipient">
							<div class="purchase-page__recipient-wr">
								<p class="purchase-page__wr-title">
									Получатель
								</p>
								<p class="purchase-page__wr-subtitle">
									Кто будет принимать заказ
								</p>
							</div>
							<div class="purchase-page__recipient-info">
								<UiInput
									v-model="form.fio"
									label="ФИО"
									name="fio"
									:error="$v.fio?.$error || apiErrors.fio"
									:error-text="apiErrors.fio"
								/>
								<div class="purchase-page__info-wr">
									<UiInput
										v-model="form.phone"
										label="Телефон"
										name="phone"
										:error="$v.phone?.$error || apiErrors.phone"
										:error-text="apiErrors.phone"
									/>
									<UiInput
										v-model="form.email"
										label="Электронный адрес"
										name="email"
										:error="$v.email?.$error || apiErrors.email"
										:error-text="apiErrors.email"
									/>
								</div>
								<UiInput
									v-model="form.comment"
									textarea
									class="purchase-page__info-textarea"
									label="Ваш комментарий"
									name="comment"
									:error="$v.comment?.$error || apiErrors.comment"
									:error-text="apiErrors.comment"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="purchase-page__price">
					<p class="purchase-page__price-title">
						Ваш заказ
					</p>
					<ul class="purchase-page__price-list">
						<li class="purchase-page__price-item">
							<p class="purchase-page__item-text">
								Товары <span>({{ NUMBER_FORMATTER(orderData.productCount) }})</span>
							</p>
							<p class="purchase-page__item-price">
								{{ NUMBER_FORMATTER(orderData.productPrice) }} <i class="ruble">₽</i>
							</p>
						</li>
						<li v-if="orderData.productDiscount" class="purchase-page__price-item">
							<p class="purchase-page__item-text">
								Скидка:
							</p>
							<p class="purchase-page__item-price purchase-page__item-price--blue">
								{{ NUMBER_FORMATTER(orderData.productDiscount) }} <i class="ruble">₽</i>
							</p>
						</li>
						<li v-if="isCourier" class="purchase-page__price-item">
							<p class="purchase-page__item-text">
								Примерная стоимость доставки
							</p>
							<p class="purchase-page__item-price">
								650 <i class="ruble">₽</i>
							</p>
						</li>
						<li v-if="isPickup" class="purchase-page__price-item">
							<p class="purchase-page__item-text">
								Стоимость самовывоза:
							</p>
							<p class="purchase-page__item-price">
								Бесплатно
							</p>
						</li>
						<li class="purchase-page__price-item purchase-page__price-item-stripe" />
						<li class="purchase-page__price-item">
							<p class="purchase-page__item-text">
								Итого:
							</p>
							<p class="purchase-page__item-price">
								{{ NUMBER_FORMATTER(orderData.productPrice) }} <i class="ruble">₽</i>
							</p>
						</li>
					</ul>
					<button class="button button--light-blue" @click="makeOrder">
						Оформить заказ
					</button>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import UiInput from '~/components/UI/Input.vue';
import CityAutocomplite from '~/components/CityAutocomplite.vue';
import PointSvg from '~/assets/svg/package-point.svg?skipsvgo';

import { NUMBER_FORMATTER, GET_CLEAR_PHONE } from '~/helpers/formatters';

import { PHONE_VALIDATION } from '~/helpers/validators.js';

import { useCartStore, useMainStore } from '~/store';

import ordersModule from '~/api/orders.js';

const instance = getCurrentInstance();

const router = useRouter();

const cartStore = useCartStore();
const mainStore = useMainStore();

// courier, pickup
const deliveryType = ref('courier');
// collective, individual
const type = ref('collective');

const form = reactive({
	address: '',
	fio: '',
	phone: '',
	email: '',
	comment: '',
});

const rules =
{
	address: { required },
	fio: { required },
	phone: { phone: PHONE_VALIDATION },
	email: { required, email },
	comment: { required },
};

const apiErrors = ref({});

const $v = useVuelidate(rules, form);

const supplier = {};
const orderData = {};

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Корзина', link: '/cart' }, { name: 'Оформление заказа', link: '/purchase' },];
const title = 'Оформление заказа';

const isCollecvtive = computed(() => type.value === 'collective');
const isIndividual = computed(() => type.value === 'individual');
const isPickup = computed(() => deliveryType.value === 'pickup');
const isCourier = computed(() => deliveryType.value === 'courier');

const fetchCart = async () =>
{
	mainStore.enableLoading(instance.uid);
	await cartStore.fetch();
	mainStore.disableLoading(instance.uid);
};

const fetchOrderingData = async () =>
{
	if (currentOrder.value === null)
	{
		redirectToCart();
		return;
	}

	mainStore.enableLoading(instance.uid);
	const { data, error } = await ordersModule.fetchOrderingData(currentOrder.value.id);

	if (error.value)
	{
		redirectToCart();
		return;
	}

	mainStore.disableLoading(instance.uid);

	orderData.cartId = data.value.data.cart_id;
	orderData.productDiscount = data.value.data.product_discount;
	orderData.productPrice = data.value.data.product_price;
	orderData.productCount = Object.values(data.value.data.product_quantity).reduce((acc, el) => acc + el, 0);

	supplier.id = data.value.data.supplier.id;
	supplier.name = data.value.data.supplier.name;
};

const redirectToCart = () =>
{
	router.replace('/cart');
	mainStore.disableLoading(instance.uid);
};

const makeOrder = async () =>
{
	$v.value.$touch();

	if ($v.value.$error)
		return;

	const { data, error } = await ordersModule.makeOrder({
		number: orderData.cartId,
		supplier_id: supplier.id,
		delivery_method: deliveryType.value,
		delivery_adress: form.address,
		delivery_price: 650,
		fio: form.address.fio,
		email: form.address.email,
		phone: GET_CLEAR_PHONE(form.address.phone),
	});

	// eslint-disable-next-line no-console
	console.log(data.value);
};

const currentOrder = computed(() => cartStore.getOrderById(cartStore.cartIdForMakeOrder));

await fetchCart();
await fetchOrderingData();

useHead({ title: 'Оформление заказа' });
</script>

<style lang="scss">
.purchase-page
{
	margin-bottom: 50px;
	overflow: hidden;
}

.purchase-page__info-order
{
	display: flex;
	padding: 26px 16px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	border-radius: 10px;
	background: var(--grey-ultra-light, #F4F5F7);

	margin-bottom: 20px;
}

.purchase-page__info-form
{
	padding: 20px 16px 30px;
	border-radius: 10px;
	background: var(--grey-ultra-light, #F4F5F7);
	margin-bottom: 20px;
	input
	{
		background: #FFF;
	}
}

.purchase-page__order
{
	margin-bottom: 26px;
}

.purchase-page__order-title
{
	color: #2C2C2C;
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	margin-bottom: 0;
}

.purchase-page__order-text
{
	color: #868799;
	font-size: 11px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 0;
	span
	{
		font-size: 11px;
		font-weight: 600;
		line-height: normal;
		text-decoration-line: underline;
		color: #3772FE;
	}
}

.purchase-page__wr
{
	margin-bottom: 26px;
}

.purchase-page__wr-title
{
	color:#2C2C2C;
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	margin-bottom: 12px;
}

.purchase-page__wr-btn
{
	display: flex;
	align-items: center;

	column-gap: 10px;
	.button
	{
		padding: 0 20px;
	}
}

.purchase-page__order-price-info
{
	color: #2C2C2C;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 6px;
}

.purchase-page__order-price
{
	color: #F69421;
	font-size: 14px;
	font-weight: 600;
	line-height: normal;
}

.purchase-page__form-address
{
	margin-bottom: 30px;

}

.purchase-page__adress-title
{
	color: #2C2C2C;
	font-size: 15px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 16px;
}

.purchase-page__wr-title
{
	color: #2C2C2C;
	font-size: 15px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 6px;
}

.purchase-page__wr-subtitle
{
	color: #868799;
	font-size: 13px;
	font-weight: 400;
	line-height: normal;
}

.purchase-page__price
{
	padding: 16px;
	border-radius: 10px;
	background: var(--grey-ultra-light, #F4F5F7);
	.button--light-blue
	{
		width: 100%;
	}
}

.purchase-page__price-title
{
	color:  #2C2C2C;
	font-size: 15px;
	font-weight: 400;
	line-height: 18px;
	margin-bottom: 20px;
}

.purchase-page__price-list
{
	margin-bottom: 20px;
}

.purchase-page__price-item
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
	&:last-child
	{
		margin-bottom: 0;
	}
}

.purchase-page__item-text
{
	color: #868799;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 0;
	span
	{
		color: #F69421;
	}
}

.purchase-page__item-price
{
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 14px;
	margin-bottom: 0;
	&--blue
	{
		color: #3772FE;
	}
}

.purchase-page__price-item-stripe
{
	width: 100%;
	height: 1px;
	background: #E5E5FA;
}

.purchase-page__info-textarea
{
	.ui-input__field--textarea
	{
		background-color: #fff;
	}
}

.purchase-page__order-subtitle
{
	color: #F69421;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 2px;
}

.purchase-page__point
{
	border-radius: 10px;
	background: #F4F5F7;
	padding: 26px 16px;
	margin-bottom: 21px;
}

.purchase-page__point-title
{
	color: #2C2C2C;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
}

.purchase-page__wr-desc
{
	border-radius: 10px;
	background: #FFF;
	display: flex;
	align-items: center;
	padding: 10px 16px;
	gap: 6px;
		margin-bottom: 10px;
	&:last-of-type
	{
		margin-bottom: 0;
	}
}

.purchase-page__desc-text
{
	color: #F69421;
	font-size: 13px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.purchase-page__hiden
{
	display: none;
}

.purchase-page__btn
{
	display: flex;
	padding: 11px 25px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: $white;
	box-shadow: 0px 0px 13px 0px rgba(93, 95, 107, 0.10);
	border: none;

	color: $blue;
	font-size: 14px;
	font-weight: 600;
	line-height: normal;
	@include transition();

	&.active
	{
		background: $blue;
		color: $white;
	}

	&:hover { opacity: .8; }

	&:active { transform: scale(0.95); }
}

.purchase-data-changing-enter-active, .purchase-data-changing-leave-active
{
	transition: .5s ease;
	overflow: hidden;
	max-height: 1000px;
}

.purchase-data-changing-enter-from, .purchase-data-changing-leave-to
{
	opacity: 0;
	transform: translateX(-100%);
	max-height: 0;
}

@include mq(768px)
{
	.purchase-page
	{
		margin-bottom: 80px;
		display: flex;
		justify-content: space-between;
		column-gap: 30px;
	}

	.purchase-page__info
	{
		width: 100%;
		min-width: 402px;
	}

	.purchase-page__price
	{
		width: 100%;
		max-width: 362px;
		height: 100%;
	}

	.purchase-page__info-form
	{
		margin-bottom: 0;
	}

	.purchase-page__order-title
	{
		font-size: 17px;
	}

	.purchase-page__order-text
	{
		color: #868799;
		font-size: 12px;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 0;
		a
		{
			font-size: 12px;
		}
	}

	.purchase-page__wr-btn
	{
		.button
		{
			padding: 0 30px;
		}
	}

	.purchase-page__point-wr
	{
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	.purchase-page__wr-desc
	{
		margin-bottom: 0;
	}

	.purchase-page__btn
	{
		padding: 11px 35px;
	}
}

@include mq($wd)
{
	.purchase-page__form-address
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.city-autocomplite
		{
			width: 100%;
			max-width: 500px;
		}
	}

	.purchase-page__adress-title
	{
		white-space: nowrap;
	}

	.purchase-page__form-recipient
	{
		display: flex;
		justify-content: space-between;
	}

	.purchase-page__info-wr
	{
		display: flex;
		justify-content: space-between;
		column-gap: 10px;
		label
		{
			width: 100%;
		}
	}

	.purchase-page__form-address
	{
		margin-bottom: 62px;
	}

	.purchase-page__recipient-info
	{
		width: 100%;
		max-width: 500px;
	}

	.purchase-page__order-title
	{
		font-size: 18px;
	}

	.purchase-page__wr-title
	{
		font-size: 16px;
	}

	.purchase-page__price-title
	{
		font-size: 15px;
		line-height: 18px;
	}
}
</style>
