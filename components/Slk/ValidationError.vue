<template>
	<div class="slk-error">
		<span class="slk-error__text">Строка 77. Колонка 13. Название товара должно быть заполнено</span>
	</div>
</template>

<style lang="scss">
	.slk-error
	{
		padding: 6px 16px;
		max-width: 536px;
		border-radius: 10px;
		border: 1px solid #F86635;
		margin-bottom: 12px;
		min-height: 40px;
		display: flex;
		align-items: center;
		width:fit-content;
	}
	.slk-error__text
	{
		color: #F86635;
		font-size: 12px;
		font-weight: 600;
		line-height: 13px;
		display: block;
	}
</style>
