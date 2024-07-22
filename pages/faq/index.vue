<template>
	<NuxtLayout name="default">
		<div class="faq-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
				<h1 class="faq-page__title">
					{{ title }}
				</h1>
				<div class="faq-page__list faq-page__list--mobile">
					<div
						v-for="group in mobileItems"
						:key="group.id + group.title"
						class="faq-page__item"
					>
						<h2 class="faq-page__item-title">
							{{ group.title }}
						</h2>
						<NuxtLink
							v-for="faq in group.faqs"
							:key="faq.id"
							class="faq-page__item-link"
							:to="`/faq/${group.slug}/${faq.slug}`"
						>
							{{ faq.title }}
						</NuxtLink>
					</div>
				</div>

				<div class="faq-page__list faq-page__list--tablet">
					<div
						v-for="column, i in tabletItems"
						:key="`columns-${i}`"
						class="faq-page__list-column"
					>
						<div
							v-for="group in column"
							:key="group.id + group.title"
							class="faq-page__item"
						>
							<h2 class="faq-page__item-title">
								{{ group.title }}
							</h2>
							<NuxtLink
								v-for="faq in group.faqs"
								:key="faq.id"
								class="faq-page__item-link"
								:to="`/faq/${group.slug}/${faq.slug}`"
							>
								{{ faq.title }}
							</NuxtLink>
						</div>
					</div>
				</div>

				<div class="faq-page__list faq-page__list--desktop">
					<div
						v-for="column, i in desktopItems"
						:key="`columns-${i}`"
						class="faq-page__list-column"
					>
						<div
							v-for="group in column"
							:key="group.id + group.title"
							class="faq-page__item"
						>
							<h2 class="faq-page__item-title">
								{{ group.title }}
							</h2>
							<NuxtLink
								v-for="faq in group.faqs"
								:key="faq.id"
								class="faq-page__item-link"
								:to="`/faq/${group.slug}/${faq.slug}`"
							>
								{{ faq.title }}
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ContactsForm />
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import ContactsForm from '~/components/Forms/ContactsForm.vue';
import { CHUNK_ARRAY } from '~/helpers/formatters.js';
import { useFaqStore } from '~/store';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'FAQ', link: '/faq' }];
const title = 'Вопросы и ответы';

useHead({ title: 'Вопросы и ответы' });

const faqStore = useFaqStore();

if (!faqStore.items.length)
	await faqStore.fetchAll();

const mobileItems = computed(() => faqStore.items);
const tabletItems = computed(() => CHUNK_ARRAY(faqStore.items, 2));
const desktopItems = computed(() => CHUNK_ARRAY(faqStore.items, 3));
</script>

<style lang="scss">
.faq-page
{
	margin-bottom: 50px;
}

.faq-page__title
{
	margin-bottom: 30px;
	font-weight: 500;
	font-family: 'Ubuntu';
}

.faq-page__list
{
	display: flex;
	flex-direction: column;
	gap: 30px;

	&--tablet
	{
		display: none;
	}

	&--desktop
	{
		display: none;
	}
}

.faq-page__item
{
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.faq-page__item-title
{
	font-size: 18px;
	line-height: 21px;
	font-family: 'Ubuntu';
	font-weight: 500;
	color: #000;
	margin-bottom: 4px;
}

.faq-page__item-link
{
	color: $blue;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.12px;
	width: fit-content;
	@include transition();

	&:hover
	{
		color: $orange;
	}
}

@include mq($tablet)
{
	.faq-page
	{
		margin-bottom: 60px;
	}

	.faq-page__list
	{
		&--mobile
		{
			display: none;
		}

		&--tablet
		{
			display: flex;
			flex-direction: row;
			gap: 59px;
		}
	}

	.faq-page__list-column
	{
		display: flex;
		flex-direction: column;
		gap: 30px;
		flex-basis: 320px;
	}

	.faq-page__item-title
	{
		font-size: 20px;
		line-height: 23px;
		margin-bottom: 12px;
	}
}

@include mq($desktop)
{
	.faq-page__list
	{
		&--tablet
		{
			display: none;
		}

		&--desktop
		{
			display: flex;
			flex-direction: row;
			gap: 20px;
			justify-content: space-between;
		}
	}
}

@include mq($wd)
{
	.faq-page
	{
		margin-bottom: 80px;
	}

	.faq-page__title
	{
		font-size: 26px;
		line-height: 38px;
	}

	.faq-page__list
	{
		&--desktop
		{
			gap: 90px;
		}
	}

	.faq-page__list-column
	{
		flex-basis: 400px;
	}

	.faq-page__item-title
	{
		font-size: 22px;
		line-height: 25px;
	}

	.faq-page__item-link
	{
		font-size: 14px;
		line-height: 21px;
	}

}
</style>
