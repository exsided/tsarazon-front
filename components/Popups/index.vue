<template>
	<transition name="popup">
		<div
			v-if="isOpen"
			class="popup"
			:class="popupsStore.name ? `popup--${popupsStore.name}` : ''"
			tabindex="1"
		>
			<div v-click-outside="close" class="popup__content">
				<div class="popup__close">
					<div class="popup__close-btn" @click="close">
						<CrossMarkSvg />
					</div>
				</div>
				<div class="popup__content-inner">
					<div class="popup__content-wr">
						<Suspense>
							<template #default>
								<PopupContent @close="close" />
							</template>
							<template #fallback>
								<div class="popup__preloader">
									<LoaderVue />
								</div>
							</template>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
import LoaderVue from '~/components/Loader.vue';
import CrossMarkSvg from '~/assets/svg/cross-mark.svg?skipsvgo';
import { usePopupsStore, useMainStore } from '~/store';

const instance = getCurrentInstance();

const popupsStore = usePopupsStore();
const mainStore = useMainStore();

const props = defineProps({ visible: Boolean });

const emit = defineEmits(['close', 'update:visible']);

const keyup = (event) =>
{
	if (event.keyCode === 27)
		close();
};
const close = (event = null) =>
{
	emit('close');
	emit('update:visible', false);
	popupsStore.setState(['', false]);

	if (popupsStore.data?.closeCallback)
		popupsStore.data.closeCallback(event?._data);
};

const isOpen = computed(() => popupsStore.open);

watch(isOpen, (newState) =>
{
	mainStore[newState ? 'disableScroll' : 'enableScroll'](instance.uid);
});

onMounted(() => document.addEventListener('keyup', keyup));
onBeforeUnmount(() => document.removeEventListener('keyup', keyup));

const PopupContent = computed(() =>
{
	const componentName = popupsStore.name;

	if (componentName)
		return defineAsyncComponent(() => import(`~/components/Popups/${componentName}.vue`));
	else
		return false;
});

</script>

<style lang="scss">
	.popup
	{
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		background-color: #2C2C2C90;
	}
	.popup__content
	{
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		height: auto;
		max-height: 100%;
		height: 100%;
		max-width: 800px;
		width: 100%;
		overflow-y: auto;
		transition: transform .2s ease;
	}
	.popup__content-inner
	{
		padding: 40px 20px 10px;
	}
	.popup__content-wr
	{
		position: relative;
		display: flex;
		height: fit-content;
		width: 100%;
		min-height: 214px;
	}
	.popup__close
	{
		position: sticky;
		top: 20px;
		width: calc(100% - 10px);
		height: 0;
		z-index: 1;
	}
	.popup__close-btn
	{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		width: 24px;
		cursor: pointer;
		margin-left: auto;
		background-color: #F4F5F7;
		border-radius: 30px;

		svg
		{
			width: 12px;
			height: 12px;
		}

		@media (hover: hover)
		{
			path { @include transition(); }

			&:hover
			{
				svg
				{
					transform: rotate(90deg);
					@include transition();
				}

				path { stroke: $blue; }
			}
		}

		&:active { box-shadow: 0px 0px 10px rgba(93, 95, 107, 0.1); }
	}
	.popup-enter-active, .popup-leave-active
	{
		transition: opacity .5s;
	}
	.popup-enter-from, .popup-leave-to
	{
		opacity: 0;

		.popup__content
		{
			transform: scale(0);
		}
	}
	.popup__title
	{
		margin-bottom: 22px;
		max-width: 90%;
	}
	.popup__preloader
	{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	@include mq($tablet)
	{
		.popup
		{
			padding: 32px;
		}
		.popup__content
		{
			border-radius: 10px;
			height: auto;
			width: fit-content;
		}
		.popup__content-wr { min-width: 420px; }
		.popup__content-inner { padding: 18px 30px; }
		.popup__close { width: calc(100% - 30px); }
		.popup__close-btn { transform: translate(20px, -10px); }
	}
</style>
