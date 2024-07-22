<template>
	<NuxtLayout name="default">
		<div class="contacts container">
			<UiBreadcrumbs :items="breadcrumbs" />
			<h1 class="contacts__title">
				Контакты
			</h1>
			<div class="contacts__wr">
				<div class="contacts__data">
					<div class="contacts__item">
						<p class="contacts__item-text">
							Режим работы платформы:
						</p>
						<p class="contacts__item-text">
							круглосуточно 24/7
						</p>
					</div>

					<div class="contacts__item">
						<p class="contacts__item-text">
							Режим работы техподдержки:
						</p>
						<p class="contacts__item-text">
							пн - пт с 9:00 до 18:00
						</p>
					</div>

					<div class="contacts__links">
						<NuxtLink class="contacts__link" :to="`tel:${phone}`">
							<div class="contacts__link-icon">
								<PhoneSvg />
							</div>
							{{ phone }}
						</NuxtLink>
						<NuxtLink class="contacts__link" :to="`mailto:${email}`">
							<div class="contacts__link-icon">
								<LetterSvg />
							</div>
							{{ email }}
						</NuxtLink>
					</div>

					<SocialBtns />

					<div class="contacts__item">
						<h3 class="contacts__item-title">
							Сервис доступен в регионах:
						</h3>
						<p class="contacts__item-text">
							г. Владикавказ, Ростов на Дону, и т.д.
						</p>
					</div>

					<div class="contacts__item">
						<h3 class="contacts__item-title">
							Реквизиты
						</h3>
						<p class="contacts__item-text">
							г. Владикавказ, ул.Проспект Коста, д.120
						</p>
						<NuxtLink class="contacts__item-link" to="/requisites">
							См. реквизиты организации
						</NuxtLink>
					</div>
				</div>
				<div id="map" class="contacts__map" />
			</div>
		</div>
		<ContactsForm :show-contacts="false" />
	</NuxtLayout>
</template>

<script setup>
import ContactsForm from '~/components/Forms/ContactsForm.vue';
import PhoneSvg from '~/assets/svg/phone.svg?skipsvgo';
import LetterSvg from '~/assets/svg/letter.svg?skipsvgo';
import { useMainStore } from '~/store';
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import SocialBtns from '~/components/SocialBtns.vue';

const mainStore = useMainStore();

const map = ref(null);

const phone = computed(() => mainStore.phone);
const email = computed(() => mainStore.email);

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Контакты', link: '/contacts' }];

useHead({ title: 'Контакты' });

const loadMap = () =>
{
	if (window.ymaps)
		initMap();
	else
	{
		const script = document.createElement('script');

		script.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
		script.addEventListener('load', () => initMap());
		document.head.appendChild(script);
	}
};
const initMap = () =>
{
	window.ymaps.ready(setupMap);
};
const setupMap = () =>
{
	const mapOptions =
	{
		center: [43.024616, 44.681771],
		zoom: 13,
		controls: ['zoomControl'],
	};

	map.value = new window.ymaps.Map('map', mapOptions);

	map.value.geoObjects.add(new ymaps.Placemark([55.847, 37.6]));
};

onMounted(() => loadMap());
</script>

<style lang="scss">
	.contacts__title
	{
		margin-bottom: 20px;
	}
	.contacts__wr
	{
		margin-bottom: 40px;

		.social-btns
		{
			justify-content: flex-start;
			margin-bottom: 20px;
		}
	}
	.contacts__item
	{
		margin-bottom: 16px;
	}
	.contacts__item-title
	{
		font-family: Ubuntu;
		font-size: 15px;
		font-weight: 500;
		margin: 0 0 4px;
	}
	.contacts__item-text
	{
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 150%;
		letter-spacing: -0.13px;
		margin: 0;
	}
	.contacts__item-link
	{
		font-size: 14px;
		line-height: 150%;
		letter-spacing: -0.14px;
		color: $blue;
	}
	.contacts__link
	{
		display: flex;
		font-size: 14px;
		line-height: 20px;
		margin-bottom: 10px;
		@include transition();

		&:hover { color: $orange; }
	}

	.contacts__link-icon
	{
		margin-right: 8px;
		width: 18px;
		height: 18px;

		path { stroke: $orange; }
	}
	.contacts__links
	{
		margin-bottom: 16px;
	}
	.contacts__map
	{
		margin: 0 -15px;
		height: 236px;
		width: calc(100% + 30px);
		border-radius: 10px;
		overflow: hidden;
	}

	@include mq($tablet)
	{
		.contacts__title { margin-bottom: 12px; }
		.contacts__wr
		{
			display: flex;
			margin-bottom: 54px;

			.social-btns { margin-bottom: 26px; }
		}
		.contacts__data
		{
			min-width: 280px;
			width: 280px;
			margin-right: 30px;
		}
		.contacts__item { margin-bottom: 20px; }
		.contacts__item-title
		{
			font-size: 16px;
			font-weight: 500;
		}
		.contacts__item-text
		{
			font-size: 14px;
		}
		.contacts__link
		{
			font-size: 16px;
			line-height: 20px;
		}
		.contacts__links { margin-bottom: 20px; }
		.contacts__map
		{
			margin: 0;
			width: 100%;
			height: auto;
		}
	}

	@include mq($wd)
	{
		.contacts__title
		{
			margin-bottom: 20px;
		}
		.contacts__wr
		{
			margin-bottom: 80px;

			.social-btns { margin-bottom: 30px; }
		}
		.contacts__item { margin-bottom: 30px; }
		.contacts__item-title
		{
			font-size: 20px;
			font-weight: 500;
			margin-bottom: 10px;
		}
		.contacts__links
		{
			display: flex;
			column-gap: 40px;
		}
		.contacts__data
		{
			min-width: 445px;
			width: 445px;
			margin-right: 135px;
		}
		.contacts__link
		{
			font-size: 18px;
			line-height: 20px;
		}
		.contacts__link-icon
		{
			width: 20px;
		}
	}
</style>
