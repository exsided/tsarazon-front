import brandsModule from '~/api/brands.js';

export const useBrandsSlider = () =>
{
	const brandsList = ref([]);

	const fetchBrands = async () =>
	{
		const { data, error } = await brandsModule.fetchList();

		if (error.value)
		{
			// eslint-disable-next-line no-console
			console.log('useBrandsSlider/fetchBrands', error.value);
			return;
		}

		brandsList.value = data.value.data.data.map(el => ({
			id: el.id,
			title: el.title,
			slug: el.slug,
			picture: el.picture[0] || '',
		}));
	};

	return {
		fetchBrands,
		brandsList,
	};
};
