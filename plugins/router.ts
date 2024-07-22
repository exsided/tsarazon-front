export default defineNuxtPlugin(({ $router }) =>
{
	$router.options.scrollBehavior = (to) =>
	{
		if (to.hash)
			useScrollTo(to.hash);

		return { el: to.hash, behavior: 'smooth', top: 0 };
	};
});
