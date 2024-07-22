import { USER_URLS } from '~/consts/api';

export default {
	async registration(payload)
	{
		return await useRequest(USER_URLS.registration, {
			method: 'POST',
			body: payload,
		});
	},
	async authorization(payload)
	{
		return await useRequest(USER_URLS.authorization, {
			method: 'POST',
			body: payload,
		});
	},
	async confirmPhone(payload)
	{
		return await useRequest(USER_URLS.confirmPhone, {
			method: 'POST',
			body: payload,
		});
	},
	async passwordResetRequest(payload)
	{
		return await useRequest(USER_URLS.passwordResetRequest, {
			method: 'POST',
			body: payload,
		});
	},
	async confirmPasswordReset(payload)
	{
		return await useRequest(USER_URLS.checkingPasswordResetCode, {
			method: 'POST',
			body: payload,
		});
	},
	async passwordResset(payload)
	{
		return await useRequest(USER_URLS.passwordResset, {
			method: 'POST',
			body: payload,
		});
	},
	async fetchCabinet()
	{
		return await useRequest(USER_URLS.fetchCabinet);
	},
	async editCaibinet(payload)
	{
		return await useRequest(USER_URLS.editCaibinet, {
			method: 'POST',
			body: payload,
		});
	},
	async changePassword(payload)
	{
		return await useRequest(USER_URLS.changePassword, {
			method: 'POST',
			body: payload,
		});
	},
	async sendPhoneChangeCode(phone)
	{
		return await useRequest(USER_URLS.sendPhoneChangeCode, {
			method: 'POST',
			body: { phone },
		});
	},
	async changePhone(payload)
	{
		return await useRequest(USER_URLS.changePhone, {
			method: 'POST',
			body: payload,
		});
	},
};
