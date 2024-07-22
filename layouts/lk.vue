<template>
	<div class="layout lk-layout">
		<HeaderVue />
		<main class="main">
			<div class="container">
				<slot name="page-top" />
			</div>
			<div class="lk__wr container">
				<MenuVue />
				<slot name="page" />
			</div>
			<slot name="page-bottom" />
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
import MenuVue from '~/components/LK/Menu.vue';
import MainLoader from '~/components/MainLoader.vue';

import LayoutMixin from '~/mixins/layout.js';

export default {
	name: 'LkLayout',
	components:
		{
			HeaderVue,
			FooterVue,
			PopupVue,
			MenuVue,
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
.lk__wr
{
	display: flex;
	column-gap: 100px;
	margin-bottom: 50px;

	.container { padding: 0; }
}

@include mq($tablet)
{
	.lk__wr
	{
		margin-bottom: 60px;
	}
}

@include mq($wd)
{
	.lk__wr
	{
		margin-bottom: 80px;
	}
}
</style>
