<template>
	<NuxtLayout name="default">
		<div class="faq-detail container">
			<UiBreadcrumbs :items="breadcrumbs" />
			<div class="faq-detail__wr">
				<aside class="faq-detail__sideabr">
					<GoBack to="/faq">
						К вопросам
					</GoBack>
					<SpoilerVue
						v-for="item in items"
						:id="item.slug"
						:key="item.id + item.title"
						class="_faq-category"
					>
						<template #head>
							<span>
								{{ item.title }}
							</span>
							<ArrowBottomSvg />
						</template>
						<template #content>
							<a
								v-for="faq in item.faqs"
								:key="faq.id"
								:href="`/faq/${item.slug}/${faq.slug}`"
								@click.prevent="onClickLink(`/faq/${item.slug}/${faq.slug}`)"
							>
								{{ faq.title }}
							</a>
						</template>
					</SpoilerVue>
				</aside>
				<Transition name="fade">
					<div
						v-if="content"
						class="faq-detail__content"
						v-html="content"
					/>
				</Transition>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import SpoilerVue from '~/components/Spoiler.vue';
import GoBack from '~/components/GoBack.vue';
import ArrowBottomSvg from '~/assets/svg/arrow-bottom.svg?skipsvgo';
import { useFaqStore } from '~/store';
import faqModule from '~/api/faq.js';

definePageMeta({
	middleware: 'faq'
});

const faqStore = useFaqStore();
const router = useRouter();

const content = ref('');

const items = computed(() => faqStore.items);

useHead({ title: 'Вопросы и ответы' });

const breadcrumbs = reactive([{ name: 'Главная', link: '/' }, { name: 'Вопросы и ответы', link: '/faq' }]);

if (!faqStore.items.length)
	await faqStore.fetchAll();

const fetchDetail = async () =>
{
	const { data, error } = await faqModule.fetchDetail(getParams().slug);

	if (data.value?.success)
	{
		breadcrumbs.push({ name: data.value.data.title, link: router.currentRoute.value.fullPath });
		content.value = data.value.data.content;
	}

	if (error.value)
		throw createError({ statusCode: 404, message: '', fatal: true });
};

const openActiveSpoiler = () =>
{
	const category = getParams().category;

	document.querySelectorAll('._faq-category').forEach((el) =>
	{
		const isOpen = el.classList.contains('open');

		if (el.id === category && !isOpen)
			el.querySelector('.spoiler__head').click();

		if (el.id !== category && isOpen)
			el.querySelector('.spoiler__head').click();
	});
};

const getParams = () =>
{
	if (process.server)
		return router.currentRoute.value.params;
	else
	{
		const params = window ? window.location.pathname.split('/') : null;
		return { category: params[params.length - 2], slug: params[params.length - 1] };
	}
};

const onClickLink = async (url) =>
{
	history.pushState({}, '', url);

	openActiveSpoiler();

	content.value = '';

	await fetchDetail();
};

onMounted(() =>
{
	openActiveSpoiler();
	setTimeout(() => useScrollTo('.faq-detail__content'), 100);
});

await fetchDetail();
</script>

<style lang="scss">
	.faq-detail { margin-bottom: 50px; }
	.faq-detail__sideabr
	{
		.spoiler
		{
			&.open
			{
				.spoiler__head
				{
					svg { transform: rotate(180deg); }
				}
			}
		}
		.spoiler__head
		{
			position: relative;
			cursor: pointer;
			margin-bottom: 20px;

			span
			{
				font-family: Ubuntu;
				font-size: 14px;
				font-weight: 500;
				@include transition();
			}

			svg
			{
				position: absolute;
				right: 0;
				top: 6px;
				@include transition();
			}
			path
			{
				stroke-width: 2px;
				stroke: $black;
				@include transition();
			}

			@include hover()
			{
				span { color: $orange; }
				path { stroke: $orange; }
			}
		}

		.spoiler__content a
		{
			display: block;
			font-size: 12px;
			line-height: 150%;
			color: $gray;
			cursor: pointer;
			width: fit-content;
			@include transition();

			&:hover { color: $orange; }

			&:not(:last-child)
			{
				margin-bottom: 10px;
			}
		}

		.spoiler__content-slot { padding-bottom: 20px; }
	}

	.faq-detail__content
	{
		h1
		{
			font-family: Ubuntu;
			font-size: 16px;
			line-height: normal;
			font-weight: 500;
			margin-bottom: 20px;
		}

		p
		{
			font-size: 12px;
			line-height: 18px;
			letter-spacing: -0.12px;
			margin-bottom: 10px;
		}

		img
		{
			margin-top: 20px;
			margin-bottom: 20px;
			border-radius: 10px;
			width: fit-content;
			overflow: hidden;
			max-width: 100%;
		}
	}

	@include mq($tablet)
	{
		.faq-detail { margin-bottom: 60px; }
		.faq-detail__wr
		{
			display: flex;
			column-gap: 40px;
		}
		.faq-detail__sideabr { width: 265px; min-width: 265px; }
		.faq-detail__content
		{
			width: 100%;

			h1 { font-size: 18px; }
		}
	}

	@include mq($desktop)
	{
		.faq-detail__content
		{
			max-width: 630px;
		}
	}
	@include mq($wd)
	{
		.faq-detail { margin-bottom: 80px; }
		.faq-detail__wr { column-gap: 100px; }
		.faq-detail__sideabr
		{
			min-width: 300px;
			width: 300px;

			.spoiler__head { font-size: 16px; }
			.spoiler__content a { font-size: 13px; }
		}
		.faq-detail__content
		{
			h1 { font-size: 22px; }
			p { font-size: 14px; }
		}
	}
</style>
