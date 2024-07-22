<template>
	<div class="status">
		{{ title }}
	</div>
</template>

<script setup>
const props = defineProps({
	title:
	{
		type: String,
		default: '',
	},
});
</script>

<style lang="scss">
.status
{
	background: $blue;
	border-radius: 16px;
	padding: 3px 12px;
	color: $white;
	font-weight: 600;
	font-size: 10px;
	line-height: 14px;
}

@include mq($wd)
{
	.status
	{
		font-size: 12px;
		line-height: 16px;
		padding: 3px 15px 5px 15px;
	}
}
</style>
