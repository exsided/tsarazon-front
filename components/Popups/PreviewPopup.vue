<template>
	<div class="preview-popup">
		<div class="preview-popup__card">
			<div class="preview-popup__card-img">
				<PhotosSlider />
			</div>
			<div class="preview-popup__card-info">
				<NuxtLink to="#" class="preview-popup__title">
					Паста ореховая "Низкоуглеводная,  Шоколадно -фундучная" без добавления сахара
				</NuxtLink>
				<div class="preview-popup__weight">
					500 г
				</div>
				<div class="preview-popup__price">
					250
					<span>
						<i class="ruble">₽</i>/шт
					</span>
				</div>
				<button class="preview-popup__btn button button--blue">
					Добавить в корзину
				</button>
				<NuxtLink to="#" class="preview-popup__link">
					Перейти в карточку товара
				</NuxtLink>
			</div>
		</div>
		<div class="preview-popup__descr">
			<div class="preview-popup__descr-item">
				<div class="preview-popup__descr-title">
					Срок годности
				</div>
				<p class="preview-popup__descr-text">
					10 суток
				</p>
			</div>
			<div class="preview-popup__descr-item">
				<div class="preview-popup__descr-title">
					Пищевая и энергетическая ценность в 100 г.
				</div>
				<p class="preview-popup__descr-text">
					белки 5,7 г; жиры 6,3 г; углеводы 12,9 г; 131,1 ккал
				</p>
			</div>
			<div class="preview-popup__descr-item">
				<div class="preview-popup__descr-title">
					Состав
				</div>
				<p class="preview-popup__descr-text">
					Азу из говядины (говядина(произведено из мороженного сырья), лук репчатый свежий,огурцы соленые(огурцы свежие, вода питьевая, соль пищевая),томатная паста (томаты свежие, сахар, соль пищевая), масло подсолнечное рафинированное дезодорированное,чеснок свежий, сахар, соль пищевая, перец черный молотый, вода питьевая)), крупа гречневая отварная (вода питьевая, крупа гречневая ядрица, соль пищевая)
				</p>
			</div>
			<div class="preview-popup__descr-item">
				<div class="preview-popup__descr-title">
					Описание
				</div>
				<p class="preview-popup__descr-text">
					{{ formattedDescripion }}
					<span
						v-if="canShowMore"
						class="preview-popup__descr-more"
						@click="toggleDescription"
					>
						<template v-if="showFullDescription">
							Скрыть
						</template>
						<template v-else>
							Ещё
						</template>
					</span>
				</p>
			</div>
			<div class="preview-popup__descr-item preview-popup__descr-item--single-line">
				<div class="preview-popup__descr-title">
					Вес/объем:
				</div>
				<p class="preview-popup__descr-text">
					500 г
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import PhotosSlider from '~/components/Sliders/PhotosSlider';

const descMaxChars = 242;

const description = ref('Азу — традиционное блюдо татарской кухни. Это обжаренные кусочки говядины, тушённые с томатным соусом и душистыми специями. А изюминкой рецепта является добавление солёных огурцов, которые придают мясу пикантные нотки. На гарнир — рассыпчатая гречка');
const showFullDescription = ref(false);
const emit = defineEmits(['close']);

const formattedDescripion = computed(() =>
{
	if (canShowMore.value && !showFullDescription.value)
		return description.value.substr(0, descMaxChars) + '...';

	return description.value;
});

const toggleDescription = () => showFullDescription.value = !showFullDescription.value;
const canShowMore = computed(() => description.value.length > descMaxChars);

const resizeHandler = () =>
{
	if (window.window.outerWidth > 1439)
		return;

	emit('close');
};

onMounted(() => window.addEventListener('resize', resizeHandler));
onBeforeUnmount(() => window.addEventListener('resize', resizeHandler));
</script>

<style lang="scss">
	.preview-popup
	{
		padding: 12px 0 22px;
		max-width: 700px;
	}

	.preview-popup__card
	{
		display: flex;
		column-gap: 31px;
		margin-bottom: 30px;
	}

	.preview-popup__card-img
	{
		max-width: 298px;
	}

	.preview-popup__card-info
	{
		max-width: 330px;
	}

	.preview-popup__title
	{
		display: inline-block;
		color: #2C2C2C;
		font-size: 15px;
		line-height: 17px;
		font-family: 'Ubuntu';
		font-weight: 500;
		margin-bottom: 12px;
	}

	.preview-popup__weight
	{
		color: #868799;
		font-size: 13px;
		line-height: 16px;
		margin-bottom: 14px;
	}

	.preview-popup__price
	{
		color: #2C2C2C;
		font-size: 24px;
		line-height: 26px;
		font-weight: 600;
		margin-bottom: 10px;

		span
		{
			font-size: 16px;
			margin-left: -2px;
		}
	}

	.preview-popup__btn
	{
		height: 46px;
		border-radius: 6px;
	}

	.preview-popup__link
	{
		color: #F69421;
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		text-decoration-line: underline;
	}

	.preview-popup__descr
	{
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}

	.preview-popup__descr-item
	{
		&--single-line
		{
			display: flex;
			align-items: center;
			gap: 4px;

			.preview-popup__descr-title
			{
				margin: 0;
				line-height: 19px;
			}
			.preview-popup__descr-text
			{
				line-height: 19px;
			}
		}
	}

	.preview-popup__descr-title
	{
		color: #868799;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: -0.14px;
		margin-bottom: 4px;
	}

	.preview-popup__descr-text
	{
		color: #2C2C2C;
		font-size: 13px;
		line-height: 16px;
		letter-spacing: -0.13px;
		margin: 0;
	}

	.preview-popup__descr-more
	{
		color: #3D70EC;
		cursor: pointer;
	}

</style>
