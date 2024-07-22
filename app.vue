<template>
	<div class="app">
		<NuxtPage />
	</div>
</template>

<script setup>
import { ofetch } from 'ofetch';

const runtimeConfig = useRuntimeConfig();

globalThis.$fetch = ofetch.create({
	baseUrl: runtimeConfig.public.domainUrl,
	onRequest: (config) =>
	{
		const userToken         = useCookie('token');
		const cartCookie        = useCookie('cart');
		const currentCityCookie = useCookie('current_city');
		const cookiesObj        = { cart: cartCookie.value, current_city: currentCityCookie.value };
		const cookies           = [];

		for (const cookieName in cookiesObj)
			if (cookiesObj[cookieName])
				cookies.push(`${cookieName}=${cookiesObj[cookieName]}`);

		if (!config.options.headers)
			config.options.headers = new Headers();

		if (userToken.value && !config.options.headers?.Authorization)
			config.options.headers.append('Authorization', 'Bearer ' + userToken.value);
		if (cookies.length)
			config.options.headers.append('Cookie', cookies.join('; '));
	}
});
</script>
