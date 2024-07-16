<template>
	<view class="main">
		<view class="main__index">
			<view class="main__index-stats">
				<view class="main__index-stats-value">{{kelvinToCelsius(weatherInfo.temp)}}°</view>
				<view class="main__index-stats-feels-like">体感 {{kelvinToCelsius(weatherInfo.feels_like)}}°</view>
			</view>
			<view class="main__index-info">
				{{
					`${weatherInfo.description?weatherInfo.description + '｜':''}`
				}}
				{{kelvinToCelsius(weatherInfo.temp)}}°｜{{getWindDirection(weatherInfo.deg)}} {{weatherInfo.speed}}级
			</view>
		</view>
		<view class="main__future">
			<view class="main__future-item" v-for="(item,index) in weatherInfo.forecast" :key="index">
				<view>{{getDayInfo(item?.dt_txt)}}</view>
				<image class="main__future-item-icon"
					:src="`../../static/images/${item.weather[0]?.icon.slice(0, 2)}.png`">
				</image>
				<view>{{getWindDirection(item.wind?.deg)}} {{item.wind?.speed}}级</view>
				<view>{{kelvinToCelsius(item.main?.temp_min)}}°～{{kelvinToCelsius(item.main?.temp_max)}}°</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useAppStore
	} from '@/stores/appStore'
	import {
		kelvinToCelsius,
		getWindDirection
	} from '@/utils/index'
	import {
		getDayInfo
	} from '@/utils/index'

	const {
		initAppWaather,
		weatherInfo
	} = useAppStore()

	initAppWaather()
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background: white;

		&__index {
			height: 35vh;
			width: 100%;
			background: url('https://image.meiye.art/pic_6XovqF-O0ORNQMteUdL_V?imageMogr2/thumbnail/560x/interlace/1');
			backdrop-filter: blur(10px);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&-stats {
				display: flex;
				justify-content: center;
				align-items: flex-end;
				width: 100%;

				&-value {
					font-size: 106rpx;
					color: white;
				}

				&-feels-like {
					font-size: 20rpx;
					color: white;
				}
			}

			&-info {
				padding: 10px;
				font-size: 14px;
				color: white;
			}
		}

		&__future {
			width: 100%;
			background: white;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			flex: 1;
			position: relative;
			bottom: 50rpx;
			padding: 32rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: 32rpx;
			font-size: 24rpx;

			&-item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 2rpx solid #FAFAFA;
				padding: 5rpx;
			}

			&-item-icon {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>