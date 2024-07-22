<template>
	<UiAutocomplite
		class="city-autocomplite"
		:model-value="_cityAutocompliteText"
		:name="name"
		:label="label"
		:placeholder="placeholder"
		:options="_cityAutocomplitedCitiesList"
		:error="error"
		:error-text="errorText"
		@update:model-value="fetchAddresess"
	/>
</template>

<script setup>
import UiAutocomplite from '~/components/UI/Autocomplite.vue';

const props = defineProps({
	modelValue:
	{
		type: String,
		default: '',
	},
	options:
	{
		type: Array,
		default: () => [],
	},
	handler:
	{
		type: Function,
		default: () => null,
	},
	label:
	{
		type: String,
		default: '',
	},
	placeholder:
	{
		type: String,
		default: '',
	},
	name:
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
});

const emit = defineEmits(['update:model-value']);

const {
	_cityAutocompliteText,
	_cityAutocomplitedCitiesList,
	_fetchAddresess,
} = useAddressComplite();

_cityAutocompliteText.value = props.modelValue;

const fetchAddresess = (val) =>
{
	emit('update:model-value', val);

	_cityAutocompliteText.value = val;

	_fetchAddresess();
};
</script>

<style lang="scss">

</style>
