"use strict";
const kelvinToCelsius = (kelvin) => {
  return kelvin > 0 ? (Number(kelvin) - 273.15).toFixed(1) : 0;
};
const getWindDirection = (deg) => {
  if (deg >= 337.5 || deg < 22.5) {
    return "北风";
  } else if (deg >= 22.5 && deg < 67.5) {
    return "东北风";
  } else if (deg >= 67.5 && deg < 112.5) {
    return "东风";
  } else if (deg >= 112.5 && deg < 157.5) {
    return "东南风";
  } else if (deg >= 157.5 && deg < 202.5) {
    return "南风";
  } else if (deg >= 202.5 && deg < 247.5) {
    return "西南风";
  } else if (deg >= 247.5 && deg < 292.5) {
    return "西风";
  } else if (deg >= 292.5 && deg < 337.5) {
    return "西北风";
  } else {
    return "未知风向";
  }
};
const getDayInfo = (dateString) => {
  const date = new Date(dateString);
  const today = /* @__PURE__ */ new Date();
  const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date.getTime() === today.getTime()) {
    return "今天";
  } else {
    return dayOfWeek;
  }
};
const filterByDate = (data) => {
  const filteredMap = data.reduce((map, obj) => {
    const date = obj.dt_txt.split(" ")[0];
    map.set(date, obj);
    return map;
  }, /* @__PURE__ */ new Map());
  return Array.from(filteredMap.values());
};
exports.filterByDate = filterByDate;
exports.getDayInfo = getDayInfo;
exports.getWindDirection = getWindDirection;
exports.kelvinToCelsius = kelvinToCelsius;
