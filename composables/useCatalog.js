import qs from 'qs';
import { FILTERS_FORMATTER } from '~/helpers/formatters.js';

export const useCatalog = (_request, {
	_category = '',
	_brand = '',
	_itemsBaseUrl = '',
}) =>
{
	const router = useRouter();

	const filters     = ref({});
	const items       = ref([]);
	const timeout     = ref(null);
	const categories  = ref([]);
	const category    = ref(_category);
	const brandSlug   = ref(_brand);
	const sort        = ref({ name: '', code: '' });
	const sortOptions = ref([]);
	const loading     = ref(false);
	const hasError    = ref(false);
	const isEmpty     = ref(false);
	const query       = ref('');
	const brand       = reactive({ title: '', slug: '', picture: '' });
	const pagination  = reactive({
		currentPage: 1,
		perPage: 10,
		total: 0,
		totalPages: 0,
	});

	const fetchData = (withTimeout = false, needSaveInHistory = false, needGetDataFromHistory = false, showMore = false, saveCategories = false) =>
	{
		clearTimeout(timeout.value);

		if (withTimeout)
			timeout.value = setTimeout(() => fetchHandler(needSaveInHistory, needGetDataFromHistory, showMore, saveCategories), 1000);
		else
			fetchHandler(needSaveInHistory, needGetDataFromHistory, showMore, saveCategories);
	};

	const fetchHandler = async (needSaveInHistory, needGetDataFromHistory, showMore, saveCategories) =>
	{
		loading.value = true;

		const payload = getPayload(needGetDataFromHistory);

		const payloadArgs = [];

		if (brandSlug.value)
			payloadArgs.push(brandSlug.value);

		payloadArgs.push(qs.stringify(payload));

		const { data, error } = await _request(...payloadArgs);

		if (data.value && data.value.success)
		{
			if (saveCategories)
				categories.value = data.value.data.categories;

			loading.value = true;

			setupBrand(data.value.data?.brand);
			setupItems(data.value.data?.catalog?.data, showMore);
			setupPagination(data.value.data.catalog.meta);
			setupFilters(data.value?.data?.filter?.filters);
			setupSort(data.value?.data?.sorting?.sorting);

			if (needSaveInHistory)
				saveInHistory(payload);
		}

		if (error.value)
		{
			// eslint-disable-next-line no-console
			console.log('useCatalog/fetchHandler', error.value);
			hasError.value = true;
		}

		loading.value = false;
	};

	const setupSort = (data) =>
	{
		if (!data)
			return;

		const localSortOptions = [];

		for (const type of data)
		{
			for (const option of type.options)
			{
				const localOption = { name: `${type.label} - ${option.label.toLowerCase()}`, code: `${type.field}-${option.value}` };

				if (option.selected)
					sort.value = localOption;

				localSortOptions.push(localOption);
			}
		}

		sortOptions.value = localSortOptions;
	};

	const setupBrand = (data) =>
	{
		if (!data)
			return;

		brand.title       = data.title;
		brand.slug        = data.slug;
		brand.picture     = data.picture[0] || '';
		brand.description = data.description;
	};

	const setupItems = (data, showMore) =>
	{
		const products   = data || [];
		let itemsFromApi = items.value;

		if (showMore)
			itemsFromApi = itemsFromApi.concat(products);
		else
			itemsFromApi = products;

		isEmpty.value = !itemsFromApi.length;

		items.value = itemsFromApi.map(el => ({ ...el, link: `${_itemsBaseUrl}${el.slug}/${el.supplier}` }));
	};

	const setupPagination = (meta) =>
	{
		if (!meta)
			return;

		pagination.perPage    = meta.per_page;
		pagination.total      = meta.total;
		pagination.totalPages = meta.last_page;
	};

	const setupFilters = (filtersFromApi) =>
	{
		if (!filtersFromApi)
			return;

		const formattedFilters = FILTERS_FORMATTER(filtersFromApi);

		for (const key in formattedFilters)
			formattedFilters[key].isExpanded = !!filters.value[key]?.isExpanded;

		filters.value = JSON.parse(JSON.stringify(formattedFilters.filters));
	};

	const saveInHistory = (data) =>
	{
		if (process.server)
			return;

		const params = {};

		if (data.page)
			params.page = data.page;
		if (data.filters)
			params.filters = data.filters;
		if (brandSlug.value)
			params.category = category.value;
		if (sort.value?.code)
			params.sorting = sort.value.code;

		const url = new URL(window.location);
		const formattedParams = qs.stringify(params, { encode: false });

		if (!window.location.search && !formattedParams)
			return;

		url.searchParams.set('params', formattedParams);

		if (window.location.search === url.search)
			return;

		window.history.pushState({}, '', url);
	};

	const getPayload = (needGetDataFromHistory) =>
	{
		const payload = {};

		if (category.value)
			payload.category = category.value;

		if (needGetDataFromHistory)
		{
			const payloadFromHistory = getParamsFromUrl();

			if (payloadFromHistory.page)
				pagination.currentPage = Number(payloadFromHistory.page);

			if (payloadFromHistory.filters)
				payload.filters = payloadFromHistory.filters;

			if (payloadFromHistory.category)
				payload.category = payloadFromHistory.category;
			if (payloadFromHistory.sorting)
				payload.sorting = getSort(payloadFromHistory.sorting);
		}

		if (!needGetDataFromHistory && filters.value && Object.keys(filters.value).length)
		{
			payload.filters = {};

			for (const key in filters.value)
			{
				const currentFilter = JSON.parse(JSON.stringify(filters.value[key]));

				if (currentFilter.type === 'range')
				{
					if (currentFilter.value.to && Number(currentFilter.value.to))
						payload.filters[key] = { to: currentFilter.value.to };
					if (currentFilter.value.from && Number(currentFilter.value.from))
					{
						if (!payload.filters[key])
							payload.filters[key] = {};

						payload.filters[key].from = currentFilter.value.from;
					}
				}

				if (currentFilter.type === 'checkbox' && currentFilter.value.length)
					payload.filters[key] = currentFilter.value;

				if (currentFilter.type === 'radio' && currentFilter.value)
					payload.filters[key] = currentFilter.value;
			}
		}

		if (!needGetDataFromHistory && sort.value?.code)
			payload.sorting = getSort(sort.value.code);

		if (query.value)
			payload.q = query.value;

		payload.page = pagination.currentPage;

		return payload;
	};

	const getParamsFromUrl = () =>
	{
		const currParams = router.currentRoute.value?.query?.params;

		if (!currParams)
			return false;

		return qs.parse(currParams);
	};

	const getSort = (code) =>
	{
		const [field, value] = code.split('-');

		return { [field]: value };
	};

	const showMoreItemsCount = computed(() =>
	{
		const perPage = pagination.perPage;
		const totalItems = pagination.total;
		const currentPage = pagination.currentPage;

		const currentItemsPos = currentPage * perPage;

		const different = totalItems - currentItemsPos;

		if (totalItems - currentItemsPos > perPage)
			return perPage;
		else if (different > 0)
			return different;

		return 0;
	});

	return {
		query,
		loading,
		hasError,
		filters,
		items,
		fetchHandler,
		fetchData,
		sort,
		sortOptions,
		pagination,
		category,
		categories,
		showMoreItemsCount,
		isEmpty,
		brand,
	};
};
