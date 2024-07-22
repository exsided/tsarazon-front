<template>
	<button
		v-if="show"
		:class="{'scroll-top--show': show}"
		class="scroll-top"
		@click="scrollTop"
	>
		<ArrowTopSvg />
	</button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ArrowTopSvg from '~/assets/svg/arrow-right.svg?skipsvgo';
const show = ref(false);

const scrollHandler = () =>
{
	show.value = window.scrollY > window.innerHeight;
};

const addListener = () =>
{
	window.addEventListener('scroll', scrollHandler);
	window.addEventListener('resize', scrollHandler);
};

const removeListener = () =>
{
	window.removeEventListener('scroll', scrollHandler);
	window.removeEventListener('resize', scrollHandler);
};

const scrollTop = () =>
{
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

onMounted(() =>
{
	scrollHandler();
	addListener();
});

onUnmounted(() =>
{
	removeListener();
});
</script>

<style lang="scss">
.scroll-top
{
	display: none;
}

@include mq($tablet){
	.scroll-top
	{
		position: fixed;
		z-index: 8;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 20px;
		right: 19px;
		opacity: 0;
		visibility: hidden;
		@include transition();
		background-color: $white;
		border-radius: 50%;
		width: 35px;
		height: 35px;
		text-align: center;
		border: unset;
		transform: scale(0) translateY(100px);
		svg
		{
			transform: rotate(-90deg);

			path { stroke: #868799; }
		}

		&--show
		{
			transform: scale(1);
			opacity: 1;
			visibility: visible;
		}
		&:hover
		{
			transform: scale(1.1) translateY(0);
			path { stroke: $blue; }
		}
		&:active { transform: scale(0.9) translateY(0); }
	}
}
</style>
