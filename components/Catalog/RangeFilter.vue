<template>
	<div class="range-filter">
		<input
			class="range-filter__input"
			type="text"
			:value="from"
			placeholder="От"
			@input="updateProp('from', $event.target.value)"
		>
		<input
			class="range-filter__input"
			type="text"
			:value="to"
			placeholder="До"
			@input="updateProp('to', $event.target.value)"
		>
	</div>
</template>

<script setup>
const props = defineProps({
	from:
	{
		type: String,
		default: ''
	},
	to:
	{
		type: String,
		default: ''
	},
});

const emit = defineEmits(['update:from', 'update:from']);

const updateProp = (prop, val) =>
{
	emit(`update:${prop}`, val);
};
</script>

<style lang=scss>
.range-filter
{
	display: flex;
	align-items: center;
	column-gap: 10px;
}

.range-filter__input
{
	padding: 3px 14px;
	background: #FFFFFF;
	border: 1px solid #F4F5F7;
	border-radius: 8px;
	max-width: 90px;
	box-shadow: 0px 0px 14px 0px rgba(93, 95, 107, 0.10);
	font-weight: 400;
	font-size: 11px;
	line-height: 17px;
	letter-spacing: -0.01em;
	color: #868799;
	outline: none;
}

@include mq($wd)
{
	.range-filter__input
	{
		max-width: 110px;
		font-size: 15px;
		line-height: 23px;
	}
}
</style>
