<template>
	<label
		:class="{
			'ui-input--error': error,
			'ui-input--with-icon': hasIcon,
			'ui-input--with-label': label,
			'ui-input--textarea': textarea,
			'ui-input--label-on-top': label && modelValue || label && placeholder,
			'ui-input--disabled': disabled,
		}"
		class="ui-input"
	>
		<textarea
			v-if="textarea"
			:value="modelValue"
			:placeholder="placeholder"
			:class="{'ui-input__field--textarea': textarea}"
			class="ui-input__field"
			@input="onInput($event.target.value)"
		/>
		<input
			v-else
			v-maska
			:data-maska="mask"
			:name="name"
			:placeholder="placeholder"
			:type="password ? 'password' : type"
			:value="modelValue"
			:disabled="disabled"
			:maxlength="maxLenght"
			class="ui-input__field"
			@focus="onFocus"
			@input="onInput($event.target.value)"
		>
		<span v-if="label" class="ui-input__label">
			{{ label }}
		</span>
		<div
			v-if="hasIcon"
			class="ui-input__icon"
			@click="clickIcon"
		>
			<slot />
		</div>
		<div v-if="error && errorText" class="ui-input__error">
			<span>
				{{ errorText }}
			</span>
		</div>
	</label>
</template>

<script setup>
const { slots } = getCurrentInstance();

const props = defineProps({
	name:
	{
		type: String,
		default: '',
	},
	modelValue:
	{
		type: String,
		default: '',
	},
	type:
	{
		type: String,
		default: 'text'
	},
	placeholder:
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
	password:
	{
		type: Boolean,
		default: false
	},
	disabled:
	{
		type: Boolean,
		default: false
	},
	label:
	{
		type: String,
		default: '',
	},
	phoneInput:
	{
		type: Boolean,
		default: false
	},
	textarea:
	{
		type: Boolean,
		default: false
	},
	isNumber:
	{
		type: Boolean,
		default: false,
	},
	mask:
	{
		type: String,
		default: ''
	},
});

const emit = defineEmits(['focus', 'update:model-value', 'clickIcon']);

const maxLenght = ref(false);

const hasIcon = computed(() => !!slots.default);

const onFocus = () => emit('focus');
const onInput = async (value) =>
{
	if (props.isNumber === true)
	{
		value = value.replace(/[^\d]/g, '');
		emit('update:model-value', value + ' ');
		await nextTick();
	}

	emit('update:model-value', value);
};
const clickIcon = () => emit('clickIcon');

onMounted(() =>
{
	if (props.phoneInput) maxLenght.value = 18;
});

onBeforeUnmount(() =>
{
	maxLenght.value = false;
});
</script>

<style lang="scss">
	.ui-input
	{
		position: relative;
		display: block;
		margin-bottom: 6px;

		&--with-label
		{
			.ui-input__field { padding-top: 24px; }
		}

		&--error
		{
			animation: shake 0.2s ease-in-out 0s 2;

			.ui-input__field
			{
				border-color: $red;
				color: $red;

				&::placeholder { color: $red; }

				&:not(:disabled)
				{
					&:focus, &:hover { border-color: $red; }
				}
			}

			.ui-input__label { color: $red; }
		}

		&--with-icon
		{
			.ui-input__field { padding-right: 45px; }
		}

        &--disabled
        {
            cursor: not-allowed;
        }
	}
	.ui-input__label
	{
		position: absolute;
		top: 23px;
		left: 20px;
		transform: translateY(-50%);
		font-size: 13px;
		line-height: 18px;
		color: rgba(44, 44, 44, 0.4);
		@include transition();
	}

	.ui-input__field:focus ~ .ui-input__label, .ui-input--label-on-top .ui-input__label
	{
		font-size: 11px;
		line-height: 14px;
		margin-top: -9px;
	}

	.ui-input__field
	{
		font-weight: 600;
		font-size: 13px;
		line-height: 14px;
		color: $black;
		height: 46px;
		padding: 14px 20px 14px 20px;
		border: unset;
		background-color: $lgray;
		border-radius: 10px;
		width: 100%;
		@include transition();
		box-sizing: border-box;
		border: 1px solid $lgray;

		&::placeholder
		{
			color: rgba(44, 44, 44, 0.4);
		}

		&:not(:disabled)
		{
			&:focus, &:hover
			{
				outline: unset;
				border-color: $blue;
			}
		}

        &:disabled
        {
            cursor: not-allowed;
            color: $gray;
        }

		&--textarea
		{
			height: 110px;
			resize: none;
			padding-top: 20px;
		}
	}
	.ui-input__icon
	{
		position: absolute;
		display: flex;
		align-items: center;
		transform: translateY(-50%);
		top: 50%;
		right: 21px;
	}
	.ui-input__error
	{
		display: flex;
		padding-top: 2px;

		span
		{
			font-size: 9px;
			line-height: 10px;
			color: $red;
		}
	}
</style>
