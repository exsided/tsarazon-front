<template>
	<div class="goods-return-form">
		<UiInput
			v-model="comment"
			label="Введите ваше сообщение"
			textarea
			name="question"
		/>
		<UiFileInput
			v-model="files"
			label="Добавьте документы"
			multiple
		>
			<div>
				Перетащите сюда или <span>выберите на компьютере</span>
			</div>
		</UiFileInput>
		<button class="button button--blue">
			Отправить
		</button>
	</div>
</template>

<script setup>
import UiInput from '@/components/UI/Input.vue';
import UiFileInput from '@/components/UI/FileInput.vue';

const files = ref([]);
const comment = ref('');
</script>

<style lang="scss">
.goods-return-form
{
	.ui-file-input__dropzone
	{
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 20px;
	}

	button
	{
		width: 100%;
	}
}

.goods-return-form__title
{
	color: #868799;
	font-size: 13px;
	font-weight: 400;
	line-height: 16px;
	letter-spacing: -0.13px;
	margin-bottom: 6px;
}

.goods-return-form__text
{
	color: #868799;
	text-align: center;
	font-size: 10px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: -0.1px;
	margin-bottom: 0;
	a
	{
		color: #3772FE;
	}
}
</style>
