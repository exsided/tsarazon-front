<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__wr">
				<h2 class="footer__title">
					Царазон
				</h2>
				<div class="footer__nav">
					<div class="footer__block">
						<h3 class="footer__block-title">
							О маркетплейсе
						</h3>
						<nav class="footer__list">
							<NuxtLink to="#" class="footer__link">
								О нас
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Блог
							</NuxtLink>
							<NuxtLink to="/contacts" class="footer__link">
								Контакты
							</NuxtLink>
						</nav>
					</div>
					<div class="footer__block">
						<h3 class="footer__block-title">
							Пользователям
						</h3>
						<nav class="footer__list">
							<NuxtLink to="#" class="footer__link">
								Личный кабинет
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Коллективные закупки
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Витрина товаров
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Инструкция пользователя
							</NuxtLink>
						</nav>
					</div>
					<div class="footer__block">
						<h3 class="footer__block-title">
							Правовая информация
						</h3>
						<nav class="footer__list">
							<NuxtLink to="#" class="footer__link">
								Договор/Оферта
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Пользовательское соглашение
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Политика обработки данных
							</NuxtLink>
							<NuxtLink to="#" class="footer__link">
								Документы
							</NuxtLink>
						</nav>
					</div>
					<div class="footer__block">
						<h3 class="footer__block-title">
							Контакты
						</h3>
						<nav class="footer__list">
							<a href="tel:+7(988)888-88-88" class="footer__link">+7 (988) 888-88-88</a>
							<span class="footer__time">с 9:00 до 21:00</span>
							<a href="mailto:Info@tsarazon.ru" class="footer__link">Info@tsarazon.ru</a>
						</nav>
						<SocialBtns class="footer__icons" />
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container">
				<div class="footer-bottom__wr">
					<p>© ООО “Tsar” 2023г</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
import SocialBtns from '~/components/SocialBtns.vue';
</script>

<style lang="scss">
	.footer
	{
		flex: 0 0 auto;
		background-color: $lgray;
	}

	.footer__wr
	{
		padding: 15px 0 40px;
	}

	.footer__title
	{
		font-family: 'Ubuntu', sans-serif;
		margin: 0;
		margin-bottom: 16px;
		font-weight: 700;
		font-size: 24px;
		line-height: 36px;
		color: $blue;
	}

	.footer__nav
	{
		display: flex;
		flex-direction: column;
	}

	.footer__block
	{
		&:not(:last-child) { margin-bottom: 20px; }
	}

	.footer__block-title
	{
		margin: 0;
		margin-bottom: 10px;
		font-size: 11px;
		line-height: 15px;
		color: $gray;
	}

	.footer__list
	{
		display: flex;
		flex-direction: column;
	}

	.footer__link
	{
		@include transition();
		width: fit-content;
		font-size: 12px;
		line-height: 16px;
		color: #161920;
		&:not(:last-child) { margin-bottom: 10px; }

		&:hover
		{
			color: $blue;
		}
	}

	.footer__time
	{
		margin-bottom: 10px;
		font-size: 12px;
		line-height: 16px;
		color: $gray;
	}

	.footer__icons
	{
		padding-top: 10px;
		justify-content: flex-start;

		.social-btns__item { background-color: $white; }
	}
	.footer-bottom
	{
		background-color: #DEDFE1;
	}

	.footer-bottom__wr
	{
		padding: 14px 0 74px;
		text-align: left;

		p
		{
			margin: 0;
			font-size: 10px;
			line-height: 14px;
		}
	}

	@include mq($mobile)
	{
		.footer__nav
		{
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.footer__block
		{
			flex-basis: 45%;
		}
	}

	@include mq($tablet)
	{
		.footer__nav
		{
			flex-wrap: nowrap;
		}

		.footer__block
		{
			flex-basis: unset;
		}

		.footer-bottom__wr
		{
			padding: 14px 0;
		}
	}

	@include mq($wd)
	{
		.footer__wr
		{
			padding: 37px 0 20px;
		}

		.footer__title
		{
			font-size: 35px;
			line-height: 52px;
			margin-bottom: 24px;
		}

		.footer__nav
		{
			justify-content: flex-start;
			column-gap: 140px;
		}

		.footer__block-title
		{
			font-size: 14px;
			line-height: 19px;
		}

		.footer__link
		{
			font-size: 15px;
			line-height: 20px;
		}

		.footer__time
		{
			font-size: 12px;
			line-height: 16px;
		}

		.footer-bottom__wr
		{
			padding: 22px 0;

			p
			{
				font-size: 13px;
				line-height: 18px;
			}
		}
	}
</style>
