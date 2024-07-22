<template>
	<Scrollbar class="custom-scrollbar">
		<slot />
	</Scrollbar>
</template>

<script setup>
import Scrollbar from 'vue3-smooth-scrollbar';
</script>

<style lang="scss">
	.custom-scrollbar
	{
		.scrollbar-track-y
		{
			background-color: #F4F5F7;
			border-radius: 10px;
			width: 6px;
		}
		.scrollbar-thumb-y
		{
			background-color: rgba(44, 44, 44, 0.4);
			border-radius: 10px;
			width: 6px;
		}
	}
</style>
