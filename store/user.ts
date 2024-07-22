import { defineStore } from 'pinia';
import { CABINET_DATA_FORMATTER } from '~/helpers/formatters.js';
import userModule from '~/api/user.js';

export const useUserStore = defineStore('user', {
	state: () => ({
		isAuth: false,
		user: null,
		isOrganisation: false,
		bankDetails: null,
	}),

	actions:
	{
		logout()
		{
			const userToken = useCookie('token');

			userToken.value = null;
			this.isAuth = false;
		},

		checkAuth()
		{
			const userToken = useCookie('token');
			this.isAuth = !!userToken.value;
		},

		async fetchCabinet()
		{
			const { data, error } = await userModule.fetchCabinet();

			if (error.value)
			{
				// eslint-disable-next-line no-console
				console.log('userStore/fetchCabinet', error.value);
				throw createError({ statusCode: 404, message: '', fatal: true });
			}

			if (data.value?.data)
				this.isAuth = true;

			const cabinetData = CABINET_DATA_FORMATTER(data.value.data);

			if (cabinetData.organization)
			{
				this.user = cabinetData.organization;
				this.bankDetails = cabinetData.bankDetails;
				this.isOrganisation = true;
			}
			else
				this.user = cabinetData.user;
		},
	}
});
