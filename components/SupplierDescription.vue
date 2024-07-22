<template>
	<div class="supplier-description">
		<img class="supplier-description__img" :src="logo">
		<div class="supplier-description__content">
			<div class="supplier-description__block">
				<h3 class="supplier-description__title">
					{{ name }}
				</h3>
				<verifiedSvg v-if="allActual" class="supplier-description__icon" />
			</div>
			<div class="supplier-description__text">
				<div
					class="supplier-description__text-content"
					v-html="formattedDescripion"
				/>
				<span
					v-if="canShowMore"
					to="#"
					class="supplier-description__text-link"
					@click="toggleDescription"
				>
					<template v-if="showFullDescription">
						Свернуть
					</template>
					<template v-else>
						Ещё
					</template>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import verifiedSvg from '~/assets/svg/verified-check.svg?skipsvgo';

const props = defineProps({
	logo:
	{
		type: String,
		default: '/svg/supplier-logo1.svg',
	},
	name:
	{
		type: String,
		default: 'ООО “Стокгольм”',
	},
	description:
	{
		type: String,
		default: 'Мы всегда рады вашим вопросам и отзывам, которые помогают нам улучшать наш сайт и сделать процесс коллективных закупок более удобным и эффективным для каждого участника.Хочу обратить ваше внимание на важность соблюдения правил нашего сайта. Дубль... Мы всегда рады вашим вопросам и отзывам, которые помогают нам улучшать наш сайт и сделать процесс коллективных закупок более удобным и эффективным для каждого участника.Хочу обратить ваше внимание на важность соблюдения правил нашего сайта... Мы всегда рады вашим вопросам и отзывам, которые помогают нам улучшать наш сайт и сделать процесс коллективных закупок более удобным и эффективным для каждого участника.Хочу обратить ваше внимание на важность соблюдения правил нашего сайта... Мы всегда рады вашим вопросам и отзывам, которые помогают нам улучшать наш сайт и сделать процесс коллективных закупок более удобным и эффективным для каждого участника.Хочу обратить ваше внимание на важность соблюдения правил нашего сайта',
	},
	allActual:
	{
		type: Boolean,
		default: false,
	},
});

const descMaxChars = 240;

const showFullDescription = ref(false);

const formattedDescripion = computed(() =>
{
	if (canShowMore.value && !showFullDescription.value)
		return props.description.substr(0, descMaxChars) + ' ';

	return props.description;
});

const toggleDescription = () => showFullDescription.value = !showFullDescription.value;
const canShowMore = computed(() => props.description.length > descMaxChars);
</script>

<style lang="scss">
.supplier-description
{
	display: flex;
	align-items: flex-start;
	column-gap: 14px;
	margin-bottom: 20px;
}

.supplier-description__block{display:flex;}

.supplier-description__icon
{
	margin: -2px 0 0 10px;
	min-width: 24px;
}

.supplier-description__img
{
	width: 100%;
	max-width: 50px;
	flex-shrink: 0;
}

.supplier-description__title
{
	color: #2C2C2C;
	font-size: 14px;
	font-weight: 600;
	line-height: normal;
	line-height: 19px;
	margin: 0;
}

.supplier-description__text
{
	color: #868799;
	font-size: 11px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: -0.02em;
	margin: 0;
}

.supplier-description__text-content { display: inline; }

.supplier-description__text-link
{
	color: #F69421;
	cursor: pointer;
}

@include mq($tablet)
{
	.supplier-description
	{
		column-gap: 24px;
		margin-bottom: 20px;
	}

	.supplier-description__img { max-width: 60px; }

	.supplier-description__icon{ min-width: 30px; }
}

@include mq($wd)
{
	.supplier-description { margin-bottom: 32px; }

	.supplier-description__img { max-width: 70px; }

	.supplier-description__title
	{
		font-size: 16px;
		line-height: 22px;
	}

	.supplier-description__text
	{
		font-size: 14px;
		line-height: 19px;
	}
}
</style>
