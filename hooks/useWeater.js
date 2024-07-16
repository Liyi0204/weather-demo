import weatherServe from '@/api/weatherServe';

const appid = "638aeca10d88da8c6d3e3ad2a9594494";

// 默认的经纬度值（北京故宫的经纬度）
const defaultLat = 39.9167;
const defaultLon = 116.3975;
const lang = "zh_cn"

// 获取天气信息的函数
const getWeatherByLatLon = async (lat = defaultLat, lon = defaultLon) => {
	try {
		const params = {
			appid: appid,
			lat: lat,
			lon: lon,
			lang: lang
		};

		// 使用 await 等待天气服务模块返回的 Promise 结果
		const response = await weatherServe.getWeather(params);
		return response.data; // 返回天气数据
	} catch (error) {
		console.error('Error fetching weather:', error);
		throw error; // 抛出错误，供调用者处理
	}
};

// 获取未来天气的函数
const getForecastByLatLon = async (lat = defaultLat, lon = defaultLon) => {
	try {
		const params = {
			appid: appid,
			lat: lat,
			lon: lon,
			lang: lang
		};

		// 使用 await 等待天气服务模块返回的 Promise 结果
		const response = await weatherServe.getForecast(params);
		return response.data; // 返回天气数据
	} catch (error) {
		console.error('Error fetching weather:', error);
		throw error; // 抛出错误，供调用者处理
	}
};

// 获取当前位置的函数
const getLocation = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '正在获取位置'
		});
		uni.getLocation({
			type: 'wgs84',
			success: (res) => {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				resolve({
					latitude: res.latitude,
					longitude: res.longitude
				});
			},
			fail: (err) => {
				uni.showModal({
					title: '提示',
					content: '位置信息获取失败，请授权',
					showCancel: false
				});
				resolve({
					latitude: defaultLat,
					longitude: defaultLon
				}); // 处理位置获取失败的情况 // 默认北京
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	});
};

export {
	getWeatherByLatLon,
	getForecastByLatLon,
	getLocation
};