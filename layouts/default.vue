<template>
	<div class="layout">
		<HeaderVue />
		<main class="main">
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
import MainLoader from '@/components/MainLoader.vue';

import LayoutMixin from '~/mixins/layout.js';

export default {
	name: 'DefaultLayout',
	components:
		{
			HeaderVue,
			FooterVue,
			PopupVue,
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
