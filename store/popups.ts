import { defineStore } from 'pinia';

export const usePopupsStore = defineStore('popups', {
	state: () => ({
		open: false,
		name: '',
		data: null,
	}),

	actions:
	{
		setState([popup, value])
		{
			this.open = value;
			this.name = popup;
		},
		setData(data)
		{
			this.data = data;
		},
	}
});
