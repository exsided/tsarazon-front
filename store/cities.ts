import { defineStore } from 'pinia';
import citiesModule from '~/api/cities.js';

export const useCitiesStore = defineStore('cities', {
	state: () => ({
		current: { title: '', slug: '' },
		list: [],
	}),

	actions:
	{
		async fetchCurrent()
		{
			const { data, error } = await citiesModule.getCurrent();

			if (!error.value && data.value?.data)
				this.current = data.value.data;
		},
		async fetch(query)
		{
			const { data, error } = await citiesModule.fetch(query);

			if (error.value)
				// eslint-disable-next-line no-console
				console.log('cities-store/fetch', error.value);

			if (data.value)
				this.list = data.value.data.data;
		},
		selectCity(city)
		{
			this.current = { ...city };
			const cityCookie = useCookie('current_city');

			cityCookie.value = city.slug;
		},
	}
});
