<template>
	<TitleSection
		title="Рекомендованные товары"
		class="products-slider"
	>
		<div class="swipe-slider">
			<div ref="swiperEl" class="swiper-container swiper">
				<div class="swiper-wrapper">
					<ProductCard
						v-for="slide, i in 12"
						:key="i"
						class="swiper-slide"
					/>
				</div>
			</div>
		</div>
		<div class="products-slider__nav">
			<div ref="prevButton" class="products-slider__nav-btn products-slider__nav-btn--left">
				<ArrowLeftSvg />
			</div>
			<div ref="nextButton" class="products-slider__nav-btn products-slider__nav-btn--right">
				<ArrowRightSvg />
			</div>
		</div>
	</TitleSection>
</template>

<script setup>

import Swiper, { Navigation } from 'swiper';
import TitleSection from '~/components/TitleSection';
import ProductCard from '@/components/Product/Card';

import 'swiper/css';
import 'swiper/css/navigation';

import ArrowLeftSvg from '~/assets/svg/arrow-left.svg?skipsvgo';
import ArrowRightSvg from '~/assets/svg/arrow-right.svg?skipsvgo';

const swiperEl = ref(null);
const prevButton = ref(null);
const nextButton = ref(null);

onMounted(() =>
{
	new Swiper(swiperEl.value,
		{
			slidesPerView: 'auto',
			spaceBetween: 15,
			loop: true,
			loopedSlides: 12 * 2,
			navigation:
		{
			prevEl: prevButton.value,
			nextEl: nextButton.value,
		},
			modules: [Navigation],
			breakpoints:
		{
			768:
			{
				slidesPerView: 'auto',
				spaceBetween: 20,
			},
			1440:
			{
				slidesPerView: 5,
				spaceBetween: 32,
			}
		},
		});
});
</script>

<style lang="scss">
.products-slider
{
	position: relative;
	overflow: hidden;

	.product-card{ width: 130px; }
	.swiper { overflow: visible; }
}

.products-slider__nav{ display: none; }

@include mq($tablet)
{
	.products-slider
	{
		.product-card{width: 210px;}
	}
}

@include mq($wd)
{
	.products-slider
	{
		.container { position: relative; }
		.swiper { overflow: hidden; }
		.product-card{width: 250px;}
	}

	.products-slider__nav{display: block;}

	.products-slider__nav-btn
	{
		position: absolute;
		top: 35%;
		width: 38px;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.1);
		border-radius: 60px;
		z-index: 10;
		cursor: pointer;
		@include transition();

		path { @include transition(); }

		&:hover
		{
			path { stroke: $blue; }
		}
	}

	.products-slider__nav-btn--left{ left: 10px;}
	.products-slider__nav-btn--right{ right: 10px;}
}

@include mq($fullhd)
{
	.products-slider__nav-btn--left{ left: 210px;}
	.products-slider__nav-btn--right{ right: 210px;}
}
</style>
