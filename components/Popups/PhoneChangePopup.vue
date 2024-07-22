<template>
	<div class="phone-change-popup">
		<PhoneChangeForm :phone="phone" @success="onSuccess" @error="onError" />
	</div>
</template>

<script setup>
import PhoneChangeForm from '~/components/Forms/PhoneChangeForm.vue';
import { usePopupsStore } from '~/store';

const emit = defineEmits(['close']);
const popupsStore = usePopupsStore();

const phone = popupsStore.data.phone;

const onSuccess = () => emit('close', { _data: { success: true } });
const onError = () => emit('close', { _data: { success: false } });
</script>

<style lang="scss">
	.phone-change-popup
	{
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
	}
</style>
