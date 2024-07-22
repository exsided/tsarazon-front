<template>
	<div class="header-catalog" @mouseleave="close">
		<div class="header-catalog__section">
			<CustomScrollbar>
				<NuxtLink
					v-for="item in items"
					:key="item.id"
					:to="item.path"
					:class="{active: visibleCatalogs[0] && visibleCatalogs[0]?.parentId === item.id}"
					class="header-catalog__item"
					@mouseover="onHover(0, item.id, item.childrens)"
				>
					{{ item.title }}
					<ArrowRightSvg v-if="item.childrens && item.childrens.length" />
				</NuxtLink>
			</CustomScrollbar>
		</div>
		<TransitionGroup name="header-catalog__section">
			<div
				v-for="section, sectionIdx in visibleCatalogs"
				:key="`childrens-${section.parentId}`"
				class="header-catalog__section"
			>
				<CustomScrollbar>
					<NuxtLink
						v-for="item in section.items"
						:key="item.id"
						:to="item.path"
						:class="{active: visibleCatalogs[sectionIdx + 1] && visibleCatalogs[sectionIdx + 1].parentId === item.id}"
						class="header-catalog__item"
						@mouseover="onHover(sectionIdx + 1, item.id, item.childrens)"
					>
						{{ item.title }}
						<ArrowRightSvg v-if="item.childrens && item.childrens.length" />
					</NuxtLink>
				</CustomScrollbar>
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup>
import ArrowRightSvg from '~/assets/svg/arrow-right.svg?skipsvgo';
import CustomScrollbar from '~/components/CustomScrollbar.vue';
import { useCatalogStore } from '~/store';

const catalogStore = useCatalogStore();
const items = catalogStore.getCategoriesWithLinks;
const visibleCatalogs = reactive([]);

const onHover = (lvl, parentId, childrens) =>
{
	visibleCatalogs.splice(lvl, visibleCatalogs.length);

	if (!childrens || !childrens.length)
		return;

	visibleCatalogs.push({ parentId, items: childrens });
};
</script>

<style lang="scss">
	.header-catalog
	{
		position: relative;
		display: flex;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 14px rgba(93, 95, 107, 0.1);
		border-radius: 10px;
		flex: 1;
		padding: 20px 0;
		gap: 14px;
		max-height: 497px;
	}
	.header-catalog__section
	{
		width: 276px;
	}
	.header-catalog__item
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 600;
		font-size: 15px;
		line-height: 22px;
		letter-spacing: -0.01em;
		color: #868799;
		padding: 5px 16px;
		@include transition();
		cursor: pointer;
		border-radius: 5px;

		path
		{
			stroke: $gray;
			stroke-width: 1px;
			@include transition();
		}

		&:hover, &.active
		{
			background-color: #F4F5F7;
			color: $blue;

			path { stroke: $blue; }
		}
	}
	.header-catalog__section-leave-active { position: absolute; }
	.header-catalog__section-move,
	.header-catalog__section-enter-active,
	.header-catalog__section-leave-active { transition: all 0.5s ease; }
	.header-catalog__section-enter-from,
	.header-catalog__section-leave-to
	{
		opacity: 0;
		transform: translateX(-5px);
		z-index: -1;
	}
</style>
