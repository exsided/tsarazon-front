import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import { API_ERRORS_FORMATTER } from '~/helpers/formatters.js';
import { SAME_AS } from '~/helpers/validators.js';
import { useMainStore } from '~/store';

import userModule from '~/api/user.js';

export const usePasswordChange = () =>
{
	const instance = getCurrentInstance();
	const uid = instance.uid;

	const mainStore = useMainStore();

	const passwordsForm = reactive({ old_password: '', new_password: '', new_password_confirmation: '' });
	const passwordsFormApiErrors = ref({});
	const passwordsFormRules =
	{
		old_password: { required, minLength: minLength(6) },
		new_password: { required, minLength: minLength(6), sameAs: SAME_AS('new_password_confirmation') },
		new_password_confirmation: { required, minLength: minLength(6), sameAs: SAME_AS('new_password') },
	};

	const $passwordsForm = useVuelidate(passwordsFormRules, passwordsForm);

	const _savePassword = async () =>
	{
		$passwordsForm.value.$touch();

		if ($passwordsForm.value.$error)
			return;

		passwordsFormApiErrors.value = {};

		mainStore.enableLoading(uid);

		const { error } = await userModule.changePassword({ ...passwordsForm });

		if (error.value?.data)
		{
			if (error.value?.data?.message)
				passwordsFormApiErrors.value = API_ERRORS_FORMATTER(error.value.data.data, passwordsForm);
			else if (error.value?.statusCode === 422)
				passwordsFormApiErrors.value = API_ERRORS_FORMATTER(error.value.data);

			mainStore.disableLoading(uid);

			return false;
		}

		return true;
	};

	const _clearPasswordsForm = () =>
	{
		passwordsForm.old_password = '';
		passwordsForm.new_password = '';
		passwordsForm.new_password_confirmation = '';

		$passwordsForm.value.$reset();
	};

	return {
		passwordsFormApiErrors,
		passwordsFormRules,
		passwordsForm,
		$passwordsForm,
		_savePassword,
		_clearPasswordsForm,
	};
};
