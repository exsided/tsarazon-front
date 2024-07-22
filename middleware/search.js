export default defineNuxtRouteMiddleware((to) =>
{
	if (!to.query?.query)
		return navigateTo('/');
});
