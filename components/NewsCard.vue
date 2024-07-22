<template>
	<div class="news-card">
		<NuxtLink :to="link" class="news-card__picture">
			<img :src="image">
		</NuxtLink>
		<NuxtLink :to="link" class="news-card__title">
			{{ title }}
		</NuxtLink>
		<div class="news-card__text">
			{{ text }}
			<NuxtLink
				:to="link"
				class="news-card__text-link"
			>
				Смотреть полностью
			</NuxtLink>
		</div>
		<p class="news-card__data">
			{{ publishDate }}
		</p>
	</div>
</template>

<script setup>
const props = defineProps({
	image:
	{
		type: String,
		required: true,
		default: '/img/news-card-1.png',
	},
	slug:
	{
		type: String,
		required: true,
		default: '',
	},
	title:
	{
		type: String,
		required: true,
		default: '',
	},
	text:
	{
		type: String,
		required: true,
		default: '123324',
	},
	publishDate:
	{
		type: String,
		required: true,
		default: '',
	},
});

const link = computed(() => `/news/${props.slug}`);
</script>

<style lang="scss">
.news-card
{
	display: flex;
	flex-direction: column;
}

.news-card__picture
{
	width: 100%;
	display: block;
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 16px;
	aspect-ratio: 1.56/1;

	img
	{
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}
}

.news-card__title
{
	display: block;
	font-family: 'Ubuntu';
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
	margin-bottom: 10px;
	@include transition();

	&:hover
	{
		color: $blue;
	}
}

.news-card__text
{
	font-size: 14px;
	line-height: 19px;
	margin-bottom: 10px;
}

.news-card__text-link
{
	color: $orange;
	@include transition();

	&:hover
	{
		color: $blue;
	}
}

.news-card__data
{
	font-size: 16px;
	line-height: 22px;
	color: $gray;
	margin-bottom: 0;
	display: flex;
	align-items: flex-end;
	flex-grow: 1;
}

@include mq($tablet)
{
	.news-card__title
	{
		font-size: 17px;
		line-height: 20px;
	}
}

@include mq($wd)
{
	.news-card__title
	{
		font-size: 22px;
		line-height: 25px;
	}
}
</style>
