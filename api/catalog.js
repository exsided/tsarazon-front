import { CATALOG_URLS } from '~/consts/api';

export default {
	async fetchProducts(payload)
	{
		return await useRequest(`${CATALOG_URLS.fetchProducts}?${payload}`);
	},
	async fetchCategories()
	{
		return await useRequest(CATALOG_URLS.fetchCategories);
	},
	async quickSearch(query)
	{
		return await useRequest(`${CATALOG_URLS.quickSearch}?q=${query}`);
	},
	async search(payload)
	{
		return await useRequest(`${CATALOG_URLS.search}?${payload}`);
	},
	async fetchProduct(product, supplier)
	{
		return await useRequest(`${CATALOG_URLS.fetchProduct}/${supplier}/${product}`);
	},
	async fetchShowcaseCategories()
	{
		return await useRequest(CATALOG_URLS.fetchShowcaseCategories);
	},
	async fetchShowcaseProducts(category)
	{
		return await useRequest(`${CATALOG_URLS.fetchShowcaseProducts}/${category}`);
	},
	async fetchSupplierData(supplier)
	{
		return await useRequest(`${CATALOG_URLS.supplier}/${supplier}`);
	}
};
