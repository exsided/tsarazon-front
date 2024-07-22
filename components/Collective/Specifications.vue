<template>
	<div class="collective-specifications">
		<h3 class="collective-specifications__title">
			Характеристики закупки
		</h3>
		<ul class="collective-specifications__list">
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Производитель:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					Mendeles
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Бренды:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					Простоквашино; Любятово; Яшкино
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Товарные категории:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					Каши и крупы; Легко готовить; Здоровое питание
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Общий объем партии:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					1 500 упаковок
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Минимальная сумма заказа:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					340 000₽
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Место отправки:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					г. Владикавказ, ул. Проспект Коста, д.260
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Место поставки:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					г. Владикавказ, ул. Проспект Коста, д.260
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Сроки приема заявок:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					1 месяц
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Дата ожидаемой поставки:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					02.06.2023
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Контакты менеджера закупки:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					8 (928) 936-55-65
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Email
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					alex123456789@mail.ru
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Самовывоз:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					г. Владикавказ, ул. Проспект Коста, д.260
				</p>
			</li>
			<li class="collective-specifications__item">
				<p class="collective-specifications__item-name">
					Доставка по городу:
				</p>
				<div class="colletive-specifications__item-dotted" />
				<p class="collective-specifications__item-value">
					По всему городу поставки - 500 ₽
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
</script>

<style lang="scss">
.collective-specifications { margin-bottom: 30px; }

.collective-specifications__title
{
	font-family: "Ubuntu", sans-serif;
	font-size: 19px;
	font-weight: 700;
	line-height: 22px;
	letter-spacing: 0em;
	color: #2C2C2C;
	margin-bottom: 16px;
}

.collective-specifications__item
{
	margin-bottom: 10px;
	&:last-child
	{
		margin-bottom: 0;
	}
}

.collective-specifications__item-name
{
	color:#868799;
	font-size: 11px;
	font-weight: 600;
	line-height: 15px;
	letter-spacing: 0em;
	margin: 0;
}

.collective-specifications__item-value
{
	color: #2C2C2C;
	font-size: 11px;
	font-weight: 600;
	line-height: 21px;
	letter-spacing: 0em;
	margin: 0;

		word-break: break-word;
}

@include mq(579px)
{
	.collective-specifications__item
	{
		margin-bottom: 13px;
		display: flex;
		align-items: flex-end;
		&:last-child
		{
			margin-bottom: 0;
		}
	}

	.colletive-specifications__item-dotted
	{
		width: 100%;
		border-bottom: 2px dotted #E5E5FA;
	}

	.collective-specifications__item-name { flex-shrink: 0; }
	.collective-specifications__item-value { min-width: 50%;}
}
@include mq($tablet)
{
	.collective-specifications { margin-bottom: 30px; }

	.collective-specifications__title
	{
		font-size: 22px;
		line-height: 25px;
	}

	.collective-specifications__item-name
	{
		font-size: 13px;
		line-height: 18px;
	}

	.collective-specifications__item-value
	{
		font-size: 11px;
		line-height: 21px;

	}
}

@include mq($wd)
{
	.collective-specifications
	{
		margin-bottom: 0;
		max-width: 357px;
	}

	.collective-specifications__item
	{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.collective-specifications__title
	{
		font-size: 22px;
		line-height: 25px;
		margin-bottom: 20px;
	}

	.collective-specifications__item-name
	{
		font-size: 15px;
		line-height: 20px;
		word-break: break-word;
	}

	.colletive-specifications__item-dotted
	{
		display: none;
	}

	.collective-specifications__item-value
	{
		font-size: 14px;
		line-height: 21px;
		min-width: auto;
	}
}
</style>
