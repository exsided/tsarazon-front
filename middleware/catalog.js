import { useCatalogStore } from '~/store';

export default defineNuxtRouteMiddleware(async (to) =>
{
	const catalogStore = useCatalogStore();

	if (!catalogStore.items.length)
		await catalogStore.fetchCategories();

	const path = to.params.slug.filter(el => el);

	let catalog = catalogStore.items;

	for (const i in path)
	{
		const slug = path[i];

		const target = catalog.findIndex(cetegory => cetegory.slug === slug);

		if (target === -1)
			throw createError({ statusCode: 404, message: '' });

		catalog = catalog[target].childrens;
	}
});
