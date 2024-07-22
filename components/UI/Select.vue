<template>
	<div
		:class="{
			'select--open': isOpen,
			'select--scroll': showScroll,
		}"
		class="select"
		@click="toggleOpen"
	>
		<div class="select__label">
			<p class="select__label-text">
				{{ modelValue.name || placeholder }}
			</p>
			<DownArrowSvg class="select__label-arrow" />
		</div>
		<Transition name="select__options">
			<ul
				v-if="isOpen"
				v-click-outside="close"
				class="select__options"
			>
				<li
					v-if="!disabledDefault"
					title="не выбрано"
					class="select__option"
					@click="change({ name: '', code: '' })"
				>
					не выбрано
				</li>
				<li
					v-for="option in options"
					:key="option.code"
					:title="option.name"
					:class="{'select__option--active': option.code === modelValue.code}"
					class="select__option"
					@click="change(option)"
				>
					{{ option.name }}
				</li>
			</ul>
		</Transition>
	</div>
</template>

<script setup>
import DownArrowSvg from '~/assets/svg/arrow-bottom.svg?skipsvgo';

const props = defineProps({
	modelValue:
	{
		type: Object,
		default: () => ({ name: '', code: '' })
	},
	options:
	{
		type: Array,
		default: () => []
	},
	placeholder:
	{
		type: String,
		default: '',
	},
	disabledDefault:
	{
		type: Boolean,
		default: true
	}
});

const emit = defineEmits(['update:model-value']);

const isOpen = ref(false);
const showScroll = ref(false);
let timeout;

const change = (option) =>
{
	if (option.code !== props.modelValue.code)
		emit('update:model-value', option);
};

const toggleOpen = () => isOpen.value ? close() : open();

const close = () =>
{
	clearTimeout(timeout);
	isOpen.value = false;
	showScroll.value = false;
};

const open = () =>
{
	isOpen.value = true;
	timeout = setTimeout(() => (showScroll.value = true), 300);
};
</script>

<style lang="scss">
	.select
	{
		position: relative;
		min-width: 200px;
		&--open
		{
			.select__label
			{
				border-radius: 6px 6px 0 0;
			}
			.select__label-arrow { transform: translateY(-50%) rotate(180deg); }
		}

		&--scroll
		{
			.select__options { overflow: auto; }
		}
	}
	.select__label
	{
		position: relative;
		padding: 7px 40px 7px 20px;
		background-color: #F4F5F7;
		border-radius: 7px;
		cursor: pointer;
		@include transition();
	}
	.select__label-arrow
	{
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		@include transition();

		path
		{
			stroke: #868799;
		}
	}
	.select__label-text
	{
		color: #868799;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;

		margin-bottom: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
	}
	.select__options
	{
		position: absolute;
		width: 100%;
		z-index: 6;
		max-height: 150px;
		overflow: hidden;
		background-color: #F4F5F7;
		border-top: unset;
		left: 0;
		top: 100%;
		border-radius: 0 0 10px 10px;
		@include transition();

		&-enter-active, &-leave-active
		{
			opacity: 1;
			visibility: visible;
		}
		&-enter, &-leave-to
		{
			opacity: 0;
			visibility: hidden;
			max-height: 0;
		}
	}
	.select__option
	{
		color: var(--grey-grey, #868799);
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		padding: 10px 20px;
		@include transition();
		cursor: pointer;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		&--active
		{
			font-weight: 600;
			color: $blue;
		}

		&:hover
		{
			background-color: $lblue;
		}
	}

	@include mq($tablet)
	{
		.select { margin-bottom: 20px; }
		.select__label
		{
			padding-top: 10px;
			padding-bottom: 10px;
		}
		.select__label-text
		{
			color: #868799;
			font-size: 13px;
			line-height: 18px;
		}
	}

	@include mq($wd)
	{
		.select
		{
			// width: 259px;
			margin-bottom: 30px;
		}
	}
</style>
