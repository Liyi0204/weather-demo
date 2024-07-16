"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_appStore = require("../../stores/appStore.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      initAppWaather,
      weatherInfo
    } = stores_appStore.useAppStore();
    initAppWaather();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(utils_index.kelvinToCelsius)(common_vendor.unref(weatherInfo).temp)),
        b: common_vendor.t(common_vendor.unref(utils_index.kelvinToCelsius)(common_vendor.unref(weatherInfo).feels_like)),
        c: common_vendor.t(`${common_vendor.unref(weatherInfo).description ? common_vendor.unref(weatherInfo).description + "｜" : ""}`),
        d: common_vendor.t(common_vendor.unref(utils_index.kelvinToCelsius)(common_vendor.unref(weatherInfo).temp)),
        e: common_vendor.t(common_vendor.unref(utils_index.getWindDirection)(common_vendor.unref(weatherInfo).deg)),
        f: common_vendor.t(common_vendor.unref(weatherInfo).speed),
        g: common_vendor.f(common_vendor.unref(weatherInfo).forecast, (item, index, i0) => {
          var _a, _b, _c, _d, _e;
          return {
            a: common_vendor.t(common_vendor.unref(utils_index.getDayInfo)(item == null ? void 0 : item.dt_txt)),
            b: `../../static/images/${(_a = item.weather[0]) == null ? void 0 : _a.icon.slice(0, 2)}.png`,
            c: common_vendor.t(common_vendor.unref(utils_index.getWindDirection)((_b = item.wind) == null ? void 0 : _b.deg)),
            d: common_vendor.t((_c = item.wind) == null ? void 0 : _c.speed),
            e: common_vendor.t(common_vendor.unref(utils_index.kelvinToCelsius)((_d = item.main) == null ? void 0 : _d.temp_min)),
            f: common_vendor.t(common_vendor.unref(utils_index.kelvinToCelsius)((_e = item.main) == null ? void 0 : _e.temp_max)),
            g: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/helloworld/Documents/HBuilderProjects/weather-demo/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
