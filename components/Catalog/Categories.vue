<template>
	<div
		:class="{'visible': isVisible}"
		class="categories _categories"
	>
		<template v-if="withLinks">
			<NuxtLink
				v-for="item, i in items"
				:key="i"
				:to="`${basePath}/${item.slug}`"
				:class="{'hidden': !item.visible && !showAll}"
				class="categories__link _categories__link"
			>
				{{ item.title }}
			</NuxtLink>
		</template>
		<template v-else>
			<button
				v-for="item, i in items"
				:key="i"
				:to="`${basePath}/${item.slug}`"
				:class="{
					'hidden': !item.visible && !showAll,
					'active': item.slug === modelValue
				}"
				class="categories__link _categories__link"
				@click="selectCategory(item.slug)"
			>
				{{ item.title }}
			</button>
		</template>
		<div
			class="categories__link categories__show-more _categories__show-more"
			@click="toggleShowAll"
		>
			<template v-if="showAll">
				Свернуть
			</template>
			<template v-else>
				Показать все
			</template>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(['update:model-value']);
const props = defineProps({
	items:
	{
		type: Array,
		default: () => [],
	},
	basePath:
	{
		type: String,
		default: () => ''
	},
	withLinks:
	{
		type: Boolean,
		default: false,
	},
	modelValue:
	{
		type: String,
		default: null,
	}
});

const items = reactive(props.items.map(el => ({ ...el, visible: false })));

const showAll = ref(false);
const isVisible = ref(false);
const timeout = ref(null);

const toggleShowAll = () => showAll.value = !showAll.value;

const addResizeHandler = () => addEventListener('resize', () => resizeHandler());

const resizeHandler = async () =>
{
	if (window.innerWidth >= 1440)
		return;

	for (const idx in items)
		items[idx].visible = true;

	await nextTick();
	clearTimeout(timeout.value);
	timeout.value = setTimeout(() =>
	{
		const domItems = document.querySelectorAll('._categories__link');
		const wrapper = document.querySelector('._categories');
		const showMoreBtn = document.querySelector('._categories__show-more');
		const gap = +window.getComputedStyle(wrapper, null).getPropertyValue('gap').replace(/[^0-9]/g, '');

		let freeWidth = wrapper.offsetWidth;

		domItems.forEach((el, i) =>
		{
			freeWidth = freeWidth - el.offsetWidth - gap;

			if (freeWidth <= showMoreBtn.offsetWidth + gap)
				items[i].visible = false;
		});
	}, 300);
};

const selectCategory = code => emit('update:model-value', code === props.modelValue ? '' : code);

onMounted(() =>
{
	resizeHandler();
	addResizeHandler();
	isVisible.value = true;
});
</script>

<style lang="scss">
.categories
{
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 4px;
	opacity: 0;
	@include transition();

	&.visible { opacity: 1; }
}

.categories__link
{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px 8px;
	background-color: #FFFFFF;
	box-shadow: 0px 0px 14px rgba(93, 95, 107, 0.1);
	border-radius: 10px;
	font-weight: 400;
	font-size: 11px;
	line-height: 16px;
	letter-spacing: -0.01em;
	color: #515560;
	cursor: pointer;
	border: unset;
	@include transition();

	&:hover
	{
		color: #ffffff;
		background-color: #3772FE;
	}

	&.active
	{
		color: #ffffff;
		background-color: #3772FE;
	}
}
.categories__show-more { display: none;}

@include mq(0, $wd - 1px)
{
	.categories__link
	{
		&.hidden { display: none; }
	}
	.categories__show-more { display: block;}
}

@include mq($tablet)
{
	.categories
	{
		margin-bottom: 30px;
		gap: 10px;
	}

	.categories__link
	{
		padding: 8px 12px;
		font-size: 12px;
		line-height: 18px;
	}
}

@include mq($wd)
{
	.categories__link
	{
		padding: 12px 25px;
		font-size: 16px;
		line-height: 24px;
	}
}
</style>
