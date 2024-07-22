<template>
	<label class="ui-datepicker">
		<span class="ui-datepicker__label">
			{{ label }}
		</span>
		<DatepickerVue
			v-model="date"
			:locale="Locale"
			class="ui-datepicker__input"
		/>
	</label>
</template>

<script setup>
import Locale from 'date-fns/locale/ru/index.js';
import DatepickerVue from 'vue3-datepicker/src/datepicker/Datepicker.vue';

const date = ref(new Date());

const props = defineProps({
	label:
	{
		type: String,
		default: '',
	},
});
</script>

<style lang="scss">
.ui-datepicker
{
	.v3dp__datepicker { position: static; }

	.v3dp__popout
	{
		filter: drop-shadow(0px 0px 16px rgba(93, 95, 107, 0.14));
		border-radius: 10px;
		left: 0;

		button
		{
			&.selected
			{
				span { background-color: $blue; }
			}

			&:not(:disabled)
			{
				&:hover
				{
					span { background-color: $blue; }
				}
			}
		}
	}

	.v3dp__heading__center
	{
		&::first-letter { text-transform: uppercase }
	}
}

.ui-datepicker__label
{
	display: block;
	color: rgba(44, 44, 44, 0.40);
	font-size: 11px;
	line-height: 14px;
}

.ui-datepicker__input
{
	font-family: "Open Sans", sans-serif;
	font-size: 13px;
	line-height: 14px;
	width: 100%;
	background-color: transparent;
	border: unset;
	outline: none;
	color: $black;
	padding-left: 0;
}

@include mq($tablet)
{
	.ui-datepicker__input
	{
		font-size: 11px;
		line-height: 11px;
		display: block;
	}
}

@include mq($wd)
{
	.ui-datepicker
	{
		.v3dp__datepicker { position: relative; }

		.v3dp__popout { left: unset; }
	}
}
</style>
