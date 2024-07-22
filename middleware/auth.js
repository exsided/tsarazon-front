import { useUserStore } from '~/store';

export default defineNuxtRouteMiddleware(() =>
{
	const userStore = useUserStore();

	if (!userStore.isAuth)
		return navigateTo('/');
});
