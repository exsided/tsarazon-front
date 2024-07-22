import { FORMS_URLS } from '~/consts/api';

export default {
	async askQuestion(payload)
	{
		return await useRequest(FORMS_URLS.askQuestion, {
			method: 'POST',
			body: payload,
		});
	}
};
