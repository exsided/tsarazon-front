import citiesModule from '~/api/cities';

export const useAddressComplite = () =>
{
	const timeout = ref(null);
	const _cityAutocompliteText = ref('');
	const _cityAutocomplitedCitiesList = ref([]);
	const _cityAutocompliteLoading = ref(false);

	const _fetchAddresess = () =>
	{
		clearTimeout(timeout.value);
		timeout.value = setTimeout(() => fetchAddresess(), 400);
	};

	const fetchAddresess = async () =>
	{
		_cityAutocompliteLoading.value = true;

		const { data, error } = await citiesModule.addressAutoComplite(_cityAutocompliteText.value);

		if (error.value)
		    // eslint-disable-next-line no-console
			console.log('useAddressComplite/fetchAddresess', error.value);

		if (data.value)
		{
			_cityAutocomplitedCitiesList.value = data.value.suggestions.map(el => el.value);
		}

		_cityAutocompliteLoading.value = false;
	};

	return {
		_cityAutocompliteText,
		_cityAutocomplitedCitiesList,
		_fetchAddresess,
		_cityAutocompliteLoading,
	};
};
