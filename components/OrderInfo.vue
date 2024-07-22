<template>
	<div class="order-info">
		<div class="order-info__wr">
			<ul class="order-info__wr-list">
				<li class="order-info__list-item-title">
					Доставка по адресу:
				</li>
				<li class="order-info__list-item-text">
					г.Владикавказ, пер.Станиславского, д.5
				</li>
			</ul>
			<ul class="order-info__wr-list">
				<li class="order-info__list-item-title">
					Получатель
				</li>
				<li class="order-info__list-item-text order-info__list-item-text--with-margin">
					Александр Кочесов
				</li>
				<li class="order-info__list-item-text order-info__list-item-text--with-margin">
					123456789Alex9@mail.ru
				</li>
				<li class="order-info__list-item-text">
					8 (928) 988-88-48
				</li>
			</ul>
			<NuxtLink class="order-info__wr-link g-link" to="#">
				Электронный чек
			</NuxtLink>
		</div>
		<div class="order-info__price">
			<ul class="order-info__price-payment-list">
				<li class="order-info__payment-item">
					<p class="order-info__payment-item-text">
						Оплата
					</p>
					<p class="order-info__payment-item-text">
						300 000 <i class="ruble">₽</i>
					</p>
				</li>
				<li class="order-info__payment-item-desc">
					Карта VISA
				</li>
			</ul>
			<ul class="order-info__price-list">
				<li class="order-info__list-item">
					<p class="order-info__item-text">
						Товары:
					</p>
					<p class="order-info__item-price">
						280 500 <i class="ruble">₽</i>
					</p>
				</li>
				<li class="order-info__list-item">
					<p class="order-info__item-text">
						Товары:
					</p>
					<p class="order-info__item-price">
						280 500 <i class="ruble">₽</i>
					</p>
				</li>
				<li class="order-info__list-item">
					<p class="order-info__item-text">
						Товары:
					</p>
					<p class="order-info__item-price">
						280 500 <i class="ruble">₽</i>
					</p>
				</li>
			</ul>
			<NuxtLink class="order-info__price-link g-link" to="#">
				Электронный чек
			</NuxtLink>
		</div>
		<ul class="order-info__documents-list">
			<li class="order-info__documents-list">
				<NuxtLink class="order-info__documents-list-link g-link" to="#">
					Счет спецификации
				</NuxtLink>
			</li>
			<li class="order-info__documents-list">
				<NuxtLink class="order-info__documents-list-link g-link" to="#">
					УПД
				</NuxtLink>
			</li>
			<li class="order-info__documents-list">
				<NuxtLink class="order-info__documents-list-link g-link" to="#">
					Договор
				</NuxtLink>
			</li>
			<li class="order-info__documents-list">
				<NuxtLink class="order-info__documents-list-link g-link" to="#">
					Электронный чек
				</NuxtLink>
			</li>
		</ul>
	</div>

	<div class="order-info">
		<div class="order-info__wr">
			<ul class="order-info__wr-list">
				<li class="order-info__list-item-title">
					Доставка в пункт выдачи:
				</li>
				<li class="order-info__list-item-text">
					г.Владикавказ, пер.Станиславского, д.5
				</li>
			</ul>
			<ul class="order-info__wr-list">
				<li class="order-info__list-item-title">
					Получатель
				</li>
				<li class="order-info__list-item-text order-info__list-item-text--with-margin">
					Александр Кочесов
				</li>
				<li class="order-info__list-item-text order-info__list-item-text--with-margin">
					123456789Alex9@mail.ru
				</li>
				<li class="order-info__list-item-text">
					8 (928) 988-88-48
				</li>
			</ul>
			<NuxtLink class="order-info__wr-link g-link" to="#">
				Электронный чек
			</NuxtLink>
		</div>
		<div class="order-info__price">
			<ul class="order-info__price-payment-list">
				<li class="order-info__payment-item">
					<p class="order-info__payment-item-text">
						Оплата
					</p>
					<p class="order-info__payment-item-text">
						300 000 <i class="ruble">₽</i>
					</p>
				</li>
				<li class="order-info__payment-item-desc">
					Карта VISA
				</li>
			</ul>
			<ul class="order-info__price-list">
				<li class="order-info__list-item">
					<p class="order-info__item-text">
						Товары:
					</p>
					<p class="order-info__item-price">
						280 500 <i class="ruble">₽</i>
					</p>
				</li>
				<li class="order-info__list-item">
					<p class="order-info__item-text">
						Товары:
					</p>
					<p class="order-info__item-price">
						280 500 <i class="ruble">₽</i>
					</p>
				</li>
				<li class="order-info__list-item">
					<p class="order-info__item-text">
						Товары:
					</p>
					<p class="order-info__item-price">
						280 500 <i class="ruble">₽</i>
					</p>
				</li>
			</ul>
			<NuxtLink class="order-info__price-link g-link" to="#">
				Электронный чек
			</NuxtLink>
		</div>
		<ul class="order-info__documents-list">
			<li class="order-info__documents-list">
				<NuxtLink class="order-info__documents-list-link g-link" to="#">
					Электронный чек
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup>

</script>

<style lang="scss">
.order-info
{
	border-radius: 10px;
	padding: 16px 16px 22px;
	margin-bottom: 20px;
	background-color: #F4F5F7;
}

.order-info__wr
{
	margin-bottom: 20px;
}

.order-info__wr-list
{
	&:first-child
	{
		margin-bottom: 16px;
	}
}

.order-info__list-item-title
{
	color: #2C2C2C;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 6px;
}

.order-info__list-item-text
{
	color: #868799;
	font-size: 11px;
	font-weight: 400;
	line-height: normal;
	white-space: nowrap;
}

.order-info__list-item-text--with-margin { margin-bottom: 6px; }

.order-info__wr-link
{
	display: none;
}

.order-info__payment-item
{
	display: flex;
	justify-content: space-between;
}

.order-info__payment-item-text
{
	color: #2C2C2C;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 6px;
}

.order-info__payment-item-desc
{
	color:#868799;
	font-size: 11px;
	font-weight: 400;
	line-height: normal;
}

.order-info__price-payment-list
{
	margin-bottom: 16px;
}

.order-info__list-item
{
	display: flex;
	justify-content: space-between;
	margin-bottom: 12px;
}

.order-info__item-text
{
	color: #2C2C2C;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.order-info__item-price
{
	color: #2C2C2C;
	font-size: 13px;
	font-weight: 600;
	line-height: normal;
	margin-bottom: 0;
}

.order-info__price-link
{
	color: #3772FE;
	font-size: 12px;
	font-weight: 600;
	line-height: normal;
}

.order-info__documents-list
{
	display: none;
}

@include mq($tablet)
{
	.order-info
	{
		width: 100%;
		max-width: 517px;
	}

	.order-info
	{
		display: flex;
		column-gap: 40px;
		width: 100%;

	}

	.order-info__price-link
	{
		display: none;
	}

	.order-info__wr-link
	{
		display: block;
		color: #3772FE;
		font-size: 12px;
		font-weight: 600;
		line-height: normal;
	}

	.order-info__price
	{
		width: 100%;
	}

	.order-info__wr
	{
		margin-bottom: 0;
	}

	.order-info__wr-list
	{
		margin-bottom: 16px;
	}

	.order-info__list-item
	{
		max-width: 234px;
	}

	.order-info__payment-item
	{
		max-width: 234px;
	}
}

@include mq($desktop)
{
	.order-info
	{
		column-gap: 140px;
	}

	.order-info
	{
		width: 100%;
		max-width: 1060px;
	}

	.order-info__documents-list
	{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.order-info__documents-list
	{
		margin-bottom: 20px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}

	.order-info__documents-list-link
	{
		color:  #3772FE;
		font-size: 14px;
		font-weight: 600;
		line-height: normal;
		white-space: nowrap;
	}

	.order-info__list-item
	{
		max-width: 234px;
	}

	.order-info__wr-link
	{
		display: none;
	}

	.order-info__wr-list
	{
		&:last-of-type
		{
			margin-bottom: 0;
		}

	}
}

@include mq($wd)
{
	.order-info__list-item-title
	{
		font-size: 18px;
		line-height: 21px;
	}

	.order-info__list-item-text
	{
		font-size: 14px;
	}

	.order-info__payment-item-text
	{
		font-size: 16px;
	}

	.order-info__payment-item-desc
	{
		font-size: 14px;
	}

	.order-info__item-text
	{
		font-size: 15px;
	}

	.order-info__item-price
	{
		font-size: 16px;
	}

	.order-info__wr-link
	{
		font-size: 16px;
	}

	.order-info__price
	{
		width: 100%;
		max-width: 340px;
	}
}
</style>
