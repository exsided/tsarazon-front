<template>
	<label
		:class="{dragging: isDragging}"
		class="ui-file-input"
		@dragover="dragover"
		@dragleave="dragleave"
		@drop="drop"
	>
		<p class="ui-file-input__desc">
			{{ description }}
		</p>
		<div class="ui-file-input__dropzone">
			<input
				v-if="showInput"
				ref="inputRef"
				:accept="accept"
				:disabled="disabled"
				:multiple="multiple"
				type="file"
				@change="onChange($event.target.files)"
			>
			<p class="ui-file-input__label">
				<PlusSvg />
				{{ label }}
			</p>
			<p class="ui-file-input__text">
				<slot />
			</p>
			<div
				v-if="modelValue.length"
				class="ui-file-input__files"
				@click.prevent.stop
			>
				<div
					v-for="file, idx in modelValue"
					:key="file.id"
					class="ui-file-input__file"
				>
					<span>
						{{ file.name }}
					</span>
					<TrashSvg @click.prevent.stop="deleteFile(idx)" />
				</div>
			</div>
		</div>
	</label>
</template>

<script setup>
import PlusSvg from '~/assets/svg/plus.svg?skipsvgo';
import TrashSvg from '~/assets/svg/trash.svg?skipsvgo';

const props = defineProps({
	description:
	{
		type: String,
		default: '',
	},
	label:
	{
		type: String,
		default: '',
	},
	accept:
	{
		type: String,
		default: '',
	},
	disabled:
	{
		type: Boolean,
		default: false,
	},
	multiple:
	{
		type: Boolean,
		default: false,
	},
	modelValue:
		{
			type: Array,
			default: () => [],
		},
});

const emit = defineEmits(['update:model-value', 'delete']);

const inputRef = ref(null);
const isDragging = ref(false);
const showInput = ref(true);

const onChange = async (rawFiles) =>
{
	const files = [];

	for (const el of [...rawFiles])
	{
		const id = `${(new Date()).getTime() + el.lastModified - el.size} ${el.name}`;
		files.push({ id, name: el.name, file: el });
	}

	emit('update:model-value', props.modelValue.concat(files));
	showInput.value = false;
	await nextTick();
	showInput.value = true;
};

const deleteFile = (idx) =>
{
	const files = JSON.parse(JSON.stringify(props.modelValue));
	const deletedFile = files.splice(idx, 1);

	emit('delete', { idx, deletedFile, files });
	emit('update:model-value', files);
};
const dragover = (e) =>
{
	e.preventDefault();
	isDragging.value = true;
};
const dragleave = () =>
{
	isDragging.value = false;
};
const drop = (e) =>
{
	e.preventDefault();
	onChange(e.dataTransfer.files);
	isDragging.value = false;
};
</script>

<style lang="scss">
	.ui-file-input
	{
		margin-bottom: 20px;

		input
		{
			display: none;
			opacity: 0;
			height: 0;
			width: 0;
			visibility: hidden;
		}

		&.dragging
		{
			.ui-file-input__dropzone
			{
				border-color: $blue;
				box-shadow: 0 4px 16px 0 $lgray;
			}
		}
	}
	.ui-file-input__desc
	{
		font-size: 10px;
		line-height: 12px;
		color: $gray;
	}
	.ui-file-input__dropzone
	{
		display: block;
		background-color: $white;
		border: 1px dashed #DAE0E7;
		border-radius: 10px;
		width: 100%;
		padding: 27px 30px;
		cursor: pointer;
		@include transition();

		@include hover()
		{
			border-color: $blue;
		}
	}
	.ui-file-input__label
	{
		font-size: 13px;
		line-height: 16px;
		color: $gray;
		text-align: center;
	}
	.ui-file-input__text
	{
		font-size: 10px;
		line-height: 15px;
		text-align: center;
		color: $gray;
		margin-bottom: 0;

		span { color: $blue; }
	}
	.ui-file-input__files { padding-top: 10px; }
	.ui-file-input__label
	{
		margin-bottom: 4px;
	}
	.ui-file-input__file
	{
		display: flex;
		justify-content: space-between;
		font-size: 9px;
		line-height: 12px;
		color: $gray;
		cursor: auto;

		span
		{
			word-break: break-all;
			margin-right: 4px;
			padding-top: 3px;
		}

		path { @include transition(); }

		svg
		{
			min-width: 17px;
			cursor: pointer;

			&:hover path { stroke: $red; }
			&:active { transform: scale(0.90); }
		}

		&:not(:last-child)
		{
			margin-bottom: 6px;
		}
	}

	@include mq($tablet)
	{
		.ui-file-input__dropzone
		{
			padding: 27px 62px;
		}
	}
</style>
