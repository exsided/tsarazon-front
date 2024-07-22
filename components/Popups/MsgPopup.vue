<template>
	<div class="msg-popup">
		<SuccessSvg
			v-if="showSuccesIcon"
			class="msg-popup__icon"
		/>
		<p
			v-if="msg"
			class="msg-popup__text"
			v-html="msg"
		/>
	</div>
</template>

<script setup>
import SuccessSvg from '~/assets/svg/success.svg';
import { usePopupsStore } from '~/store';

const popupsStore = usePopupsStore();

const showSuccesIcon = computed(() => popupsStore.data?.showSuccesIcon);
const msg = computed(() => popupsStore.data?.msg);
</script>

<style lang="scss">
	.msg-popup
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 214px;
		width: 100%;
	}
	.msg-popup__text
	{
		font-weight: 600;
		font-size: 13px;
		line-height: 14px;
		text-align: center;
	}
	.msg-popup__icon
	{
		margin-bottom: 10px;
	}

	@include mq(0, $tablet - 1px)
	{
		.msg-popup
		{
			padding-top: 100px;
		}
	}
	@include mq($tablet)
	{
		.msg-popup
		{
			width: 420px;
		}
	}
</style>
