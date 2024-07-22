<template>
	<div id="description" class="product-description">
		<h3 class="product-description__title">
			Описание
		</h3>
		<div class="product-description__wr" :class="{ show: showMore }">
			<div class="product-description__inner" v-html="content" />
		</div>
		<div
			v-if="canShowMore"
			class="product-description__show-more-btn"
			@click="toggleShowMore"
		>
			<template v-if="showMore">
				Скрыть
			</template>
			<template v-else>
				Показать полностью
			</template>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	content:
	{
		type: String,
		default: '',
	}
});
const canShowMore = ref(false);
const showMore    = ref(false);

const checkShowMore = () =>
{
	const inner = document.querySelector('.product-description__inner');

	const breapoints =
	[
		{
			screen: 1440,
			height: 300,
		},
		{
			screen: 768,
			height: 250,
		},
		{
			screen: 320,
			height: 200,
		},
	];

	for (const point of breapoints)
	{
		if (window.innerWidth >= point.screen)
		{
			canShowMore.value = inner.offsetHeight > point.height;
			break;
		}
	}
};

const toggleShowMore = () => showMore.value = !showMore.value;

onMounted(() =>
{
	checkShowMore();
	window.addEventListener('resize', checkShowMore);
});
onBeforeUnmount(() => window.removeEventListener('resize', checkShowMore));
</script>

<style lang="scss">
.product-description
{
	h4
	{
		color: #2C2C2C;
		font-size: 14px;
		font-weight: 600;
		line-height: 22px;
		letter-spacing: 0;
	}

	ul
	{
		margin-bottom: 16px;
		margin-left: 22px;
		list-style-type: disc;
	}

	p, li
	{
		color: #2C2C2C;
		font-size: 11px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		line-height: 15px;
	}
}
.product-description__title
{
	color: #2C2C2C;
	font-size: 19px;
	font-family: "Ubuntu", sans-serif;
	font-style: normal;
	font-weight: 700;
	line-height: 22px;
	margin-bottom: 10px;
}

.product-description__show-more-btn
{
	font-size: 14px;
	font-weight: 400;
	line-height: 22px;
	color: #F69421;
	line-height: 22px;
	cursor: pointer;
	width: fit-content;
	user-select: none;
}

.product-description__wr
{
	max-height: 200px;
	overflow: hidden;

	&.show
	{
		max-height: unset;
	}
}

@include mq($tablet)
{
	.product-description
	{
		p, li
		{
			font-size: 12px;
			line-height: 17px;
		}
	}
	.product-description__title
	{
		font-size: 26px;
		line-height: 30px;
	}

	.product-description__wr { max-height: 250px; }
}

@include mq($wd)
{
	.product-description
	{
		h4
		{
			font-size: 16px;
			line-height: 22px;
		}

		p, li
		{
			font-size: 14px;
			line-height: 19px;
		}
	}
	.product-description__title
	{
		font-size: 32px;
		line-height: 37px;
	}

	.product-description__show-more-btn { font-size: 16px; }

	.product-description__wr { max-height: 300px; }
}
</style>
