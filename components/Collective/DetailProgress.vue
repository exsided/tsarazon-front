<template>
	<div class="detail-progress">
		<div class="detail-progress__wr">
			<p class="detail-progress__text detail-progress__text--bold">
				165 867 участников
			</p>
			<div class="detail-progress__progressbar">
				<ProgressbarVue is-big />
			</div>
			<div class="detail-progress__order">
				<p class="detail-progress__text">
					Мин. заказ: 70 000 <i class="ruble">₽</i>
				</p>
				<p class="detail-progress__text detail-progress__text--orange">
					Еще 48 214 <i class="ruble">₽</i>
				</p>
			</div>
		</div>
		<p class="detail-progress__value">
			60%
		</p>
	</div>
</template>

<script setup>
import ProgressbarVue from '~/components/Progressbar.vue';
</script>

<style lang="scss">
.detail-progress
{
	display: flex;
	align-items: center;
	gap: 8px;
	p
	{
		margin-bottom: 0;
	}

	.detail-progress__text--bold
	{
		margin-bottom: 8px;
	}
}

.detail-progress__wr
{
	width: 100%;
}

.detail-progress__progressbar
{
	margin-bottom: 7px;

	.progressbar
	{
		width: 100%;
	}
}

.detail-progress__value
{
	color: $gray;
	font-size: 14px;
	line-height: 20px;
}

.detail-progress__order
{
	display: flex;
	justify-content: space-between;
}

.detail-progress__text
{
	color: $gray;
	font-size: 11px;
	line-height: 16px;

	&--orange
	{
		color: $red;
	}

	&--bold
	{
		font-weight: 600;
		line-height: 18px;
	}
}

@include mq($tablet)
{
	.detail-progress
	{
		gap: 13px;
		.detail-progress__text--bold
		{
			margin-bottom: 6px;
		}
	}

	.detail-progress__value
	{
		font-size: 16px;
	}
}

@include mq($wd)
{
	.detail-progress
	{
		gap: 21px;
	}

	.detail-progress__text
	{
		font-size: 14px;
	}

	.detail-progress__value
	{
		font-size: 20px;
	}
}
</style>
