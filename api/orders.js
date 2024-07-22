import { ORDERS_URLS } from '~/consts/api';

export default {
	async fetchOrderingData(cartId)
	{
		return await useRequest(ORDERS_URLS.fetchOrderingData, {
			method: 'POST',
			body: { cart_id: cartId },
		});
	},
	async makeOrder(payload)
	{
		return await useRequest(ORDERS_URLS.makeOrder, {
			method: 'POST',
			body: payload,
		});
	},
};
