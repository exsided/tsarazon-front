import { GET_VALUE_BY_PATH } from '~/helpers/index.js';

export const CHECKED_VALIDATION = value => value === true;

export const PHONE_VALIDATION = (value) =>
{
	const regex = /^((\+7|7|8)+ \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2})$|^((8)+ \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2})$|^[+]{1}[0-9]{16}$/;
	return regex.test(value);
};

export const SAME_AS = (path) =>
{
	return (value, parentVm) =>
	{
		const targetValue = GET_VALUE_BY_PATH(parentVm, path);
		return value === targetValue;
	};
};
