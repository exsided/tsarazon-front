<template>
	<NuxtLayout name="slk">
		<div class="slk-import container">
			<div class="slk-import__row">
				<div class="slk-import__block">
					<ul class="slk-import__list">
						<li class="slk-import__item">
							1. Скачайте шаблон файла для заполнения в формате MS Excel
						</li>
						<li class="slk-import__item">
							2. Заполните информацию по каждому товару в этом файле
						</li>
						<li class="slk-import__item">
							3. Загрузите сформированный файл
						</li>
					</ul>
					<a
						href="/Импорт товаров.xlsx"
						class="slk-import__download"
						download
					>
						Скачать файл Excel
					</a>
				</div>

				<div class="slk-import__block slk-import__input">
					<UiFileInput
						v-model="uploadFile"
						label="Добавьте документы"
						multiple
					>
						<div class="slk-import__input-block">
							Перетащите сюда или <span class="slk-import__input-text">выберите на компьютере</span>
						</div>
					</UiFileInput>
					<button
						v-if="uploadFile.length"
						class="button button--blue slk-import__send"
						@click="uploadFileSend()"
					>
						Отправить на проверку
					</button>
				</div>
			</div>
			<div class="slk-import__row">
				<div class="slk-import__block slk-import__result">
					<h3 class="slk-import__title">
						Результат импорта:
					</h3>
					<ValidationError />
					<ValidationError />
					<ValidationError />
					<ValidationError />
					<ValidationError />
					<ValidationError />
					<ValidationError />
					<ValidationError />
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import UiFileInput from '~/components/UI/FileInput.vue';
import ValidationError from '~/components/Slk/ValidationError.vue';

import { usePopupsStore } from '~/store';
import slkModule from '~/api/slk.js';

definePageMeta({
	middleware: ['auth']
});

const popupsStore = usePopupsStore();

const uploadFile = ref([]);

const uploadFileSend = async () =>
{
	const formData = new FormData();

	formData.append('hash', (new Date()).getTime());
	formData.append('file', uploadFile.value[0].file);

	const { data, error } = await slkModule.goodsImport(formData);
	// popupsStore.setState(['MsgPopup', true]);
	uploadFile.value = [];
};

popupsStore.setState(['MsgPopup', false]);
popupsStore.setData({ showSuccesIcon: true, msg: 'Файл отправлен на проверку' });

useHead({ title: 'Личный кабинет поставщика' });
</script>

<style lang="scss">
	.slk-import
	{
		display: flex;
		flex-wrap: wrap;
	}

	.slk-import__row{ width: 100%; }

	.slk-import__send{ margin-bottom: 15px; }

	.slk-import__result
	{
		margin-left: auto;
		width: 100%;
	}

	.slk-import__item
	{
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		color: #868799;
		line-height: 16px;
		margin-right: 26px;
		&:last-child{ margin-bottom: 7px; }
	}

	.slk-import__download
	{
		color: #F69421;
		font-size: 14px;
		font-weight: 600;
		border: none;
		background: none;
		margin-bottom: 8px;
		@include transition();

		@include hover()
		{
			opacity: 0.8;
		}
	}

	.slk-import__input-block
	{
		margin:0 auto;
		max-width:221px;
	}

	.slk-import__input
	{
		width:290px;
		max-width:290px;
		border-radius:10px;
	}

	.slk-import__input .ui-file-input__dropzone
	{
		margin-bottom: 25px;
		width: 100%;
		height: 100%;
		text-align: center;
		padding-top: 65px;
		padding-bottom: 65px;
	}

	.slk-import__input-text{ color:#3772FE; }

	.slk-import__title
	{
		color: #000;
		font-family: Ubuntu;
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 12px;
		display: block;
	}

	@include mq($tablet)
	{
		.slk{ margin-bottom: 85px; }

		.slk-import__item
		{
			font-size: 16px;
			line-height: 22px;
		}

		.slk-import__download{ margin-bottom: 10px; }

		.slk-import__input
		{
			width: 500px;
			max-width: 500px;
			min-height: 200px;
		}
		.slk-import__input .ui-file-input__dropzone
		{
			min-height: 200px;
			margin-bottom: 30px;
			padding-top: 75px;
		}

		.slk-import__title{ margin-bottom: 10px; }
	}

	@include mq($desktop)
	{
		.slk-import__row{ width:50%; }

		.slk-import__result{ padding-left:50px; }

		.slk-import__item{ &:last-child{ margin-bottom: 5px; } }

		.slk-import__download{ margin-bottom: 0; }
	}
</style>
