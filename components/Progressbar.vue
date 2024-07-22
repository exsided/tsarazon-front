<template>
	<div
		:class="{'progressbar--big': isBig}"
		class="progressbar"
	>
		<div class="progressbar__line" :style="{width: `${percent}%`}" />
	</div>
</template>

<script setup>
const props = defineProps({
	isBig:
	{
		type: Boolean,
		default: false,
	},
	percent:
	{
		type: Number,
		default: 65,
	}
});
</script>

<style lang="scss">
	.progressbar
	{
		width: 120px;
		min-height: 8px;
		border-radius: 50px;
		background-color: $lblue;

		&--big
		{
			height: 18px;
			border: 2px solid $white;
			box-shadow: 0px 0px 6px 0px rgba(93, 95, 107, 0.10);
		}
	}
	.progressbar__line
	{
		min-width: 20px;
		min-height: 8px;
		height: 100%;
		border-radius: 50px;
		background: linear-gradient(90deg, #F86635 0%, #F6C721 100%);
		@include transition();
	}
</style>
