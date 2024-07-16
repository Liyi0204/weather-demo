 import request from './request.js'
 
 export default {
   getWeather(params) {
     return request.GET(`/data/2.5/weather`, params)
   },
   getForecast(params) {
     return request.GET(`/data/2.5/forecast`, params)
   },
 }