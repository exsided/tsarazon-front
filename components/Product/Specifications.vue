<template>
	<div id="properties" class="product-specification">
		<h3 class="product-specification__title">
			Характеристики
		</h3>
		<div class="product-specification__wr" :class="{ show: showMore }">
			<ul class="product-specification__list product-specification__inner">
				<li
					v-for="property, i in properties"
					:key="i"
					class="product-specification__item"
				>
					<p class="product-specification__item-text">
						{{ property.title }}
					</p>
					<p class="product-specification__item-text">
						{{ property.value }}
					</p>
				</li>
				<li v-if="brand && brand.title && brand.slug" class="product-specification__item">
					<p class="product-specification__item-text">
						Бренд
					</p>
					<NuxtLink
						class="product-specification__item-text product-specification__item-link"
						:to="`/catalog/brands/${brand.slug}`"
					>
						{{ brand.title }}
					</NuxtLink>
				</li>
			</ul>
		</div>
		<div
			v-if="canShowMore"
			class="product-specification__show-more-btn"
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
defineProps({
	properties:
	{
		type: Array,
		default: () => ([]),
	},
	brand:
	{
		type: Object,
		default: () => ({ title: '', slug: '' })
	}
});

const canShowMore = ref(false);
const showMore = ref(false);

const checkShowMore = () =>
{
	const inner = document.querySelector('.product-specification__inner');

	const breapoints =
	[
		{
			screen: 1440,
			height: 175,
		},
		{
			screen: 768,
			height: 175,
		},
		{
			screen: 320,
			height: 175,
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
.product-specification__title{
	color: #000;
	font-size: 19px;
	font-family: "Ubuntu", sans-serif;
	font-weight: 700;
	line-height: 22px;
	margin-bottom: 20px;
}

.product-specification__item
{
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.product-specification__item-text
{
	font-size: 14px;
	font-weight: 400;
	line-height: 19px;
	color:#2C2C2C;
	margin-bottom: 10px;
}

.product-specification__item-link
{
	color: #3772FE;
	cursor: pointer;
}

.product-specification__show-more-btn
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

.product-specification__wr
{
	max-height: 175px;
	overflow: hidden;

	&.show
	{
		max-height: unset;
	}
}

@include mq($tablet)
{
	.product-specification__list
	{
		width: 457px;
	}
}

@include mq($tablet)
{
	.product-specification__list
	{
		width: 577px;
	}

	.product-specification__title
	{
		font-size: 32px;
		line-height: 37px;
	}
}
</style>
