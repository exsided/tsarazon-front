import { useUserStore, useCitiesStore, useCatalogStore, useCartStore } from '~/store';

export default defineNuxtPlugin(() =>
{
	const userStore = useUserStore();
	const citiesStore = useCitiesStore();
	const catalogStore = useCatalogStore();
	const cartStore = useCartStore();

	if (process.server)
	{
		// код который надо выполнить на сервере один раз при запуске приложения
		userStore.checkAuth();
		cartStore.setupLocalCart();
		userStore.fetchCabinet();
		citiesStore.fetchCurrent();
		userStore.checkAuth();
		citiesStore.fetch();
		catalogStore.fetchCategories();
		cartStore.fetch();
	}
	else
	{
		// код который надо выполнить в браузере один раз при запуске приложения
	}
});
