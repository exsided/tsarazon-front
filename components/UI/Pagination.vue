<template>
	<div v-if="totalPages > 1" class="ui-pagination">
		<button
			v-if="!isInFirstPage"
			class="ui-pagination__link"
			@click="gotoPrevious()"
		>
			Назад
		</button>

		<template v-if="showDots('left')">
			<button
				class="ui-pagination__link"
				@click="gotoPageNumber(1)"
			>
				1
			</button>

			<div class="ui-pagination__dots">
				...
			</div>
		</template>

		<button
			v-for="page, index in pages"
			:key="index"
			:class="{'active': currentPage === page}"
			class="ui-pagination__link"
			@click="gotoPageNumber(page)"
		>
			{{ page }}
		</button>

		<template v-if="showDots('right')">
			<div class="ui-pagination__dots">
				...
			</div>

			<button
				class="ui-pagination__link"
				@click="gotoPageNumber(totalPages)"
			>
				{{ totalPages }}
			</button>
		</template>

		<button
			v-if="!isInLastPage"
			class="ui-pagination__link"
			@click="gotoNext()"
		>
			Вперед
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	currentPage:
	{
		type: Number,
		default: 1,
	},
	perPage:
	{
		type: Number,
		default: 10,
	},
	total:
	{
		type: Number,
		default: 600,
	},
	totalPages:
	{
		type: Number,
		default: 60,
	},
	maxVisibleButtons:
	{
		type: Number,
		default: 5,
	}
});

const emit = defineEmits(['change', 'update:current-page']);

const isInFirstPage = computed(() => props.currentPage === 1);

const isInLastPage = computed(() => props.currentPage === props.totalPages);

const pages = computed(() =>
{
	const range = [];

	for (let i = startPage.value; i <= endPage.value; i += 1)
		range.push(i);

	return range.filter(el => el > 0);
});

const startPage = computed(() =>
{
	if (props.currentPage === 1)
		return 1;

	if (props.currentPage === props.totalPages)
		return props.totalPages - props.maxVisibleButtons + 1;

	return props.currentPage - 1;
});

const endPage = computed(() => Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages));

const showDots = (position = 'left') =>
{
	const number = position === 'left' ? 1 : props.totalPages;
	const nextNumber = position === 'left' ? 2 : props.totalPages - 1;

	return !pages.value.includes(number) || !pages.value.includes(nextNumber);
};

const gotoPrevious = () => gotoPageNumber(props.currentPage - 1);

const gotoNext = () => gotoPageNumber(props.currentPage + 1);

const gotoPageNumber = (pageNumber) =>
{
	emit('update:current-page', pageNumber);
	emit('change', pageNumber);
};
</script>

<style lang="scss">
.ui-pagination
{
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 48px;
	column-gap: 18px;
}

.ui-pagination__link
{
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: #868799;
	cursor: pointer;
	border: unset;

	@include transition();

	@include hover() { color: $blue; }

	&.active{color: #2C2C2C;}
}

.ui-pagination__dots
{
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: #868799;
}

@include mq($wd)
{
	.ui-pagination__link
	{
		font-size: 16px;
		line-height: 22px;
	}

	.ui-pagination__dots
	{
		font-size: 16px;
		line-height: 22px;
	}
}
</style>
