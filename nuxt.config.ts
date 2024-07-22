import svgLoader from 'vite-svg-loader';
import dynamicImport from 'vite-plugin-dynamic-import';
import eslint from 'vite-plugin-eslint';

const VUE_APP_ENDPOINT = process.env.VUE_APP_ENDPOINT || '';
const VUE_APP_DADATA_TOKEN = process.env.VUE_APP_DADATA_TOKEN || '';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	runtimeConfig:
	{
		public:
		{
			domainUrl: VUE_APP_ENDPOINT,
			dadataToken: VUE_APP_DADATA_TOKEN,
		}
	},

	pages: true,

	modules:
	[
		'@pinia/nuxt',
		// '@nuxtjs/eslint-module',
	],

	css: ['~/assets/scss/style.scss'],

	vite:
	{
		LintOnStart: false,

		plugins: [svgLoader(), dynamicImport(), eslint({ lintOnStart: false, failOnError: false, failOnWarning: false })],

		css:
		{
			preprocessorOptions:
			{
				scss:
				{
					additionalData: `
						@import "~/assets/scss/base/mixins.scss";
						@import "~/assets/scss/base/variables.scss";
					`,
				},
			},
		},
	},

	nitro:
	{
		devProxy:
		{
			'/api/':
			{
				target: VUE_APP_ENDPOINT + '/api/',
				changeOrigin: true,
			},
			'/element/public/upload/':
			{
				target: VUE_APP_ENDPOINT + '/element/public/upload/',
				changeOrigin: true,
			},
		}
	},
});
