import { DOCUMENTS_URLS } from '~/consts/api';

export default {
	async fetch()
	{
		return await useRequest(DOCUMENTS_URLS.fetch, {
			method: 'GET'
		});
	},
};
