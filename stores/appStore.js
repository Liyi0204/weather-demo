import {
	defineStore
} from 'pinia';
import {
	reactive
} from 'vue';

import {
	getWeatherByLatLon,
	getForecastByLatLon,
	getLocation
} from '@/hooks/useWeater'

import { filterByDate } from '@/utils/index'

export const useAppStore = defineStore('app', () => {
	const weatherInfo = reactive({
		cityName: "",
		cityId: 0,
		lat: 0,
		lon: 0,
		temp: 0,
		feels_like: 0,
		description: "",
		deg: 0,
		speed: 0,
		forecast: []
	})

	const initAppWaather = async () => {
		// 获取当前位置
		const location = await getLocation();

		const {
			latitude,
			longitude
		} = location;
		const weatherData = await getWeatherByLatLon(latitude, longitude);
		const forecastData = await getForecastByLatLon(latitude, longitude)

		const {
			main,
			weather,
			wind
		} = weatherData;
		const {
			list
		} = forecastData;
		const info = {
			...main,
			...weather[0],
			...wind,
			forecast: filterByDate(list)
		};

		Object.assign(weatherInfo, info);
	}

	return {
		weatherInfo,
		initAppWaather
	}
});