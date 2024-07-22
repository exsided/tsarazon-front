<template>
	<NuxtLayout name="default">
		<div class="container">
			<PageNotFound />
		</div>
	</NuxtLayout>
</template>

<script setup>
import PageNotFound from '@/components/PageNotFound.vue';

useHead({ title: 'Произошла ошибка' });
</script>

<style>

</style>
