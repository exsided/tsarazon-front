module.exports =
{
	apps:
	[
		{
			name: 'tzarazon',
			exec_mode: 'cluster',
			instances: '1',
			script: './node_modules/nuxt/bin/nuxt.mjs',
			args: 'start'
		}
	]
};
