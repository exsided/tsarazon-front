import { CART_URLS } from '~/consts/api';

export default {
	async fetch()
	{
		return await useRequest(CART_URLS.fetch);
	},
	async addItem(payload)
	{
		return await useRequest(CART_URLS.addItem, {
			method: 'POST',
			body: payload,
		});
	},
	async changeOrderActivity()
	{
		return await useRequest(CART_URLS.changeOrderActivity, {
			method: 'POST',
			body: payload,
		});
	},
	async changeProductActivity(payload)
	{
		return await useRequest(CART_URLS.changeProductActivity, {
			method: 'POST',
			body: payload,
		});
	},
	async deleteProduct(productId)
	{
		return await useRequest(`${CART_URLS.deleteProduct}/${productId}`, {
			method: 'DELETE'
		});
	},
	async deleteOrder(orderId)
	{
		return await useRequest(`${CART_URLS.deleteOrder}/${orderId}`, {
			method: 'DELETE'
		});
	},
	async changeProductQuantity(cartItemId, quantity)
	{
		return await useRequest(`${CART_URLS.changeProductQuiantity}/${cartItemId}`, {
			method: 'PATCH',
			body: { quantity },
		});
	},
};
