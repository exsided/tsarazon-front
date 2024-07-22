<template>
	<TitleSection
		title="Коллективные закупки"
		class="collective-list"
	>
		<template #top>
			<NuxtLink class="button button--light-blue">
				<RoundedPlusSvg /> Предложить закупку
			</NuxtLink>
		</template>
		<template #default>
			<TabsVue v-model:activeTab="activeTab" :list="tabs">
				<NuxtLink class="button button--light-blue">
					<RoundedPlusSvg /> Предложить закупку
				</NuxtLink>
				<div class="collective-list__heading">
					<div class="collective-list__column">
						Фото
					</div>
					<div class="collective-list__column">
						Наименование
					</div>
					<div class="collective-list__column">
						Город <span class="collective-list__column-supply">поставки</span>
					</div>
					<div class="collective-list__column">
						Цена, <i class="ruble">₽</i>/шт.
					</div>
					<div class="collective-list__column">
						Статус
					</div>
					<div class="collective-list__column">
						Прием заявок
					</div>
					<div class="collective-list__column">
						<span> Ожидаемая поставка </span>
						<TooltipVue>
							<template #trigger>
								<img src="/svg/tooltip.svg">
							</template>
							<template #content>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</template>
						</TooltipVue>
					</div>
				</div>
				<div class="collective-list__items">
					<CollectiveCard v-for="item, i in visibleItems" :key="i" />
				</div>
			</TabsVue>
			<div class="collective-list__btns">
				<button class="collective-list__btn button">
					Предложить закупку
				</button>
				<button class="collective-list__btn button">
					Смотреть все закупки
				</button>
			</div>
		</template>
		<template #bottom>
			<NuxtLink class="button button--light-blue">
				Смотреть все закупки
			</NuxtLink>
		</template>
	</TitleSection>
</template>

<script setup>
import TitleSection from '@/components/TitleSection';
import TooltipVue from '@/components/Tooltip.vue';
import CollectiveCard from '@/components/Collective/Card.vue';
import TabsVue from '@/components/Tabs.vue';

import RoundedPlusSvg from '~/assets/svg/rounded-plus.svg?skipsvgo';

const items = reactive({
	1: 5,
	2: 3,
	3: 5,
	4: 9,
	5: 7,
	6: 4,
	7: 10,
	8: 8,
	9: 7,
});

const tabs = ref([
	{ name: 'Каши и фрукты', code: '1', },
	{ name: 'Сахар, соль, специи', code: '2', },
	{ name: 'Легко готовить', code: '3', },
	{ name: 'Здоровое питание', code: '4', },
	{ name: 'Сладости', code: '5', },
	{ name: 'Орехи, сухофрукты', code: '6', },
	{ name: 'Горячие напитки', code: '7', },
	{ name: 'Холодные напитки', code: '8', },
	{ name: 'Чай, кофе, какао', code: '9', },
]);

const activeTab = ref(tabs.value[0].code);

const visibleItems = computed(() => items[activeTab.value]);
</script>

<style lang="scss">
	.collective-list
	{
		.tabs
		{
			.button--light-blue
			{
				font-size: 13px;
				font-weight: 600;
				line-height: 150%;
				height: 38px;
				width: 100%;

				svg { margin-right: 6px; }
			}
		}
		.tabs__menu
		{
			margin-bottom: 10px;
		}
	}
	.collective-list__heading
	{
		display: none;
	}

	.collective-list__btns
	{
		display: none;
		width: 100%;
		justify-content: center;
		gap: 10px;
	}

	.collective-list__btn
	{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 38px;
		padding: 10px 16px;
		border: none;
		border-radius: 10px;
		background: #E3EEF2;
		color: #3772FE;
		font-size: 13px;
		line-height: 20px;
		font-weight: 600;
		letter-spacing: -0.13px;
	}

	.collective-list__column
	{
		color: #868799;
		font-size: 12px;
		line-height: 16px;
		position: relative;

		&:nth-of-type(1)
		{
			flex-basis: 6%;
		}

		&:nth-of-type(2)
		{
			flex-basis: 22%;
		}

		&:nth-of-type(3)
		{
			flex-basis: 10.5%;
		}

		&:nth-of-type(4)
		{
			flex-basis: 12%;
		}

		&:nth-of-type(5)
		{
			flex-basis: 17.5%;
		}

		&:nth-of-type(6)
		{
			flex-basis: 13.5%;
		}

		.tooltip
		{
			position: absolute;
			top: -5px;
			right: -10px;
			width: 8px;
			height: 8px;
		}

	}

	.collective-list__column-supply
	{
		display: none;
	}

	.collective-list__items
	{
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	@include mq($mobile)
	{
		.collective-list
		{
			.tabs
			{
				.button--light-blue
				{
					width: fit-content;
					margin: 0 auto 20px;
				}
			}
		}
	}

	@include mq($tablet)
	{
		.collective-list
		{
			.tabs
			{
				.button--light-blue { display: none; }
			}
		}

		.collective-list__heading
		{
			display: flex;
			border-radius: 10px;
			background: #F4F5F7;
			padding: 11px 14px;
		}
	}

	@include mq($wd)
	{
		.collective-list__heading
		{
			display: flex;
			padding: 16px 50px;
		}

		.collective-list__column
		{
			font-size: 16px;
			line-height: 22px;
			white-space: nowrap;

			&:nth-of-type(2)
			{
				flex-basis: 25%;
			}

			&:nth-of-type(3)
			{
				flex-basis: 15%;
			}

			&:nth-of-type(4)
			{
				flex-basis: 10.5%;
			}

			&:nth-of-type(5)
			{
				flex-basis: 17%;
			}

			&:nth-of-type(6)
			{
				flex-basis: 13.5%;
			}

			.tooltip
			{
				top: -9px;
			}
		}

		.collective-list__column-supply
		{
			display: inline;
		}
	}
</style>
