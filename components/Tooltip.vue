<template>
	<TippyVue
		class="tooltip"
		:flip-duration="0.3"
		interactive
		:arrow="withArrow && arrow"
		:append-to="body"
		theme="light"
		:animate-fill="false"
		:offset="offset"
		:placement="placement"
	>
		<div class="tooltip__trigger">
			<slot name="trigger" />
		</div>

		<template #content>
			<div class="tooltip__content">
				<slot name="content" />
			</div>
		</template>
	</TippyVue>
</template>

<script setup>
import { Tippy as TippyVue } from 'vue-tippy';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/svg-arrow.css';

const arrow = '<svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0L17.6603 8.25H0.339746L9 0Z" fill="white"/></svg>';

const body = ref(null);
const props = defineProps({
	placement:
	{
		type: String,
		default: 'auto',
	},
	offset:
	{
		type: Array,
		default: () => [0, 10],
	},
	withArrow:
	{
		type: Boolean,
		default: true,
	}
});

onMounted(() => body.value = () => document.body);
</script>

<style lang="scss">

	.tooltip
	{
		width: fit-content;
		display: inline-block;
	}

	.tippy-box[data-placement^=top]>.tippy-svg-arrow>svg{top:14px}
	.tippy-box[data-placement^=bottom]>.tippy-svg-arrow>svg{bottom:14px}

	.tooltip__trigger
	{
		width: fit-content;
		cursor: pointer;
	}

	.tippy-box
	{
		border-radius: 10px;
	}

	.tooltip__content
	{
		color: #868799;
		text-align: center;
		font-size: 11px;
		line-height: 13px;
		font-family: Helvetica;
		padding: 10px 14px;
	}
</style>
