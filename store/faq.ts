import { defineStore } from 'pinia';
import faqModule from '~/api/faq.js';

export const useFaqStore = defineStore('faq', {
	state: () => ({
		items: [],
	}),

	actions:
	{
		async fetchAll()
		{
			const { data } = await faqModule.fetchAll();

			this.items = [...data.value.data].filter(el => el.faqs.length);
		},
	}
});
