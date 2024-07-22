<template>
	<div class="goods-return-popup">
		<h3 class="goods-return-popup__title">
			Возврат товара
		</h3>
		<GoodsReturnForm />
	</div>
</template>

<script setup>
import GoodsReturnForm from '~/components/Forms/GoodsReturnForm.vue';
</script>

<style lang="scss">
.popup--GoodsReturn
{
	.popup__content-inner
	{
		padding: 15px 20px 20px;
	}
}

.goods-return-popup
{
	flex: 1;
}
.goods-return-popup__title
{
	font-family: "Ubuntu", sans-serif;
	font-size: 22px;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 20px;
}

@include mq($wd)
{
	.popup--GoodsReturn
	{
		.popup__content-inner
		{
			padding: 20px 30px 30px;
		}
	}
}
</style>
