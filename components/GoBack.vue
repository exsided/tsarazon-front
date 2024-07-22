<template>
	<NuxtLink class="go-back" :to="to">
		<ArrowBottomSvg />
		<slot />
	</NuxtLink>
</template>

<script setup>
import ArrowBottomSvg from '~/assets/svg/arrow-bottom.svg?skipsvgo';

const props = defineProps({
	to:
	{
		type: String,
		default: '/'
	},
});
</script>

<style lang="scss">
	.go-back
	{
		display: flex;
		align-items: center;
		font-family: Ubuntu;
		font-size: 18px;
		font-weight: 500;
		line-height: 25px;
		margin-bottom: 30px;
		@include transition();

		svg
		{
			transform: rotate(90deg);
			margin-right: 14px;
			min-width: 12px;
			width: 12px;
		}

		path
		{
			stroke: $black;
			@include transition();
		}

		&:hover
		{
			color: $orange;
			path { stroke: $orange; }
		}
	}

	@include mq($wd)
	{
		.go-back { font-size: 22px; }
	}
</style>
