<template>
	<NuxtLayout name="default">
		<div class="documents-page">
			<div class="container">
				<UiBreadcrumbs
					:items="breadcrumbs"
				/>
				<h1 class="documents-page__title">
					{{ title }}
				</h1>
				<div class="documents-page__list">
					<DocumentCard
						v-for="item in documents"
						:key="item.id"
						:title="item.title"
						:link="item.document"
						:publish-date="item.publication_date"
					/>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import DocumentCard from '~/components/Document.vue';

import documentsModule from '~/api/documents.js';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Юридические документы', link: '/documents' },];
const title = 'Юридические документы';
useHead({ title: 'Юридические документы' });

const documents = ref([]);

const { data } = await documentsModule.fetch();

if (data.value)
	documents.value = [...data.value.data];

</script>

<style lang="scss">
.documents-page
{
	margin-bottom: 50px;
}

.documents-page__title
{
	margin-bottom: 20px;
	font-weight: 500;
	font-family: 'Ubuntu';
}

@include mq($tablet)
{
	.documents-page
	{
		margin-bottom: 60px;
	}

	.documents-page__title
	{
		margin-bottom: 30px;
	}
}

@include mq($wd)
{
	.documents-page
	{
		margin-bottom: 80px;
	}

	.documents-page__title
	{
		font-size: 26px;
		line-height: 38px;
	}
}
</style>
