export const useRequest = (request, opts = {}) =>
{
	const config = useRuntimeConfig();

	if (request.startsWith('/api/'))
		request = config.public.domainUrl + request;

	const options = {
		baseURL: config.public.domain,
		...opts
	};

	if (process.env.NODE_ENV === 'production')
		options.credentials = 'include';

	return useFetch(request, options);
};
