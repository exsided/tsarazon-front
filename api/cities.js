import { CITIES_URLS } from '~/consts/api';

export default {
	async fetch(searchText)
	{
		return await useRequest(`${CITIES_URLS.fetch}?city=${searchText || ''}`);
	},
	async getCurrent()
	{
		return await useRequest(CITIES_URLS.getCurrent);
	},
	async addressAutoComplite(query)
	{
		const runtimeConfig = useRuntimeConfig();

		return await useRequest('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
			{
				method: 'POST',
				headers:
				{
					Authorization: 'Token ' + runtimeConfig.public.dadataToken
				},
				body: { query },
			});
	}
};
