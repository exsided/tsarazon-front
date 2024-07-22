<template>
	<section class="title-section">
		<div class="container">
			<div class="title-section__heading">
				<h2 class="title-section__title">
					<NuxtLink
						v-if="props.titleLink"
						:to="props.titleLink"
					>
						{{ props.title }}
					</NuxtLink>
					<template v-else>
						{{ props.title }}
					</template>
				</h2>
				<TooltipVue>
					<template #trigger>
						<img src="/svg/tooltip.svg">
					</template>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</template>
				</TooltipVue>
				<div class="title-section__heading-btn">
					<slot name="top" />
				</div>
			</div>
			<div class="title-section__content">
				<slot />
			</div>
			<div class="title-section__bottom">
				<slot name="bottom" />
			</div>
		</div>
	</section>
</template>

<script setup>
import TooltipVue from '@/components/Tooltip.vue';

const props = defineProps({
	title:
	{
		type: String,
		default: '',
	},
	titleLink:
	{
		type: String,
		default: '',
	},
});
</script>

<style lang="scss">
.title-section
{
	margin-bottom: 40px;
}

.title-section__heading
{
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	.tooltip
	{
		align-self: flex-start;
	}
}

.title-section__title
{
	font-family: "Ubuntu", sans-serif;
	font-weight: 700;
	font-size: 19px;
	line-height: 22px;
	margin: 0;
	margin-right: 5px;
}

.title-section__heading-link
{
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	color: #F69421;
}

.title-section__bottom
{
	display: flex;
	justify-content: center;
}

.title-section__heading-btn
{
	display: none;
}

.title-section__heading-btn, .title-section__bottom
{
	.button--light-blue
	{
		font-size: 13px;
		font-weight: 600;
		line-height: 150%;
		height: 38px;
		width: 100%;

		svg { margin-right: 10px; }
	}
}

@include mq($mobile)
{
	.title-section__heading-btn, .title-section__bottom
	{
		.button--light-blue
		{
			width: fit-content	;
		}
	}
}

@include mq($tablet)
{
	.title-section{margin-bottom: 50px;	}

	.title-section__heading{margin-bottom: 20px;}

	.title-section__title
	{
		font-size: 26px;
		line-height: 30px;
	}
	.title-section__heading-btn
	{
		display: block;
		margin-left: auto;
		svg { margin-right: 10px; }
	}
}

@include mq($wd)
{
	.title-section{margin-bottom: 80px;}

	.title-section__heading{margin-bottom: 30px;}

	.title-section__title
	{
		font-size: 32px;
		line-height: 44px;
	}
	.title-section__heading-btn, .title-section__bottom
	{
		.button--light-blue
		{
			font-size: 16px;
			height: 40px;
		}
	}
}
</style>
