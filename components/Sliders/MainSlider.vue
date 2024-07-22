<template>
	<div class="container">
		<section class="main-slider swiper-slider">
			<div ref="swiperEl" class="swiper-container swiper">
				<div class="swiper-wrapper">
					<div
						v-for="slide, i in [1,2,3,4,5]"
						:key="i"
						class="main-slider__slide swiper-slide"
					>
						<img class="main-slider__slide-img" src="~/assets/img/slide1.png" alt="">
						<div class="main-slider__slide-content">
							<p class="main-slider__slide-title">
								Открывай Летний сезон вместе с нами
							</p>
							<div class="main-slider__slide-action">
								<NuxtLink to="#" class="button button--blue main-slider__slide-link">
									К товарам
								</NuxtLink>

								<div class="main-slider__slide-nav">
									<div class="main-slider__slide-nav-btn main-slider__slide-nav-btn--left">
										<ArrowLeftSvg @click="slidePrev" />
									</div>
									<div class="main-slider__slide-nav-btn main-slider__slide-nav-btn--right">
										<ArrowRightSvg @click="slideNext" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="main-slider__nav-btn main-slider__nav-btn--left" @click="slidePrev">
				<ArrowLeftSvg />
			</div>
			<div class="main-slider__nav-btn main-slider__nav-btn--right" @click="slideNext">
				<ArrowRightSvg />
			</div>
			<div ref="pagination" class="swiper-pagination" />
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ArrowLeftSvg from '~/assets/svg/arrow-left.svg?skipsvgo';
import ArrowRightSvg from '~/assets/svg/arrow-right.svg?skipsvgo';

const swiperEl = ref(null);
const pagination = ref(null);

onMounted(() =>
{
	new Swiper(swiperEl.value,
		{
			slidesPerView: 1,
			loop: true,
			pagination:
			{
				el: pagination.value,
				clickable: true,
			},
			autoplay:
			{
				delay: 2500,
				disableOnInteraction: false,
			},
			modules: [Autoplay, Navigation, Pagination],
		});
});

const slidePrev = () => swiperEl.value.swiper.slidePrev();
const slideNext = () => swiperEl.value.swiper.slideNext();
</script>

<style lang="scss">
.main-slider
{
	margin-bottom: 40px;
	.swiper-pagination
	{
		display: none;
	}
}

.main-slider__slide-img{width: 100%;}

.main-slider__slide-title
{
	font-family: "Ubuntu", sans-serif;
	font-style: normal;
	font-weight: 700;
	font-size: 19px;
	line-height: 24px;
	color: #2C2C2C;
	margin-bottom: 14px;
}

.main-slider__slide-action
{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.main-slider__slide-link
{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 9px 30px;
	width: 100%;
	max-width: 137px;
	background: #3772FE;
	border-radius: 10px;

	font-weight: 600;
	font-size: 15px;
	line-height: 20px;
	letter-spacing: -0.01em;
	color: #FFFFFF;
}

.main-slider__slide-nav
{
	display: flex;
	align-items: center;
	column-gap: 10px;
}

.main-slider__slide-nav-btn
{
	width: 38px;
	height: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.4);
	box-shadow: 0px 0px 10px rgba(93, 95, 107, 0.1);
	border-radius: 60px;
	cursor: pointer;
}

.main-slider__nav-btn{display: none;}

@include mq($tablet)
{
	.main-slider__slide-nav-btn
	{
		path{stroke: #FFFFFF;}
	}

	.main-slider__slide{position: relative;}

	.main-slider__slide-content
	{
		position: absolute;
		z-index: 100;
		top: 50%;
		transform: translateY(-50%);
		left: 40px;
		width: 263px;
	}

	.main-slider__slide-title
	{
		max-width: 213px;
		font-size: 28px;
		line-height: 36px;
		color: #FFFFFF;
		margin-bottom: 20px;
	}

	.main-slider__slide-link
	{
		background: #FFFFFF;
		color: #535260;;
	}
}

@include mq($wd)
{
	.main-slider
	{
		position: relative;

		.swiper-pagination
		{
			display: block;
			position: static;
			.swiper-pagination-bullet
			{
				width: 20px;
				height: 6px;
				background: $gray;
				border-radius: 6px;
				@include transition();
			}
			.swiper-pagination-bullet-active{
				width: 36px;
				height: 6px;
				background: #3772FE;
				border-radius: 6px;
			}
		}
	}

	.main-slider__slide-nav{display: none;}

	.main-slider__nav-btn
	{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 46px;
		height: 46px;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 60px;
		path{stroke: #FFFFFF;}
		position: absolute;
		z-index: 2;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		@include transition();

		path { @include transition(); }

		&:hover
		{
			background-color: #FFFFFF;
			box-shadow: 0px 0px 10px rgba(93, 95, 107, 0.1);

			path { stroke: #868799; }
		}
	}

	.main-slider__nav-btn--left{left: 20px;}

	.main-slider__nav-btn--right{right: 20px;}

	.main-slider__slide-content
	{
		top: 120px;
		transform: unset;
		left: 140px;
		width: 380px;
	}

	.main-slider__slide-title
	{
		font-size: 50px;
		line-height: 56px;
		color: #FFFFFF;
		margin-bottom: 30px;
		max-width: 380px;
	}

	.main-slider__slide-link
	{
		padding: 9px 50px;
		height: 46px;
		width: 100%;
		max-width: 193px;
		background: #ffffff;
		font-size: 18px;
		line-height: 27px;
	}
}
</style>
