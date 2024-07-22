import { FILES_URLS } from '~/consts/api';

export default {
	async upload(files)
	{
		const formData = new FormData();

		for (const file of files)
			formData.append('files[]', file);

		return await useRequest(FILES_URLS.upload, {
			method: 'POST',
			body: formData,
		});
	},
	async delete(file)
	{
		return await useRequest(`${FILES_URLS.delete}?file=${file}`);
	},
};
