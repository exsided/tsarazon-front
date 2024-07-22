import { NEWS_URLS } from '~/consts/api';

export default {
	async fetch()
	{
		return await useRequest(NEWS_URLS.fetch, {
			method: 'GET'
		});
	},
	async fetchDetail(slug)
	{
		return await useRequest(`${NEWS_URLS.fetchDetail}/${slug}`);
	},
};
