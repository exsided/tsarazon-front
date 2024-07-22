<template>
	<NuxtLayout name="lk">
		<template #page-top>
			<UiBreadcrumbs :items="breadcrumbs" />
			<GoBack to="/lk/orders">
				{{ title }}
			</GoBack>
		</template>
		<template #page>
			<div class="lk-orders-detail__wr">
				<div class="lk-orders-detail__info">
					<div class="lk-orders-detail__info-order">
						<h2 class="lk-orders-detail__info-number">
							Заказ № 0115737611-0003
						</h2>
						<p class="lk-orders-detail__info-text">
							Коллективная закупка №3333
						</p>
						<p class="lk-orders-detail__info-date">
							от 9 августа 2023
						</p>
						<OrderInfo />
					</div>
					<div class="lk-orders-detail__info-section">
						<div class="lk-orders-detail__section-delivery">
							<div class="lk-orders-detail__delivery-info">
								<p class="lk-orders-detail__delivery-info-text">
									Доставка курьером
								</p>
								<button class="lk-orders-detail__delivery-info-btn">
									Ожидает оплаты
								</button>
							</div>
							<div class="lk-orders-detail__delivery-documents">
								<NuxtLink class="lk-orders-detail__documents-link g-link" to="#">
									Оплата на расчетный счет
								</NuxtLink>
								<NuxtLink class="lk-orders-detail__documents-link g-link" to="#">
									Оплата онлайн
								</NuxtLink>
								<NuxtLink class="lk-orders-detail__documents-link g-link" to="#">
									Оплата наличными
								</NuxtLink>
							</div>
						</div>
						<div class="lk-orders-detail__section-products">
							<div class="lk-orders-detail__products-info">
								<p class="lk-orders-detail__info-quantity">
									430 товаров
								</p>
								<p class="lk-orders-detail__info-type">
									Коллективная закупка №3333
								</p>
							</div>
							<div class="lk-orders-detail__products-progress">
								<p class="lk-orders-detail__progress-members">
									165 867 участников
								</p>
								<div class="lk-orders-detail__progress-wr">
									<ProgressbarVue />
									<p class="lk-orders-detail__wr-quantity">
										60%
									</p>
								</div>
								<p class="lk-orders-detail__price-quantity">
									Мин. заказ: 70 000 ₽
								</p>
							</div>
							<OrderCard />
							<OrderCard />
							<OrderCard />
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #page-bottom>
			<ProductsSlider />
		</template>
	</NuxtLayout>
</template>

<script setup>
import UiBreadcrumbs from '~/components/UI/Breadcrumbs.vue';
import GoBack from '~/components/GoBack.vue';
import OrderInfo from '~/components/OrderInfo.vue';
import ProgressbarVue from '~/components/Progressbar.vue';
import OrderCard from '~/components/Product/OrderCard.vue';
import ProductsSlider from '~/components/Sliders/ProductsSlider.vue';

const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Личный кабинет', link: '/lk' }, { name: 'Заказы', link: '/lk/orders' }, { name: 'Заказ № 0115737611-0003', link: '/lk/orders/detail' }];
const title = 'К Заказам';
useHead({ title: 'Заказ № 0115737611-0003' });
</script>

<style lang="scss">

.lk-orders-detail__leftblock
{
	display: none;
}

.lk-orders-detail__info-order
{
	margin-bottom: 30px;
}

.lk-orders-detail__info-number
{
	color: #2C2C2C;
	font-family: "Ubuntu", sans-serif;
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 6px;
}

.lk-orders-detail__info-text
{
	color: #F69421;
	font-size: 13px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 6px;
}

.lk-orders-detail__info-date
{
	color: #2C2C2C;
	font-size: 13px;
	font-weight: 400;
	line-height: 21px;
}

.lk-orders-detail__info-section
{
	margin-bottom: 50px;
}

.lk-orders-detail__section-product
{
	padding: 16px;
	border-radius: 6px;
	background:  #FFF;
	box-shadow: 0px 0px 13px 0px rgba(93, 95, 107, 0.10);
}

.lk-orders-detail__delivery-info-text
{
	color: #2C2C2C;
	font-size: 18px;
	font-weight: 600;
	line-height: 21px;
}

.lk-orders-detail__delivery-info-btn
{
	padding: 4px 12px 4px 12px;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	background: #F69421;
	border: none;

	color:#FFF;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
}

.lk-orders-detail__delivery-documents
{
	display: flex;
	flex-direction: column;
	gap: 6px;
	margin-bottom: 20px;
}

.lk-orders-detail__documents-link
{
	color: #3772FE;
	font-size: 13px;
	font-weight: 600;
	line-height: normal;
}

.lk-orders-detail__products-info
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
}

.lk-orders-detail__info-quantity
{
	color: #868799;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.lk-orders-detail__info-type
{
	color: #F69421;
	font-size: 11px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.lk-orders-detail__products-progress
{
	margin-bottom: 30px;
}

.lk-orders-detail__progress-members
{
	color: #868799;
	font-size: 11px;
	font-weight: 600;
	line-height: 18px;
	margin-bottom: 0;
}

.lk-orders-detail__progress-wr
{
	display: flex;
	justify-content: space-between;
	column-gap: 10px;
	align-items: center;
	.progressbar{
		width: 100%;
		height: 10px;
	}
}

.lk-orders-detail__wr-quantity
{
	color: #868799;
	font-size: 13px;
	font-weight: 400;
	line-height: 20px;
	margin-bottom: 0;
}

.lk-orders-detail__price-quantity
{
	color: #868799;
	font-size: 11px;
	font-weight: 400;
	line-height: 16px;
	margin-bottom: 0;
}

@include mq($tablet)
{
	.lk-orders-detail__info-order
	{
		margin-bottom: 20px;
	}

	.lk-orders-detail__info{
		width: 100%;
		max-width: 1060px;
	}

	.lk-orders-detail__leftblock
	{
		display: block;
		max-width: 171px;
		width: 100%;
		height: 467px;
		background-color: #868799;
	}

	.lk-orders-detail__info-number
	{
		font-size: 22px;
	}

	.lk-orders-detail__info-text
	{
		font-size: 14px;
	}

	.lk-orders-detail__info-date
	{
		font-size: 14px;
	}

	.lk-orders-detail__info-section
	{
		margin-bottom: 60px;
	}

	.lk-orders-detail__documents-link
	{
		color: #3772FE;
		font-size: 14px;
		font-weight: 600;
		line-height: normal;
	}

	.lk-orders-detail__section-delivery
	{
		display: flex;
		justify-content: space-between;
	}

	.lk-orders-detail__info-quantity
	{
		font-size: 13px;
	}

	.lk-orders-detail__info-type
	{
		font-size: 12px;
	}

	.lk-orders-detail__progress-members
	{
		font-size: 12px;
	}

	.lk-orders-detail__wr-quantity
	{
		font-size: 16px;
	}

	.lk-orders-detail__price-quantity
	{
		font-size: 12px;
	}

	.lk-orders-detail__progress-wr
	{
		.progressbar{
			height: 14px;
		}
	}
}

@include mq($wd)
{
	.lk-orders-detail__info-order
	{
		margin-bottom: 50px;
	}

	.lk-orders-detail__info-number
	{
		font-size: 26px;
	}

	.lk-orders-detail__info-section
	{
		display: flex;
		margin-bottom: 80px;
		justify-content: space-between;
		column-gap: 60px;
	}

	.lk-orders-detail__delivery-info
	{
		margin-bottom: 70px;
	}

	.lk-orders-detail__documents-link
	{
		font-size: 14px;
		white-space: nowrap;
	}

	.lk-orders-detail__section-delivery
	{
		flex-direction: column;
		justify-content: flex-start;
	}

	.lk-orders-detail__info-quantity
	{
		font-size: 16px;
	}

	.lk-orders-detail__section-products
	{
		width: 100%;
	}

	.lk-orders-detail__info-type
	{
		font-size: 14px;
	}

	.lk-orders-detail__progress-members
	{
		font-size: 14px;
	}

	.lk-orders-detail__wr-quantity
	{
		font-size: 20px;
	}

	.lk-orders-detail__price-quantity
	{
		font-size: 14px;
	}

	.lk-orders-detail__progress-wr
	{
		.progressbar{
			height: 16px;
		}
	}
}
</style>
