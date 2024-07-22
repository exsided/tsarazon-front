<template>
	<label
		:class="{'ui-checkbox--error': error, 'ui-checkbox--white': isWhite}"
		class="ui-checkbox"
	>
		<input
			:name="name"
			:checked="modelValue"
			type="checkbox"
			class="ui-checkbox__input"
			@change="onChange"
		>
		<div class="ui-checkbox__body">
			<span class="ui-checkbox__box" />
			<span class="ui-checkbox__text">
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
	modelValue: Boolean,
	error: Boolean,
	isWhite: Boolean,
});

const emit = defineEmits(['update:model-value']);

const onChange = () => emit('update:model-value', !props.modelValue);
</script>

<style lang="scss">
	.ui-checkbox
	{
		position: relative;
		display: block;
		width: fit-content;

		&--white
		{
			.ui-checkbox__input
			{
				&:enabled
				{
					& ~ .ui-checkbox__body
					{
						.ui-checkbox__box
						{
							background-color: $lgray;
							border: 1px solid $lgray;
						}
						.ui-checkbox__text { color: $white; }
					}

					&:checked
					{
						& ~ .ui-checkbox__body .ui-checkbox__box
						{
							background-color: $lgray;
							background-image: url(/svg/checked-blue.svg);
						}
						& ~ .ui-checkbox__body .ui-checkbox__text { color: $white; }
					}
				}

				&:hover ~ .ui-checkbox__body .ui-checkbox__text { color: $white; }
			}

			.ui-checkbox__box
			{
				background-color: $lgray;
				background-image: url(/svg/notchecked.svg);
				margin-right: 5px;
			}

			.ui-checkbox__text
			{
				font-weight: 300;
				font-size: 10px;
				line-height: 14px;
				color: $white;
			}
		}

		&--error
		{
			.ui-checkbox__input
			{
				&:enabled, &:disabled
				{

					& ~ .ui-checkbox__body .ui-checkbox__box
					{
						border-color: $red;

					}
					& ~ .ui-checkbox__text { color: $red; }
				}
			}
		}
	}
	.ui-checkbox__input
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
			// включен
			& ~ .ui-checkbox__body
			{
				border-color: $blue;
			}
			// включен, но не выбран
			&:not(:checked)
			{
				& ~ .ui-checkbox__body:hover .ui-checkbox__box
				{
					background-position: center center;
					background-repeat: no-repeat;
				}
			}
			// включен и выбран
			&:checked
			{
				& ~ .ui-checkbox__body .ui-checkbox__box
				{
					background-color: $blue;
					background-image: url(/svg/checked.svg);
				}
			}
		}
	}
	// базовые стили для выключенного состояния
	.ui-checkbox__body
	{
		display: flex;
		align-items: center;
		cursor: pointer;
		width: fit-content;
	}
	.ui-checkbox__box
	{
		border: 1px solid $blue;
		background-position: center center;
		background-repeat: no-repeat;
		min-width: 18px;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		margin-right: 10px;
		@include transition();
	}
	.ui-checkbox__text
	{
		font-size: 10px;
		line-height: 14px;
		color: $gray;

		a { color: $blue; }
	}

	@include mq($wd)
	{
		.ui-checkbox
		{
			&--white
			{
				.ui-checkbox__box
				{
					min-width: 18px;
					width: 18px;
					height: 18px;
					border-radius: 6px;
				}
				.ui-checkbox__text { font-size: 11px; }

			}
		}
	}
</style>
