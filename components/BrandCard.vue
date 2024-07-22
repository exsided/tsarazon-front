<template>
	<NuxtLink class="brand-card" :to="`/catalog/brands/${slug}`">
		<img class="brand-card__img" :src="picture">
		<p class="brand-card__text">
			{{ title }}
		</p>
	</NuxtLink>
</template>

<script setup>
defineProps({
	picture:
	{
		type: String,
		default: '',
	},
	title:
	{
		type: String,
		default: '',
	},
	slug:
	{
		type: String,
		default: '',
	},
});
</script>

<style lang="scss">
.brand-card__img
{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-bottom: 6px;
}

.brand-card__text
{
	font-weight: 600;
	font-size: 13px;
	line-height: 18px;
	text-align: center;
}

@include mq($desktop)
{
	.brand-card__text
	{
		font-size: 16px;
		line-height: 22px;
	}
}

@include mq($wd)
{
	.brand-card
	{
		@include transition();

		&:hover
		{
			transform: translateY(-5px);
		}
	}
}
</style>
