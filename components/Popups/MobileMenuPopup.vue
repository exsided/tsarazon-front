<template>
	<div class="mobile-menu-popup">
		<LkMenu @logout="close" @click-on-link="close" />
	</div>
</template>

<script setup>
import LkMenu from '~/components/LK/Menu.vue';

const emit = defineEmits(['close']);

const close = () => emit('close');
</script>

<style lang="scss">
.mobile-menu-popup
{
	.lk-menu
	{
		display: block;
	}
}
</style>
