<template>
	<transition name="fade">
		<div v-if="showLoader" class="main-preloader">
			<LoaderVue />
		</div>
	</transition>
</template>

<script setup>
import LoaderVue from '~/components/Loader.vue';

import { useMainStore } from '~/store';

const mainStore = useMainStore();

const showLoader = computed(() => !!mainStore.loadingUids.length);
</script>

<style lang="scss">
	.main-preloader
	{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #2C2C2C80;
		z-index: 1000;
	}
</style>
