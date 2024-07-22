export const NUM_WORD = (value = 0, words) =>
{
	value = Math.abs(value) % 100;
	const num = value % 10;

	if (value > 10 && value < 20)
		return words[2];
	if (num > 1 && num < 5)
		return words[1];
	if (num === 1)
		return words[0];

	return words[2];
};

export const API_ERRORS_FORMATTER = (errors, fields) =>
{
	const obj = {};

	if (typeof errors === 'string')
	{
		for (const field in fields)
			obj[field] = errors;
	}
	else
	{
		for (const key in errors)
		{
			const error = errors[key];

			obj[key] = typeof error === 'string' ? error : error[0];
		}
	}

	return obj;
};

export const FORM_DATA_FORMATTER = (obj) =>
{
	const formData = new FormData();

	for (const key in obj)
		formData.append(key, obj[key]);

	return formData;
};

export const GET_CLEAR_PHONE = str => str.replace(/[^0-9+]/g, '');

export const PHONE_FORMATTER = (str) =>
{
	let inputNumbersValue = str.replace(/\D/g, '');
	let formattedInputValue = '';

	if (!inputNumbersValue)
		return '';

	if (['7', '8', '9'].includes(inputNumbersValue[0]))
	{
		if (inputNumbersValue[0] === '9')
			inputNumbersValue = '7' + inputNumbersValue;

		const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
		formattedInputValue = firstSymbols + ' ';

		if (inputNumbersValue.length > 1)
			formattedInputValue += '(' + inputNumbersValue.substring(1, 4);

		if (inputNumbersValue.length >= 5)
			formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);

		if (inputNumbersValue.length >= 8)
			formattedInputValue += '-' + inputNumbersValue.substring(7, 9);

		if (inputNumbersValue.length >= 10)
			formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
	}
	else
		formattedInputValue = '+' + inputNumbersValue.substring(0, 16);

	return formattedInputValue;
};

export const CHUNK_ARRAY = (arr, size) =>
{
	const chunkSize = Math.ceil(arr.length / size);
	const result = [];

	for (let i = 0; i < arr.length; i += chunkSize)
	{
		const chunk = arr.slice(i, i + chunkSize);
		result.push(chunk);
	}

	return result;
};

export const FILTERS_FORMATTER = (filters) =>
{
	const output = { filters: {} };

	for (const field of filters)
	{
		const key = field.field;

		if (field.type === 'checkbox')
			output.filters[key] = CHECKBOX_FILTER_FORMATTER(field, key);

		if (field.type === 'range')
			output.filters[key] = RANGE_FILTER_FORMATTER(field, key);
	}

	return output;
};

export const CHECKBOX_FILTER_FORMATTER = (field) =>
{
	const output =
	{
		maxlength: 5,
		label: field.label,
		options: [],
	};

	if (field.multiple)
	{
		output.value = [];
		output.type = 'checkbox';
	}
	else
	{
		output.value = null;
		output.type = 'radio';
	}

	for (const option of field.options)
	{
		if (option.selected)
		{
			if (field.multiple)
				output.value.push(option.value);
			else
				output.value = option.value;
		}

		output.options.push({ name: option.label || option.value, code: option.value });
	}

	return output;
};

export const RANGE_FILTER_FORMATTER = (field) =>
{
	const output =
	{
		value:
		{
			from: '',
			to: '',
		},
		label: field.label,
		type: 'range',
	};

	const from = field?.options ? field.options[0] : '';
	const to = field?.options ? field.options[1] : '';

	if (from)
		output.value.from = from;
	if (to)
		output.value.to = to;

	return output;
};

export const NUMBER_FORMATTER = num => Number(num).toLocaleString('RU-ru');

export const CART_ORDERS_FORRMATTER = (order) =>
{
	const pricePercent = Math.floor(Math.min(order.currentOrderAmount * 100 / order.minimumOrderAmount, 100));

	return {
		pricePercent,
		canMakeOrder: pricePercent === 100,
		id: order.id,
		active: !!order.active,
		currentOrderAmount: order.currentOrderAmount,
		minimumOrderAmount: order.minimumOrderAmount,
		requiredAmount: order.minimumOrderAmount - order.currentOrderAmount,
		supplier:
		{
			name: order.supplier.organization_name,
			slug: order.supplier.slug,
		},
		products: order.items.map(el => CART_PRODUCT_FORMATTER(el, order.supplier)),
	};
};

export const CART_PRODUCT_FORMATTER = (item, supplier) =>
{
	return {
		cartItemId: item.id,
		id: item.product.id,
		active: !!item.active,
		title: item.product.title,
		picture: item.product.pictures[0] || '',
		price: Number(item.product.price),
		quant: Number(item.product.quant),
		quantUnit: item.product.quant_unit,
		quantity: item.product.quantity,
		reserve: item.product.reserve,
		link: `/catalog/product/${item.product.slug}/${supplier.slug}`,
		brand: item.product.brand,
	};
};

export const CABINET_DATA_FORMATTER = (data) =>
{
	const output = { organization: null, bankDetails: null, user: null };

	if (data.organization_name)
	{
		output.organization =
		{
			name: data.fio || '',
			description: data.description || '',
			email: data.email || '',
			phone: data.phone || '',
			organization_name: data.organization_name || '',
			legal_adress: data.legal_adress || '',
			ceo: data.ceo || '',
			tin: data.tin || '',
			ogrn: data.ogrn || '',
			kpp: data.kpp || '',
			minimum_order_amount: data.minimum_order_amount || '',
		};

		output.bankDetails =
		{
			checking_account: data.bank_details.checking_account || '',
			corresp_account: data.bank_details.corresp_account || '',
			bic: data.bank_details.bic || '',
			bank_name: data.bank_details.bank_name || '',
		};
	}
	else
	{
		output.user =
		{
			name: data.fio,
			email: data.email,
			phone: PHONE_FORMATTER(data.phone),
		};
	}

	return output;
};
