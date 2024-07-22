<template>
	<div class="cart-empty">
		<div class="cart-empty__img">
			<EmptyCartSvg />
		</div>
		<p class="cart-empty__title">
			Ваша корзина пуста
		</p>
		<p class="cart-empty__text">
			Ознакомьтесь с предложениями поставщиков в каталоге
		</p>
		<button class="cart-empty__btn button button--blue">
			Перейти в каталог
		</button>
	</div>
</template>

<script setup>
import EmptyCartSvg from '~/assets/svg/empty-basket.svg?skipsvgo';
</script>

<style lang="scss">
.cart-empty
{
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
	margin-bottom: 100px;
}

.cart-empty__img
{
	margin-bottom: 10px;
}

.cart-empty__title
{
	color: #2C2C2C;
	text-align: center;
	font-size: 18px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 10px;
}

.cart-empty__text
{
	color: #2C2C2C;
	text-align: center;
	font-size: 14px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 20px;
}
</style>
