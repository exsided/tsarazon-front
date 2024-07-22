<template>
	<div class="loader">
		<LoaderSvg class="loader__icon" />
	</div>
</template>

<script setup>
import LoaderSvg from '~/assets/svg/loader.svg?skipsvgo';
</script>

<style lang="scss">
	.loader
	{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loader__icon { animation: rotating 2s linear infinite; }

	@keyframes rotating
	{
		from
		{
			-ms-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to
		{
			-ms-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>
