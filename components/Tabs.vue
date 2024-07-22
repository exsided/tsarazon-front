<template>
	<div class="tabs">
		<div class="tabs__menu-wr">
			<div class="tabs__menu">
				<button
					v-for="item in list"
					:key="item.code"
					:class="{ active: activeTab === item.code }"
					class="tabs__menu-btn"
					@click="onTabChange(item)"
				>
					{{ item.name }}
				</button>
			</div>
			<div class="tabs__gradient" />
		</div>
		<div class="tabs__content">
			<slot />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	activeTab:
	{
		type: [String, Number],
		default: '0',
	},
	list:
	{
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(['update:active-tab']);

const onTabChange = tab => emit('update:active-tab', tab.code);
</script>

<style lang="scss">
	.tabs__menu-wr
	{
		position: relative;
		width: 100%;
	}

	.tabs__menu
	{
		width: 100%;
		background: #E3EEF2;
		border-radius: 14px;
		padding: 6px 0 6px 6px;
		overflow: auto hidden;
		display: flex;
		-ms-overflow-style: none;
		scrollbar-width: none;
		margin-bottom: 20px;

		&::-webkit-scrollbar { display: none; }
	}

	.tabs__gradient
	{
		width: 46px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background: linear-gradient(90deg, rgba(240, 240, 244, 0.00) 0%, rgba(255, 255, 255, 0.90) 100%);
		pointer-events: none;
	}

	.tabs__menu-btn
	{
		height: 34px;
		padding: 0 20px;
		font-size: 14px;
		line-height: 21px;
		color: #868799;
		letter-spacing: -0.14px;
		background-color: unset;
		border: unset;
		white-space: nowrap;
		@include transition();

		&:focus { outline: unset; }

		&.active
		{
			color: $white;
			background: #3772FE;
			border-radius: 10px;
		}
	}

	@include mq($tablet)
	{
		.tabs__menu-btn
		{
			height: 38px;
		}

		.tabs__gradient
		{
			width: 101px;
		}
	}

	@include mq($wd)
	{
		.tabs__menu-btn
		{
			height: 47px;
			font-size: 16px;
			line-height: 24px;
			padding: 0 25px;
		}

		.tabs__gradient
		{
			width: 101px;
		}
	}
</style>
