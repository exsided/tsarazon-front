<template>
	<NuxtLayout name="default">
		<div class="container">
			<UiBreadcrumbs :items="breadcrumbs" />
			<h1 class="cart-title">
				{{ title }}
			</h1>
			<div v-if="orders.length" class="cart__content">
				<div class="cart__order">
					<CartOrder
						v-for="order in orders"
						:id="order.id"
						:key="order.id"
						:active="order.active"
						:current-order-amount="order.currentOrderAmount"
						:minimum-order-amount="order.minimumOrderAmount"
						:supplier="order.supplier"
						:products="order.products"
						:price-percent="order.pricePercent"
						:can-make-order="order.canMakeOrder"
						:required-amount="order.requiredAmount"
						@go-to-checkout="goToCheckout(order.id)"
					/>
				</div>
				<div class="cart__order-info">
					<OrderInfo
						v-for="order in orders"
						:id="order.id"
						:key="order.id"
						:current-order-amount="order.currentOrderAmount"
						:minimum-order-amount="order.minimumOrderAmount"
						:price-percent="order.pricePercent"
						:can-make-order="order.canMakeOrder"
						:required-amount="order.requiredAmount"
						@go-to-checkout="goToCheckout(order.id)"
					/>
				</div>
			</div>
			<CartEmpty v-else />
		</div>
		<ProductsSlider />
		<ProductsSlider />
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import CartOrder from '~/components/Cart/Order.vue';
import OrderInfo from '~/components/Cart/OrderInfo.vue';
import CartEmpty from '~/components/Cart/Empty.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider.vue';

import { useCartStore, useMainStore } from '~/store';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Корзина', link: '/cart' }];
const title = 'Корзина';

const router = useRouter();

const cartStore = useCartStore();
const mainStore = useMainStore();

const instance = getCurrentInstance();

const orders = computed(() => cartStore.orders);

const goToCheckout = async (cartId) =>
{
	cartStore.cartIdForMakeOrder = cartId;

	await nextTick();

	router.push('/purchase');
};

watchEffect(() => mainStore[cartStore.fetching ? 'enableLoading' : 'disableLoading'](instance.uid));

await cartStore.fetch();

useHead({ title: 'Корзина' });
</script>

<style lang="scss">
.cart-title
{
	margin-bottom: 20px;
}
@include mq($wd)
{

	.cart-title
	{
		margin-bottom: 30px;
	}

	.cart__content
	{
		display: flex;
		column-gap: 70px;
	}

	.cart__order
	{
		width: 100%;
		max-width: 948px;
	}

	.cart__order-info
    {
		height: 100%;
		width: 100%;
		max-width: 362px;
		padding: 26px 20px;
		border-radius: 10px;
		background: #F4F5F7;
	}
}
</style>
