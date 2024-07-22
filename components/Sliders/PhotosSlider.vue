<template>
	<div class="photos-slider">
		<section class="photos-slider__big swiper-slider">
			<div ref="swiperBig" class="swiper-container swiper">
				<div class="swiper-wrapper">
					<div
						v-for="slide, i in showedSlides"
						:key="i"
						class="photos-slider__big-slide swiper-slide"
					>
						<img class="photos-slider__big-img" :src="slide">
					</div>
				</div>
			</div>
			<div class="photos-slider__big-nav">
				<button class="photos-slider__big-nav-btn" @click="slidePrev">
					<ArrowLeftSvg />
				</button>
				<button class="photos-slider__big-nav-btn" @click="slideNext">
					<ArrowRightSvg />
				</button>
			</div>
		</section>
		<section class="photos-slider__small swiper-slider">
			<div ref="swiperSmall" class="swiper-container swiper">
				<div class="swiper-wrapper">
					<div
						v-for="slide, i in showedSlides"
						:key="i"
						class="photos-slider__small-slide swiper-slide"
					>
						<img class="photos-slider__small-img" :src="slide">
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swiper, { Navigation, Thumbs } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import ArrowLeftSvg from '~/assets/svg/arrow-left.svg?skipsvgo';
import ArrowRightSvg from '~/assets/svg/arrow-right.svg?skipsvgo';

const swiperBig = ref(null);
const swiperSmall = ref(null);

const props = defineProps({
	slides:
	{
		type: Array,
		default: () =>
			[
				'/img/product-1.png',
				'/img/product-2.png',
				'/img/product-3.png',
				'/img/product-1.png',
				'/img/product-2.png',
				'/img/product-3.png',
				'/img/product-1.png',
				'/img/product-2.png',
				'/img/product-3.png',
				'/img/product-3.png',
				'/img/product-3.png',
			],
	},
});

const showedSlides = computed(() =>
{
	const arr = props.slides;
	const max = arr.length;
	let idx   = 0;

	if (arr.length < 2)
		return arr;

	while (arr.length < 6)
	{
		arr.push(arr[idx]);

		if (idx + 1 > max)
			idx = 0;
		else
			idx++;
	}

	return arr;
});

onMounted(() =>
{
	const smallSliderInstance = new Swiper(swiperSmall.value, {
		slidesPerView: 4.4,
		spaceBetween: 4,
		loop: true,
		loopedSlides: showedSlides.length * 2,
		modules: [Navigation],
		breakpoints:
		{
			768:
			{
				slidesPerView: 5.6
			},
		}
	});
	new Swiper(swiperBig.value, {
		slidesPerView: 1,
		loop: true,
		modules: [Navigation, Thumbs],
		thumbs:
		{
			swiper: smallSliderInstance
		}
	});
});

const slidePrev = () => swiperBig.value.swiper.slidePrev();
const slideNext = () => swiperBig.value.swiper.slideNext();
</script>

<style lang="scss">

.photos-slider__big
{
	position: relative;
	margin-bottom: 16px;
	border-radius: 10px;
	overflow: hidden;
	background: linear-gradient(-90deg, rgba(93, 95, 107, 0.30) 0%, rgba(217, 217, 217, 0.00) 120%);
}

.photos-slider__big-slide
{
	height: auto;
	aspect-ratio: 29 / 19;
}

.photos-slider__big-img
{
	width: 100%;
	height: 100%;
	border-radius: 10px;
	display: block;
	object-fit: contain;
}

.photos-slider__small
{
	min-height: 42px;
}

.photos-slider__small-slide
{
	width: 64px;
	overflow: hidden;
	aspect-ratio: 56 / 37;
	border-radius: 4px;
	background: linear-gradient(-90deg, rgba(93, 95, 107, 0.30) 0%, rgba(217, 217, 217, 0.00) 120%);

	img
	{
		overflow: hidden;
		border-radius: 4px;
		border: 1px solid transparent;
	}

	@include transition();

	&.swiper-slide-thumb-active:not(.swiper-slide-duplicate-active):not(.swiper-slide-duplicate-next) img
	{
		border-color: $blue;
	}
}

.photos-slider__small-img
{
	display: block;
	height: 100%;
	width: 100%;
	object-fit: contain;
}

.photos-slider__big-nav
{
	display: flex;
	gap: 10px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	z-index: 1;
}

.photos-slider__big-nav-btn
{
	width: 38px;
	height: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.4);
	box-shadow: 0px 0px 10px rgba(93, 95, 107, 0.1);
	border: none;
	border-radius: 50%;
	cursor: pointer;
	@include transition();
	path
	{
		@include transition();
		stroke: #FFFFFF;
	}

	&:hover
	{
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(93, 95, 107, 0.1);

		path { stroke: #868799; }
	}
}
</style>
