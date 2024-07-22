import { SLK_URLS } from '~/consts/api';

export default {
	async goodsImport(payload)
	{
		return await useRequest(SLK_URLS.goodsImport, {
			method: 'POST',
			body: payload,
		});
	},
};
