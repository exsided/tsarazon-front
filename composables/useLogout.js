import { useUserStore, useCartStore, useMainStore } from '~/store';

export const useLogout = () =>
{
	const instance = getCurrentInstance();
	const router = useRouter();

	const userStore = useUserStore();
	const cartStore = useCartStore();
	const mainStore = useMainStore();

	const _logout = async () =>
	{
		mainStore.enableLoading(instance.uid);

		router.push('/');
		userStore.logout();
		await nextTick();
		await cartStore.fetch();

		mainStore.disableLoading(instance.uid);
	};

	return _logout;
};
