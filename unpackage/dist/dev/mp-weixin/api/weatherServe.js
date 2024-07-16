"use strict";
const api_request = require("./request.js");
const weatherServe = {
  getWeather(params) {
    return api_request.request.GET(`/data/2.5/weather`, params);
  },
  getForecast(params) {
    return api_request.request.GET(`/data/2.5/forecast`, params);
  }
};
exports.weatherServe = weatherServe;
