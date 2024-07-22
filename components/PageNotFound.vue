<template>
	<div class="page-not-found">
		<ErrorSvg class="page-not-found__img" />
		<p class="page-not-found__title">
			Страница не найдена
		</p>
		<p class="page-not-found__text">
			Извините, но страница на которую вы хотели попасть не существует
		</p>
		<NuxtLink to="#" class="page-not-found__link button button--blue">
			На главную
		</NuxtLink>
	</div>
</template>

<script setup>
import ErrorSvg from '~/assets/svg/404.svg?skipsvgo';
</script>

<style lang="scss">
.page-not-found
{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 50px 0;
}

.page-not-found__img
{
	margin-bottom:20px;
	width: 100%;
	max-width: 683px;
}

.page-not-found__title
{
	font-size: 26px;
	font-weight: 600;
	margin-bottom: 10px;
	text-align: center;
}

.page-not-found__text
{
	font-size: 14px;
	font-weight: 400;
	margin-bottom: 20px;
	text-align: center;
}

.page-not-found__link
{
	display: flex;
	width: 260px;
	height: 46px;
	justify-content: center;
	align-items: center;
}

@include mq($tablet)
{
	.page-not-found__img
	{
		margin-bottom: 30px;
		padding: 0 20px;
	}

	.page-not-found__title
	{
		font-size: 32px;
	}

}

@include mq($wd)
{
	.page-not-found
	{
		margin: 100px 0;
	}
	.page-not-found__img
	{
		margin-bottom: 40px
	}

	.page-not-found__button
	{
		padding: 23px 85px;
	}
}
</style>
