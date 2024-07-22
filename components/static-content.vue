<template>
	<div
		v-if="content"
		class="staic-content"
		v-html="content"
	/>
	<div v-else class="static-content">
		<slot />
	</div>
</template>

<script setup>
import Swiper, { Navigation } from 'swiper';

const props = defineProps({
	content:
	{
		type: String,
		default: '',
	},
});

onMounted(() =>
{
	const sliders = document.querySelectorAll('.swiper-container');

	sliders.forEach((el) =>
	{
		new Swiper(el, {
			slidesPerView: 1.4,
			spaceBetween: 10,
			loop: true,
			modules: [Navigation],
			loopedSlides: 10,
			breakpoints:
			{
				768:
				{
					spaceBetween: 16,
					slidesPerView: 1,
				},
				1440:
				{
					spaceBetween: 35,
					slidesPerView: 1,
				}
			},
			navigation:
			{
				prevEl: el.querySelector('.static__slider-btn--left'),
				nextEl: el.querySelector('.static__slider-btn--right'),
			},
		});
	});
});
</script>

<style lang="scss">
	@import '~/assets/scss/static.scss';
</style>
