<template>
	<label class="ui-radio">
		<input
			:name="name"
			:checked="modelValue === code"
			:value="code"
			type="radio"
			class="ui-radio__input"
			@change="onChange"
		>

		<div class="ui-radio__body">
			<span class="ui-radio__box" />
			<span class="ui-radio__text">
				<slot />
			</span>
		</div>
	</label>
</template>

<script setup>
const props = defineProps({
	name:
	{
		type: String,
		default: '',
	},
	code:
	{
		type: String,
		default: '',
	},
	modelValue:
	{
		type: String,
		default: '',
	}
});

const emit = defineEmits(['update:model-value']);

const onChange = () => emit('update:model-value', props.code);
</script>

<style lang=scss>
.ui-radio__title
{
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	color: #2C2C2C;
	margin-bottom: 11px;
}

.ui-radio__switch-text
{
	font-weight: 400;
	font-size: 13px;
	line-height: 22px;
	color: #868799;
}

.ui-radio
{
	display: block;
	position: relative;
	font-size: 0;
}
.ui-radio__input
{
	position: absolute;
	width: 0;
	height: 0;
	top: 0;
	left: 0;
	z-index: -10;
	visibility: hidden;
	opacity: 0;
	&:enabled
	{
		& ~ .ui-radio__body
		{

			display: flex;
			align-items: center;
			cursor: pointer;
			.ui-radio__box {border-color: #3772FE; }
		}
		&:checked ~ .ui-radio__body .ui-radio__box
		{
			background: #ffffff;
			border-radius: 10px;
			border-width: 1px;
		}
		&:checked
		{
			& ~ .ui-radio__body .ui-radio__box:before
			{
				background-color: #3772FE;
			}
		}
	}
	&:disabled:checked ~ .ui-radio__body .ui-radio__box
	{
		border-color: pink;
		background-color: gray;
	}
}
.ui-radio__box
{
	width: 16px;
	height: 16px;
	border: 1px solid #3772FE;
	border-radius: 10px;
	display: inline-block;
	vertical-align: top;

	&:before
	{
		content:'';
		display: block;
		border-radius: 10px;
		width: 10px;
		height: 10px;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		@include transition();
	}
}
.ui-radio__text
{
	font-size: 1rem;
	display: inline-block;
	vertical-align: top;
	margin-left: 4px;
	font-size: 13px;
	font-weight: 400;
	line-height: 22px;
	color: #868799;
}
</style>
