<template>
	<NuxtLayout name="default">
		<MainSlider />
		<CollectiveList />
		<Showcase />
		<CatalogGrid />
		<BrandsSlider v-if="brandsList.length" :slides="brandsList" />
		<ContactsForm />
	</NuxtLayout>
</template>

<script setup>
import MainSlider from '~/components/Sliders/MainSlider.vue';
import CollectiveList from '~/components/Collective/List.vue';
import Showcase from '~/components/Showcase.vue';
import BrandsSlider from '~/components/Sliders/BrandsSlider.vue';
import CatalogGrid from '~/components/Catalog/Grid.vue';
import ContactsForm from '@/components/Forms/ContactsForm.vue';

const {
	fetchBrands,
	brandsList,
} = useBrandsSlider();

fetchBrands();

useHead({ title: 'Главная страница' });
</script>

<style lang="scss">
</style>
