<template>
	<div class="document">
		<div class="document__icons">
			<div class="document__icon document__icon--document">
				<DocumentSvg />
			</div>
			<a :href="link" download class="document__icon document__icon--download">
				<DownloadSvg />
			</a>
		</div>
		<div class="document__info">
			<a :href="link" download class="document__title">
				{{ title }}
			</a>
			<p class="document__data">
				Дата публикации: {{ publishDate }}
			</p>
		</div>
	</div>
</template>

<script setup>
import DocumentSvg from '~/assets/svg/document.svg?skipsvgo';
import DownloadSvg from '~/assets/svg/download.svg?skipsvgo';

const props = defineProps({
	title:
	{
		type: String,
		required: true,
		default: '',
	},
	link:
	{
		type: String,
		required: true,
		default: '',
	},
	publishDate:
	{
		type: String,
		required: true,
		default: '',
	},
});

</script>

<style lang="scss">
	.document
	{
		display: flex;
		gap: 12px;
		border-radius: 10px;
		padding: 14px 16px;
		@include transition();

		&:hover
		{
			box-shadow: 0px 0px 13px 0px rgba(93, 95, 107, 0.10);
		}
	}

	.document__icons
	{
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.document__icon
	{
		width: 28px;

		svg
		{
			width: 100%;
		}

		&--document
		{
			display: none;
		}

		&--download
		{
			path { @include transition(); }
			rect { @include transition(); }

			&:hover
			{
				path { stroke: $orange; }
				rect { stroke: $orange; }
			}
		}
	}

	.document__info
	{
		display: flex;
		flex-direction: column;
		justify-content: center;

		p { margin: 0; }
	}

	.document__title
	{
		font-family: 'Ubuntu';
		font-size: 12px;
		line-height: 14px;
		margin-bottom: 4px;
		@include transition();

		&:hover { color: $orange; }
	}

	.document__data
	{
		color: $gray;
		font-size: 11px;
		line-height: 16px;
	}

	@include mq($tablet)
	{
		.document
		{
			padding: 16px 20px;
			gap: 20px;
		}

		.document__icons
		{
			flex-direction: row;
			gap: 16px;
			align-items: center;
		}

		.document__icon
		{
			height: 28px;

			svg
			{
				height: 100%;
			}

			&--document
			{
				display: block;
				width: 23px;
			}
		}

		.document__title
		{
			font-size: 14px;
			line-height: 16px;
		}

		.document__data
		{
			font-size: 12px;
			line-height: 16px;
		}
	}

	@include mq($wd)
	{
		.document__icon
		{
			width: 30px;
			height: 30px;

			&--document
			{
				width: 25px;
			}
		}

		.document__title
		{
			font-size: 16px;
			line-height: 18px;
			margin-bottom: 6px;
		}

		.document__data
		{
			font-size: 14px;
		}
	}
</style>
