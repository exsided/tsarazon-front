import { FAQ_URLS } from '~/consts/api';

export default {
	async fetchAll()
	{
		return await useRequest(FAQ_URLS.fetchAll);
	},
	async fetchDetail(slug)
	{
		return await useRequest(`${FAQ_URLS.fetchDetail}/${slug}`);
	}
};
