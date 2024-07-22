<template>
	<div class="layout slk-import">
		<HeaderVue />
		<main class="main">
			<SlkMenu />
			<slot />
		</main>
		<FooterVue />
		<PopupVue />
		<MainLoader />
	</div>
</template>

<script>
import HeaderVue from '@/components/Header/index.vue';
import FooterVue from '@/components/Footer.vue';
import PopupVue from '@/components/Popups/index.vue';
import SlkMenu from '@/components/Slk/Menu.vue';
import MainLoader from '@/components/MainLoader.vue';

import LayoutMixin from '~/mixins/layout.js';

export default {
	name: 'SlkLayout',
	components:
		{
			HeaderVue,
			FooterVue,
			PopupVue,
			SlkMenu,
			MainLoader,
		},
	mixins: [LayoutMixin],
	setup()
	{
		return {
			...LayoutMixin.setup(),
		};
	}
};
</script>

<style lang="scss">
</style>
