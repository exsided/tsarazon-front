import { defineStore } from 'pinia';
import catalogModule from '~/api/catalog.js';

export const useCatalogStore = defineStore('catalog', {
	state: () => ({
		items: [],
	}),

	actions:
	{
		async fetchCategories()
		{
			const { data, error } = await catalogModule.fetchCategories();

			if (error.value)
				// eslint-disable-next-line no-console
				console.log('catalog-store/fetchCategories');

			if (data.value)
				this.items = data.value.data;
		}
	},

	getters:
	{
		getCategoriesWithLinks(state)
		{
			const func = (arr, link = '/catalog/') =>
			{
				return arr.map((el) =>
				{
					const obj = {
						...el,
						path: link + el.slug,
					};

					if (el.childrens && el.childrens.length)
						obj.childrens = func(obj.childrens, `${link}${el.slug}/`);

					return obj;
				});
			};

			return func(JSON.parse(JSON.stringify(state.items)));
		}
	}
});
