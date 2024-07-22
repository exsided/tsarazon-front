<template>
	<NuxtLink
		:to="props.slug"
		:style="{backgroundImage: `url(${props.img})`}"
		class="catalog-grid-item"
	>
		<p class="catalog-grid-item__text">
			{{ props.name }}
		</p>
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	name:
	{
		type: String,
		default: '',
	},
	img:
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
	.catalog-grid-item
	{
		aspect-ratio: 34/25;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		border-radius: 10px;
		padding-top: 10px;
		padding-left: 8px;
	}

	.catalog-grid-item__text
	{
		max-width: 60%;
		font-style: normal;
		font-weight: 600;
		font-size: 11px;
		line-height: 15px;
	}

	@include mq($tablet)
	{
		.catalog-grid-item
		{
			aspect-ratio: 170/120;
		}

		.catalog-grid-item__text
		{
			font-size: 13px;
			line-height: 18px;
		}
	}

	@include mq($wd)
	{
		.catalog-grid-item
		{
			aspect-ratio: 252/180;
			padding-top: 20px;
			padding-left: 12px;
			transition: .2s;
			background-size: 100% 100%;
			transition: .6s ease;
			&:hover
			{
				background-size: 110% 110%;
			}
		}

		.catalog-grid-item__text
		{
			max-width: 85%;
			font-size: 18px;
			line-height: 25px;
		}
	}
</style>
