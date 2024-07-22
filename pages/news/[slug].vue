<template>
	<NuxtLayout>
		<div class="container">
			<UiBreadcrumbs :items="breadcrumbs" />
		</div>
		<div class="static">
			<div class="container">
				<StaticContent>
					<h1>
						{{ title }}
					</h1>
					<div v-html="content" />
				</StaticContent>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import StaticContent from '~/components/static-content';
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';

import newsModule from '~/api/news.js';

const router = useRouter();
const slug   = router.currentRoute.value.params.slug;

const { data, error } = await newsModule.fetchDetail(slug);

if (!data.value || error.value)
	throw createError({ statusCode: 404, message: '', fatal: true });

const title = data.value.data.title;
const content = data.value.data.content;
const breadcrumbs = reactive([{ name: 'Главная', link: '/' }, { name: 'Блог', link: '/news' }, { name: title, link: `/news/${slug}` }]);
</script>

<style lang="scss">
	@import '~/assets/scss/static.scss';
</style>
