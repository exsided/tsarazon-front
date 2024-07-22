<template>
	<div
		v-click-outside="hideOptions"
		:class="{
			'ui-autocomplite--expaned': expaned,
			'ui-autocomplite--scroll': showScroll,
		}"
		class="ui-autocomplite"
	>
		<UiInput
			:model-value="modelValue"
			:name="name"
			:label="label"
			:placeholder="placeholder"
			:title="modelValue"
			:error="error"
			:error-text="errorText"
			@focus="showOptions"
			@update:model-value="inputHandler"
		/>
		<Transition name="ui-autocomplite__options">
			<ul
				v-if="expaned"
				class="ui-autocomplite__options"
			>
				<li
					v-for="option in options"
					:key="option"
					:title="option"
					:class="{'ui-autocomplite__option--active': option === modelValue}"
					class="ui-autocomplite__option"
					@click="change(option)"
				>
					{{ option }}
				</li>
			</ul>
		</Transition>
	</div>
</template>

<script setup>
import UiInput from '~/components/UI/Input.vue';

const props = defineProps({
	modelValue:
	{
		type: String,
		default: '',
	},
	options:
	{
		type: Array,
		default: () => [],
	},
	handler:
	{
		type: Function,
		default: () => null,
	},
	label:
	{
		type: String,
		default: '',
	},
	placeholder:
	{
		type: String,
		default: '',
	},
	name:
	{
		type: String,
		default: '',
	},
	error:
	{
		type: Boolean,
		default: false
	},
	errorText:
	{
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:model-value']);
const expaned = ref(false);
const showScroll = ref(false);

let timeout;

const hideOptions = () =>
{
	clearTimeout(timeout);
	expaned.value = false;
	showScroll.value = false;
};

const showOptions = () =>
{
	expaned.value = true;
	timeout = setTimeout(() => (showScroll.value = true), 300);
};

const change = (val) =>
{
	emit('update:model-value', val);
	hideOptions();
};

const inputHandler = (val) =>
{
	emit('update:model-value', val);

	props.handler();
};
</script>

<style lang="scss">
.ui-autocomplite
{
	position: relative;

	&--scroll
	{
		.ui-autocomplite__options { overflow: auto; }
	}
}
.ui-autocomplite__options
{
	position: absolute;
	width: 100%;
	z-index: 6;
	max-height: 150px;
	overflow: hidden;
	background-color: $white;
	border-top: unset;
	left: 0;
	top: 100%;
	border-radius: 10px;
	box-shadow: 0px 0px 14px 0px rgba(93, 95, 107, 0.10);
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
.ui-autocomplite__option
{
	color: var(--grey-grey, #868799);
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	padding: 10px 20px;
	@include transition();
	cursor: pointer;

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
</style>
