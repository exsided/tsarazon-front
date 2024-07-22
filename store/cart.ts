import { defineStore } from 'pinia';
import cartModule from '~/api/cart.js';

import { CART_ORDERS_FORRMATTER, NUMBER_FORMATTER } from '~/helpers/formatters.js';

export const useCartStore = defineStore('cart', {
	state: () => ({
		orders: [],
		fetchTimeout: false,
		fetching: false,
		localCart: '',
		cartIdForMakeOrder: null,
	}),

	actions:
	{
		async fetch(timeout = false, callback = null)
		{
			clearTimeout(this.fetchTimeout);

			if (timeout)
				this.fetchTimeout = setTimeout(() => this._fetch(callback), 300);
			else
				await this._fetch(callback);
		},
		async _fetch(callback)
		{
			this.fetching = true;

			const { data, error } = await cartModule.fetch();

			if (error.value)
				// eslint-disable-next-line no-console
				console.log('cart/store/fetch', error.value);

			if (data.value)
				this.orders = data?.value?.data?.map?.(CART_ORDERS_FORRMATTER) || [];

			if (callback)
				callback();

			this.fetching = false;
		},
		async addItem(productId, quantity)
		{
			await cartModule.addItem({ productId, quantity });
		},
		async deleteProduct(cartItemId)
		{
			const orders = this.orders;
			let targetOrderIdx = -1;
			let targetProductIdx = -1;

			for (const orderIdx in orders)
			{
				for (const productIdx in orders[orderIdx].products)
				{
					if (orders[orderIdx].products[productIdx].cartItemId === cartItemId)
					{
						targetOrderIdx = orderIdx;
						targetProductIdx = productIdx;
						break;
					}
				}

				if (targetProductIdx !== -1)
					break;
			}

			this.orders[targetOrderIdx].products.splice(targetProductIdx, 1);

			if (!this.orders[targetOrderIdx].products.length)
				await this.deleteOrder(this.orders[targetOrderIdx].id);
			else
				await cartModule.deleteProduct(cartItemId);
		},
		async deleteOrder(orderId)
		{
			this.orders = this.orders.filter(el => el.id !== orderId);

			await cartModule.deleteOrder(orderId);
		},
		async changeProductActivity(productId, state)
		{
			await cartModule.changeProductActivity({
				cartItemId: productId,
				active: Number(state),
			});
		},
		async changeProductQuantity(cartItemId, quantity)
		{
			await cartModule.changeProductQuantity(cartItemId, quantity);
		},
		setupLocalCart()
		{
			const cart = useCookie('cart');

			if (!cart.value)
				cart.value = {};

			this.localCart = JSON.stringify(cart.value) || '{}';
		},
		getLocalCart()
		{
			return this.localCart ? JSON.parse(this.localCart) : {};
		},
		setLocalCart(cart)
		{
			const cartFormCookie = useCookie('cart');

			this.localCart = cart;

			cartFormCookie.value = JSON.stringify(cart);
		},
		addLocalProduct(productId, supplier, quantity)
		{
			this.updateLocalProduct(supplier, productId, { quantity });
		},
		changeLocalProductActivity(productId, supplier, state)
		{
			this.updateLocalProduct(supplier, productId, { active: state });
		},
		updateLocalProduct(supplier, productId, options = {})
		{
			const cart = this.getLocalCart();

			if (!cart[supplier])
				cart[supplier] = {};

			if (!cart[supplier][productId])
				cart[supplier][productId] = {};

			cart[supplier][productId] = { ...cart[supplier][productId], ...options };

			this.setLocalCart(cart);
		},
		deleteLocalProduct(supplier, productId)
		{
			const cart = this.getLocalCart();

			if (cart[supplier])
				delete cart[supplier][productId];

			this.setLocalCart(cart);
		},
		deleteLocalOrder(supplier)
		{
			const cart = this.getLocalCart();

			if (cart[supplier])
				delete cart[supplier];

			this.setLocalCart(cart);
		},
	},

	getters:
	{
		productsCount()
		{
			return this.orders.map(el => el.products.length).length;
		},
		ordersPrice()
		{
			return this.orders.reduce((sum, el) =>
			{
				return sum + el.currentOrderAmount;
			}, 0);
		},
		getProductById()
		{
			return (productId) =>
			{
				let product = null;

				if (!productId)
					return product;

				for (const order of this.orders)
				{
					for (const item of order.products)
					{
						if (item.id === productId)
						{
							product = item;
							break;
						}
					}

					if (product)
						break;
				}

				return product;
			};
		},
		getOrderByProductId()
		{
			return (productId) =>
			{
				let orderToReturn = null;

				if (!productId)
					return orderToReturn;

				for (const orderIdx in this.orders)
				{
					for (const item of this.orders[orderIdx].products)
					{
						if (item.id === productId)
						{
							orderToReturn = { ...this.orders[orderIdx], name: NUMBER_FORMATTER(1 + Number(orderIdx)) };
							break;
						}
					}

					if (orderToReturn)
						break;
				}

				return orderToReturn;
			};
		},
		getOrderById()
		{
			return (orderId) =>
			{
				const orderIdx = this.orders.findIndex(el => el.id === orderId);

				return orderIdx > -1 ? { ...this.orders[orderIdx], name: NUMBER_FORMATTER(1 + Number(orderIdx)) } : null;
			};
		},
		// items,
	}
});
