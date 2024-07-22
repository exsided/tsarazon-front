import { useUserStore, useCartStore, useMainStore } from '~/store';

export const useUserInit = () =>
{
	const instance = getCurrentInstance();
	const router = useRouter();

	const userStore = useUserStore();
	const cartStore = useCartStore();
	const mainStore = useMainStore();

	const _userInit = async (token) =>
	{
		const userToken = useCookie('token');

		mainStore.enableLoading(instance.uid);

		userToken.value = token;

		await nextTick();

		await Promise.all([
			userStore.fetchCabinet(),
			cartStore.fetch(),
		]);

		router.push(userStore.isOrganisation ? '/slk' : '/lk');

		mainStore.disableLoading(instance.uid);
	};

	return _userInit;
};
