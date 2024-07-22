<template>
	<div class="spoiler" :class="{'open': isOpen}">
		<div class="spoiler__head" @click="toggle">
			<slot name="head" />
		</div>
		<div class="spoiler__content" :style="{'height': height}">
			<div ref="inner" class="spoiler__content-inner">
				<div class="spoiler__content-wr">
					<div class="spoiler__content-slot">
						<slot name="content" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const inner = ref(null);
const isOpen = ref(false);
const height = ref('0px');

const open = () =>
{
	isOpen.value = true;
	nextTick(() =>
	{
		height.value = `${inner.value.offsetHeight}px`;

		setTimeout(() =>
		{
			height.value = 'auto';
		}, 300);
	});
};

const close = () =>
{
	height.value = `${inner.value.offsetHeight}px`;
	setTimeout(() =>
	{
		height.value = '0px';
		setTimeout(() =>
		{
			isOpen.value = false;
		}, 300);
	}, 0);
};

const toggle = () => isOpen.value ? close() : open();
</script>

<style lang="scss">
	.spoiler__content
	{
		overflow: hidden;
		transform-origin: top;
		height: 0;
		@include transition();
	}
</style>
