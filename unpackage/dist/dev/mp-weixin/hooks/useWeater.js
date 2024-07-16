"use strict";
const common_vendor = require("../common/vendor.js");
const api_weatherServe = require("../api/weatherServe.js");
const appid = "638aeca10d88da8c6d3e3ad2a9594494";
const defaultLat = 39.9167;
const defaultLon = 116.3975;
const lang = "zh_cn";
const getWeatherByLatLon = async (lat = defaultLat, lon = defaultLon) => {
  try {
    const params = {
      appid,
      lat,
      lon,
      lang
    };
    const response = await api_weatherServe.weatherServe.getWeather(params);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
const getForecastByLatLon = async (lat = defaultLat, lon = defaultLon) => {
  try {
    const params = {
      appid,
      lat,
      lon,
      lang
    };
    const response = await api_weatherServe.weatherServe.getForecast(params);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
const getLocation = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "正在获取位置"
    });
    common_vendor.index.getLocation({
      type: "wgs84",
      success: (res) => {
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);
        resolve({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: (err) => {
        common_vendor.index.showModal({
          title: "提示",
          content: "位置信息获取失败，请授权",
          showCancel: false
        });
        resolve({
          latitude: defaultLat,
          longitude: defaultLon
        });
      },
      complete: () => {
        common_vendor.index.hideLoading();
      }
    });
  });
};
exports.getForecastByLatLon = getForecastByLatLon;
exports.getLocation = getLocation;
exports.getWeatherByLatLon = getWeatherByLatLon;
