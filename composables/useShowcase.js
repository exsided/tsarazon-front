export const useShowcase = () =>
{
	const activeTab = ref('');
	const tabs      = ref([]);
	const items     = ref({});

	const _setProducts = (products, code) =>
	{
		items.value[code] = products.map(el => ({
			id: el.id,
			title: el.title,
			pictures: el.pictures,
			slug: el.slug,
			supplier: el.supplier,
			price: el.price,
			old_price: el.old_price,
			quant: el.quant,
			quant_unit: el.quant_unit,
		}));
	};

	const _setupData = (data, nameProp, codeProp) =>
	{
		const { _tabs, _items } = data.reduce((acc, el) =>
		{
			acc._items[el[codeProp]] = [];
			acc._tabs.push({ name: el[nameProp], code: el[codeProp] });

			return acc;
		}, { _tabs: [], _items: {} });

		tabs.value = _tabs;
		items.value = _items;

		return { _tabs, _items };
	};

	const visibleItems = computed(() => items.value[activeTab.value]);

	return {
		activeTab,
		tabs,
		items,
		visibleItems,
		_setProducts,
		_setupData,
	};
};
