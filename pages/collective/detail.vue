<template>
	<NuxtLayout name="default">
		<div class="collective-detail-page">
			<div class="container">
				<UiBreadcrumbs :items="breadcrumbs" />
				<div class="collective-detail-page__main">
					<ShareBtn />
					<div class="collective-detail-page__slider">
						<PhotosSlider />
					</div>
					<div class="collective-detail-page__purchase">
						<div class="collective-detail-page__heading">
							<h1>{{ title }}</h1>
							<div class="collective-detail-page__supplier">
								<p class="collective-detail-page__supplier-name">
									Товары бренда производителя:
								</p>
								<span>Mendeles</span>
							</div>
						</div>
						<DetailProgress />
						<button class="collective-detail-page__purchase-btn button button--blue">
							Участвовать
						</button>
					</div>
				</div>
				<div class="collective-detail-page__info">
					<CollectiveSpecifications />
					<CollectiveSteps />
				</div>
			</div>
			<CollectiveProducts />
			<div class="container">
				<SupplierDescription />
			</div>
			<CollectiveList />
			<ProductsSlider />
			<ProductsSlider />
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import PhotosSlider from '~/components/Sliders/PhotosSlider.vue';
import ShareBtn from '~/components/ShareBtn.vue';
import DetailProgress from '~/components/Collective/DetailProgress.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider';
import CollectiveSpecifications from '~/components/Collective/Specifications';
import CollectiveSteps from '~/components/Collective/Steps';
import CollectiveProducts from '~/components/Collective/Products';
import SupplierDescription from '~/components/SupplierDescription';
import CollectiveList from '~/components/Collective/List.vue';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Коллективные закупки', link: '/collective' }, { name: 'Коллективная закупка №2', link: '/collective/detail' }];
const title = 'Коллективная закупка №2';

const setupShare = () =>
{
	window.Ya.share2('share-btn', {
		content: {
			url: window.location.href,
			title: 'Коллективная закупка',
			description: 'Описание',
		}
	});
};

const loadYandexShare = () =>
{
	if (window?.Ya?.share2)
	{
		setupShare();
	}
	else
	{
		const script = document.createElement('script');

		script.setAttribute('src', 'https://yastatic.net/share2/share.js');
		script.addEventListener('load', () => setupShare());
		document.head.appendChild(script);
	}
};

onMounted(() => loadYandexShare());
useHead({ title: 'Коллективная закупка №2' });
</script>

<style lang="scss">
.collective-detail-page__main
{
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 40px;

	.share-btn
	{
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 2;
	}

	p { margin-bottom: 0; }
}

.collective-detail-page__slider
{
	margin-bottom: 30px;
}

.collective-detail-page__purchase
{

	.detail-progress
	{
		margin-bottom: 30px;
	}
}

.collective-detail-page__heading
{
	margin-bottom: 28px;

	h1
	{
		font-family: 'Ubuntu';
		font-weight: 700;
		line-height: 22px;
		margin-bottom: 14px;
	}
}

.collective-detail-page__supplier
{
	display: flex;
	font-size: 11px;

	span
	{
		color: $orange;
		font-size: 12px;
	}
}

.collective-detail-page__supplier-name
{
	color: $gray;
	margin-right: 8px;
}

.collective-detail-page__purchase-btn
{
	width: 220px;
	height: 36px;
	font-size: 14px;
	line-height: 19px;
	font-weight: 600;
	border-radius: 7px;
}

@include mq($tablet)
{
	.collective-detail-page__main
	{
		flex-direction: row;
		gap: 30px;
		margin-bottom: 50px;

		.share-btn
		{
			top: 0;
			right: 0;
		}
	}

	.collective-detail-page__slider
	{
		max-width: 290px;
		margin-bottom: 0;
	}

	.collective-detail-page__purchase
	{
		margin-top: 43px;
		flex-basis: 56%;
	}

	.collective-detail-page__heading
	{
		margin-bottom: 26px;

		h1
		{
			margin-bottom: 8px;
		}
	}

	.collective-detail-page__supplier
	{
		display: flex;
		align-items: baseline;
		font-size: 12px;

		span
		{
			font-size: 14px;
		}
	}

	.collective-detail-page__purchase-btn
	{
		height: 40px;
	}
}

@include mq($wd)
{
	.collective-detail-page__main
	{
		gap: 70px;
		margin-bottom: 60px;
	}

	.collective-detail-page__slider
	{
		max-width: 400px;

		.photos-slider__big-nav
		{
			display: flex;
			right: 16px;
			bottom: 19px;
		}
	}

	.collective-detail-page__purchase
	{
		margin-top: 0;
		flex-basis: 48%;

		.detail-progress
		{
			margin-bottom: 39px;
		}
	}

	.collective-detail-page__heading
	{
		margin-bottom: 59px;

		h1
		{
			font-size: 30px;
			line-height: 34px;
			margin-bottom: 11px;
		}
	}

	.collective-detail-page__supplier
	{
		font-size: 20px;
		line-height: 27px;

		span
		{
			font-size: 22px;
			line-height: 30px;
		}
	}

	.collective-detail-page__purchase-btn
	{
		height: 47px;
		font-size: 18px;
	}

	.collective-detail-page__info
	{
		display: flex;
		column-gap: 113px;
		justify-content: space-between;
		margin-bottom: 80px;

		.collective-specifications
		{
			flex-shrink: 0;
		}
	}
}
</style>
