<template>
	<div class="collective-steps">
		<h3 class="collective-steps__title">
			Этапы закупки
		</h3>
		<ul class="collective-steps__list">
			<li class="collective-steps__item_title">
				<p class="collective-steps__item-title-text">
					Этап
				</p>
				<div class="collective-steps__item-title-wr">
					<p class="collective-steps__item-title-text">
						Время
					</p>
					<p class="collective-steps__item-title-text">
						Дата
					</p>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox collective-steps__checkbox--checked" />
					<p class="collective-steps__checkbox-text">
						Согласование условий
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox collective-steps__checkbox--checked" />
					<p class="collective-steps__checkbox-text">
						Размещение закупки
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item collective-steps__item--active">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox" />
					<p class="collective-steps__checkbox-text">
						Сбор заявок
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox" />
					<p class="collective-steps__checkbox-text">
						Оплата заказов
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox" />
					<p class="collective-steps__checkbox-text">
						Согласование условий
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox" />
					<p class="collective-steps__checkbox-text">
						Утверждение списка участников
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox" />
					<p class="collective-steps__checkbox-text">
						Подготовка заказов
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
			<li class="collective-steps__item">
				<div class="collective-steps__item-checkbox">
					<div class="collective-steps__checkbox" />
					<p class="collective-steps__checkbox-text">
						Подписание документов
					</p>
				</div>
				<div class="collective-steps__item-wr">
					<span class="collective-steps__wr-date">02.03.2023</span>
					<span class="collective-steps__wr-time">12:32</span>
				</div>
			</li>
		</ul>
		<p class="collective-steps__text">
			Мы всегда рады вашим вопросам и отзывам, которые помогают нам улучшать наш сайт и сделать процесс коллективных закупок более удобным и эффективным для каждого участника.Хочу обратить ваше внимание на важность соблюдения правил нашего сайта. Мы строго следим за их соблюдением, чтобы все участники могли чувствовать себя в безопасности и не нарушать законы.Если у вас возникли вопросы или проблемы, связанные с процессом закупок, обращайтесь к нам – мы обязательно поможем вам.Будьте внимательны и ответственны в своих действиях, и тогда процесс коллективных закупок станет для вас еще более приятным и выгодным.
		</p>
	</div>
</template>

<script setup>
</script>

<style lang="scss">
.collective-steps { margin-bottom: 40px; }

.collective-steps__title
{
	font-weight: 700;
	font-family: "Ubuntu", sans-serif;
	font-size: 19px;
	line-height: 22px;
	letter-spacing: 0em;
	margin-bottom: 20px;
}

.collective-steps__list { margin-bottom: 30px; }

.collective-steps__item_title
{
	display: none;
}

.collective-steps__item
{
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 10px;
	&--active
	{
		box-shadow: 0px 0px 14px 0px rgba(33, 33, 53, 0.10);

		.collective-steps__checkbox-text { color: #F69421; }
		.collective-steps__wr-date{ color: #F69421; }
		.collective-steps__wr-time{ color: #F69421; }
	}
}

.collective-steps__item-title-{
	display: none;
}

.collective-steps__item-checkbox
{
	display: flex;
	column-gap: 10px;
}

.collective-steps__checkbox
{
	width: 14px;
	height: 14px;
	border-radius: 4px;
	border: 1px solid #F69421;
	&--checked
	{
		border: none;
		background-color: $blue;
		background-image: url(/svg/checked.svg);
		background-repeat: no-repeat;
		background-position: center center;
	}
}

.collective-steps__checkbox-text
{
	font-size: 12px;
	font-weight: 400;
	line-height: 14px;
	letter-spacing: 0em;
	color: #2C2C2C;
	margin: 0;
}

.collective-steps__item-wr
{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.collective-steps__wr-date
{
	font-size: 12px;
	font-weight: 400;
	line-height: 14px;
	letter-spacing: 0em;
	color: #868799;
	margin: 0;
}

.collective-steps__wr-time
{
	display: none;
}

.collective-steps__text
{
	font-size: 12px;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #868799;
}

@include mq($tablet)
{
	.collective-steps__title
	{
		font-size: 22px;
		line-height: 25px;
		letter-spacing: 0em;
	}

	.collective-steps__item_title
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 11px 120px 11px 47px;
		border-radius: 10px;
		background: #F4F5F7;
	}

	.collective-steps__item-title-text
	{
		color: #868799;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px;
		margin: 0;
	}

	.collective-steps__item-title-wr
	{
		display: flex;
		column-gap: 120px;
		min-width: 197px;
	}

	.collective-steps__item
	{
		align-items: center;
		margin-bottom: 0;
		padding: 13px 100px 13px 20px
	}

	.collective-steps__checkbox
	{
		width: 16px;
		height: 16px;
	}

	.collective-steps__checkbox-text
	{
		font-size: 12px;
		font-weight: 400;
		line-height: 18px;
		color: #868799;
	}

	.collective-steps__item-wr
	{
		flex-direction: row-reverse;
		column-gap: 125px;
		min-width: 189px;

	}

	.collective-steps__wr-time
	{
		display: block;
		font-size: 12px;
		font-weight: 400;
		line-height: 18px;
		color: #868799;
	}

	.collective-steps__wr-date
	{
		font-size: 12px;
		font-weight: 400;
		line-height: 18px;
		color: #868799;
	}
}

@include mq($wd)
{
	.collective-steps__title
	{
		font-size: 22px;
		line-height: 25px;
	}

	.collective-steps__item_title
	{
		padding: 11px 127px 11px 47px;
	}

	.collective-steps__checkbox-text { font-size: 13px; }

	.collective-steps__wr-time { font-size: 13px; }

	.collective-steps__wr-date { font-size: 13px; }
}
</style>
