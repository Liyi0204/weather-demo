"use strict";
const common_vendor = require("../common/vendor.js");
const hooks_useWeater = require("../hooks/useWeater.js");
const utils_index = require("../utils/index.js");
const useAppStore = common_vendor.defineStore("app", () => {
  const weatherInfo = common_vendor.reactive({
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
  });
  const initAppWaather = async () => {
    const location = await hooks_useWeater.getLocation();
    const {
      latitude,
      longitude
    } = location;
    const weatherData = await hooks_useWeater.getWeatherByLatLon(latitude, longitude);
    const forecastData = await hooks_useWeater.getForecastByLatLon(latitude, longitude);
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
      forecast: utils_index.filterByDate(list)
    };
    Object.assign(weatherInfo, info);
  };
  return {
    weatherInfo,
    initAppWaather
  };
});
exports.useAppStore = useAppStore;
