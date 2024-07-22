import { useFaqStore } from '~/store';

export default defineNuxtRouteMiddleware(async (to) =>
{
	const faqStore = useFaqStore();

	if (!faqStore.items.length)
		await faqStore.fetchAll();

	const items = faqStore.items;

	const findedCategory = items.find(el => el.slug === to.params.category);

	if (!findedCategory)
		throw createError({ statusCode: 404, message: 'faq-detail-not-found', fatal: true });

	const findedFaq = findedCategory.faqs.find(el => el.slug === to.params.slug);

	if (!findedFaq)
		throw createError({ statusCode: 404, message: 'faq-detail-not-found', fatal: true });
});
