import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
	state: () => ({
		disableScrollUids: [],
		phone: '8 (928) 988-88-48',
		email: '123456789Alex@mail.ru',
		loadingUids: [],
	}),

	actions:
	{
		disableScroll(uid)
		{
			this.disableScrollUids.push(uid);
		},
		enableScroll(uid)
		{
			this.disableScrollUids = this.disableScrollUids.filter(el => el !== uid);
		},
		enableLoading(uid)
		{
			this.loadingUids.push(uid);
		},
		disableLoading(uid)
		{
			this.loadingUids = this.loadingUids.filter(el => el !== uid);
		},
	}
});
