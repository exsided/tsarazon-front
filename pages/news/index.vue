<template>
	<NuxtLayout name="default">
		<div class="news-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
				<h1 class="news-page__title">
					{{ title }}
				</h1>
				<div class="news-page__list">
					<NewsCard
						v-for="item in news"
						:key="item.id"
						:image="item.preview"
						:title="item.title"
						:text="item.short_description"
						:publish-date="item.publication_date"
						:slug="item.slug"
					/>
				</div>
				<div class="news-page__more">
					<button class="news-page__more-btn">
						Показать еще 24
					</button>
				</div>
				<UiPagination />
				<ScrollTop />
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import NewsCard from '~/components/NewsCard.vue';
import UiPagination from '~/components/UI/Pagination.vue';
import ScrollTop from '~/components/ScrollTop.vue';

import newsModule from '~/api/news.js';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Блог', link: '/news' }];
const title = 'Блог';
useHead({ title: 'Блог' });

const news = ref([]);

const { data } = await newsModule.fetch();

if (data.value)
	news.value = data.value.data.data.map(el => ({
		id: el.id,
		preview: el.preview[0] || '',
		title: el.title,
		short_description: el.short_description,
		publication_date: el.publication_date,
		slug: el.slug,
	}));
</script>

<style lang="scss">
.news-page
{
	margin-bottom: 50px;
}

.news-page__title
{
	margin-bottom: 30px;
	font-weight: 500;
	font-family: 'Ubuntu';
}

.news-page__list
{
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 40px;
	margin-bottom: 40px;
}

.news-page__more
{
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

.news-page__more-btn
{
	padding: 10px 20px;
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;
	border: none;
	border-radius: 10px;
	background: $lgray;
}

@include mq($tablet)
{
	.news-page
	{
		margin-bottom: 60px;
	}
	.news-page__list
	{
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 40px 30px;
	}

	.news-page__more-btn
	{
		font-size: 15px;
		line-height: 21px;
	}
}

@include mq($wd)
{
	.news-page
	{
		margin-bottom: 80px;
	}

	.news-page__title
	{
		font-size: 26px;
		line-height: 38px;
	}

	.news-page__list
	{
		grid-template-columns: repeat(3, 1fr);
		column-gap: 32px;
		margin-bottom: 50px;
	}

	.news-page__more-btn
	{
		font-size: 19px;
		line-height: 26px;
	}
}
</style>
