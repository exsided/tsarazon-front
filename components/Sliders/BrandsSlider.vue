<template>
	<TitleSection
		title="Бренды"
		class="brands-slider"
	>
		<div class="swipe-slider">
			<div ref="swiperEl" class="swiper-container swiper">
				<div class="swiper-wrapper">
					<BrandCard
						v-for="slide in slides"
						:key="slide.id"
						:picture="slide.picture"
						:title="slide.title"
						:slug="slide.slug"
						class="swiper-slide"
					/>
				</div>
			</div>
		</div>
		<div class="brands-slider__nav">
			<div ref="prevButton" class="brands-slider__nav-btn brands-slider__nav-btn--left">
				<ArrowLeftSvg />
			</div>
			<div ref="nextButton" class="brands-slider__nav-btn brands-slider__nav-btn--right">
				<ArrowRightSvg />
			</div>
		</div>
	</TitleSection>
</template>

<script setup>
import Swiper, { Navigation } from 'swiper';
import TitleSection from '~/components/TitleSection';
import BrandCard from '~/components/BrandCard.vue';

import ArrowLeftSvg from '~/assets/svg/arrow-left.svg?skipsvgo';
import ArrowRightSvg from '~/assets/svg/arrow-right.svg?skipsvgo';

import 'swiper/css';
import 'swiper/css/navigation';

const props = defineProps({
	slides:
	{
		type: Array,
		default: () => ([]),
	}
});

const swiperEl = ref(null);
const prevButton = ref(null);
const nextButton = ref(null);

onMounted(() =>
{
	new Swiper(swiperEl.value,
		{
			slidesPerView: 'auto',
			spaceBetween: 16,
			loopedSlides: props.slides.length * 2,
			loop: true,
			loopedSlidesLimit: false,
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
					spaceBetween: 20,
				},
				1440:
				{
					slidesPerView: 8,
					spaceBetween: 30,
				}
			},
		});
});
</script>

<style lang="scss">
.brands-slider
{
	overflow: hidden;

	.brand-card { width: 110px; }
	.container { position: relative; }
	.swiper { overflow: visible; }
}

.brands-slider__title
{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
}

.brands-slider__title-text
{
	font-weight: 700;
	font-size: 19px;
	line-height: 22px;
	margin: 0;
}

.brands-slider__title-link
{
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	color: #F69421;
}

.brands-slider__nav {display: none;}

@include mq($tablet)
{
	.brands-slider
	{
		.brand-card { width: 100px; }

		.swiper-slide { width: 110px;}
	}
}

@include mq($wd)
{
	.brands-slider
	{
		.swiper
		{
			overflow: hidden;
			margin: -10px;
			padding: 10px;
		}
		.swiper-slide { width: 146px; }
	}

	.brands-slider__nav {display: block;}

	.brands-slider__nav-btn
	{
		position: absolute;
		top: 50%;
		width: 38px;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.1);
		border-radius: 60px;
		z-index: 3;
		cursor: pointer;
		@include transition();

		path { @include transition(); }

		&:hover
		{
			path { stroke: $blue; }
		}
	}

	.brands-slider__nav-btn--left{ left: 10px;}
	.brands-slider__nav-btn--right{ right: 10px;}
}

@include mq($fullhd)
{
	.brands-slider__nav-btn--left{ left: 210px;}
	.brands-slider__nav-btn--right{ right: 210px;}
}
</style>
