import { useCatalogStore } from '~/store';

export const useCatalogBreadcrumbs = (slugs = [], start = [], end = []) =>
{
	const path = slugs.filter(el => el);

	const catalogStore = useCatalogStore();
	let catalog = catalogStore.items;

	const breadcrumbs = path.map((el, i) =>
	{
		const target   = catalog.findIndex(cetegory => cetegory.slug === el);
		const linkPath = [...path];
		const item     = { name: '', link: '#' };

		item.showChildrens = false;
		item.childrens     = catalog.filter(el => el.id !== catalog[target].id).map((el) =>
		{
			return { name: el.title, link: '/catalog/' + linkPath.join('/') + el.slug };
		});

		linkPath.length    = i + 1;
		item.link          = '/catalog/' + linkPath.join('/');
		item.name          = catalog[target].title;

		catalog = catalog[target].childrens;

		return item;
	});

	return ref(start.concat(breadcrumbs).concat(end));
};
