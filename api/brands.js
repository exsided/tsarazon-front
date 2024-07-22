import { BRANDS_URLS } from '~/consts/api';

export default {
	async fetchList()
	{
		return await useRequest(BRANDS_URLS.fetchList);
	},
	async fetchProducts(brand, payload)
	{
		return await useRequest(`${BRANDS_URLS.fetchProducts}/${brand}?${payload}`);
	},
};
