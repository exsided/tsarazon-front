<template>
	<div class="counter">
		<div class="counter__action" @click="decrement">
			<MinusButton />
		</div>
		<p class="counter__amount">
			{{ foramttedCount }}
			<slot />
		</p>
		<div class="counter__action" @click="increment">
			<PlusButton />
		</div>
	</div>
</template>

<script setup>
import { NUMBER_FORMATTER } from '~/helpers/formatters.js';
import MinusButton from '~/public/svg/counter-minus.svg?skipsvgo';
import PlusButton from '~/public/svg/counter-plus.svg?skipsvgo';

const emit = defineEmits(['update:model-value']);

const props = defineProps({
	modelValue:
	{
		type: Number,
		default: 0,
	},
	step:
	{
		type: Number,
		default: 1,
	},
	max:
	{
		type: [Number, Boolean],
		default: false,
	},
	min:
	{
		type: [Number, Boolean],
		default: false,
	},
});

const increment = () =>
{
	const newVal = props.modelValue + props.step;

	if (props.max !== false && newVal >= props.max)
		return;

	emitUpdate(newVal);
};
const decrement = () =>
{
	const newVal = props.modelValue - props.step;

	if (props.min !== false && newVal <= props.min)
		return;

	emitUpdate(newVal);
};

const emitUpdate = val => emit('update:model-value', val);

const foramttedCount = computed(() => NUMBER_FORMATTER(props.modelValue));
</script>

<style lang="scss">
	.counter
	{
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.counter__action
	{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		background-color: $white;
		padding: 11px;
		max-height: 36px;
		cursor: pointer;
		box-shadow: 0px 4px 14px 0px rgba(93, 95, 107, 0.10);
		@include transition();

		&:hover
		{
			path { stroke: $blue; }
		}
	}

	.counter__amount
	{
		font-size: 16px;
		margin-bottom: 0;
		span
		{
			font-size: 12px;
			line-height: 16px;
		}
	}

	.counter__cost
	{
		display: flex;
		align-items: flex-end;
		font-size: 18px;
		line-height: 18px;
		font-weight: 600;
		span
		{
			font-size: 12px;
			line-height: 12px;
			display: inline-block;
			margin-left: 2px;
			&::first-letter
			{
				font-family: system-ui;
			}
		}
	}
</style>
