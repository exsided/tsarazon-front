export const GET_RECURSIVE_ITEM_BY_PROPS = (items, propName, childname, prop) =>
{
	if (items)
	{
		for (let i = 0; i < items.length; i++)
		{
			if (items[i][propName] === prop)
				return items[i];

			const found = GET_RECURSIVE_ITEM_BY_PROPS(items[i][childname], propName, childname, prop);

			if (found)
				return found;
		}
	}
};

export const GET_VALUE_BY_PATH = (obj, path) =>
{
	const keys = path.split('.');
	let value = obj;

	for (const key of keys)
	{
		value = value[key];
		if (value === undefined)
			break;
	}
	return value;
};

export const GET_NEAREST_VALUE = (arr, searchval) =>
{
	const countValue = arr.length;
	let nearest = arr[0];
	for (let i = 0; i <= countValue; i++)
	{
		if (Math.abs(nearest - searchval) > Math.abs(arr[i] - searchval))
			nearest = arr[i];
	}
	return nearest;
};
