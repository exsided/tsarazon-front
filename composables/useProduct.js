import { useCartStore, useUserStore } from '~/store';

export const useProduct = (productId, supplier) =>
{
	const cartStore = useCartStore();
	const userStore = useUserStore();

	const counter        = ref(0);
	const timeout        = ref(null);
	const productLoading = ref(null);

	const productFromCart = computed(() => cartStore.getProductById(productId));
	const isInCart        = computed(() => !!productFromCart.value);

	const _addInCart = async (val = null) =>
	{
		if (val !== null)
			counter.value = val;

		if (counter.value <= 0)
			await _deleteFromCart();
		else
			if (userStore.isAuth)
				await cartStore.addItem(productId, counter.value);
			else
				cartStore.addLocalProduct(productId, supplier, counter.value);

		fetchCartWithTimeout();
	};

	const _deleteFromCart = async () =>
	{
		if (userStore.isAuth)
			await cartStore.deleteProduct(productFromCart.value.cartItemId);
		else
			cartStore.deleteLocalProduct(supplier, productId);

		counter.value = 0;
		fetchCartWithTimeout();
	};

	const _changeActivity = async (state) =>
	{
		if (userStore.isAuth)
			await cartStore.changeProductActivity(productId, state);
		else
			cartStore.changeLocalProductActivity(productId, supplier, state);

		fetchCartWithTimeout();
	};

	const _changeQuantity = async (val) =>
	{
		if (val !== null && val !== undefined)
			counter.value = val;

		if (counter.value <= 0)
			await _deleteFromCart();

		if (userStore.isAuth)
			await cartStore.changeProductQuantity(productFromCart.value.cartItemId, counter.value);
		else
			cartStore.addLocalProduct(productId, supplier, counter.value);

		fetchCartWithTimeout();
	};

	const fetchCartWithTimeout = () =>
	{
		clearTimeout(timeout.value);

		const callback = () => timeout.value = setTimeout(() => _checkProductQuantityInBasket(), 100);

		cartStore.fetch(true, callback);
	};

	const _checkProductQuantityInBasket = () => counter.value = productFromCart?.value?.quantity || counter.value;

	return {
		isInCart,
		counter,
		_addInCart,
		_changeQuantity,
		_deleteFromCart,
		_changeActivity,
		_checkProductQuantityInBasket,
		productLoading,
		productFromCart,
	};
};
