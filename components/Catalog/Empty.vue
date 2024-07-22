<template>
	<div class="empty-catalog">
		<p>
			{{ msg }}
		</p>
	</div>
</template>

<script setup>
const props = defineProps({
	msg:
	{
		type: String,
		default: 'К сожалению, ничего не найдено.'
	}
});
</script>

<style lang="scss">
	.empty-catalog
	{
		padding-top: 30px;
		margin-bottom: 37px;

		p
		{
			font-size: 14px;
			color: $gray;
			text-align: center;
		}
	}

	@include mq($tablet)
	{
		.empty-catalog
		{
			margin-bottom: 30px;
		}
	}

	@include mq($wd)
	{
		.empty-catalog
		{
			margin-bottom: 46px;
		}
	}
</style>
