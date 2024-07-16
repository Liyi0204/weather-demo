"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://api.openweathermap.org";
const sendRequest = async (url, data, sendType, opt) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + url,
      data,
      // header: {
      // 	'token': getToken()
      // },
      timeout: 1e4,
      method: sendType,
      success: function(res) {
        const {
          cod,
          message,
          success,
          status
        } = res.data;
        if (cod == 200) {
          resolve(res);
        } else {
          if (message) {
            console.log("bad reqest:", message);
            common_vendor.index.showToast({
              title: message,
              icon: "none"
            });
          } else {
            console.log("bad reqest:", res.data.error);
            common_vendor.index.showModal({
              title: "提示",
              content: "服务维护中，请稍后重试",
              //+res.data.error,
              showCancel: false
            });
          }
          reject(res.data);
        }
      },
      fail: function(res) {
        console.log("error", res);
      }
    });
  });
};
const GET = (url, data, opt) => {
  return sendRequest(url, {
    ...data
  }, "GET");
};
const POST = (url, data, opt) => {
  return sendRequest(url, data, "POST");
};
const request = {
  BASE_URL,
  GET,
  POST
};
exports.request = request;
