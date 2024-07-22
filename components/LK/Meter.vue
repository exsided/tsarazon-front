<template>
	<div class="meter">
		{{ count }}
	</div>
</template>

<script setup>
const props = defineProps({
	count:
	{
		type: [String, Number],
		default: '',
	},
});
</script>

<style lang="scss">
.meter
{
	border-radius: 30px;
	min-width: 11px;
	min-height: 11px;
	padding: 1.5px 3.5px;
	background: $orange;
	color: $white;
	font-size: 12px;
	line-height: 10px;
}
</style>
