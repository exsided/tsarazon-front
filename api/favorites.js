import { FAVORITES_URLS } from '~/consts/api';

export default {
	async fetch()
	{
		return await useRequest(FAVORITES_URLS.fetch, {
			method: 'GET'
		});
	},
	async add(id)
	{
		return await useRequest(FAVORITES_URLS.fetch, {
			method: 'POST',
			body: { id },
		});
	},
	async delete(id)
	{
		return await useRequest(FAVORITES_URLS.fetch, {
			method: 'DELETe',
			body: { id },
		});
	},
};
