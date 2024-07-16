// 将开尔文温度转换为摄氏度
export const kelvinToCelsius = (kelvin) => {
	return kelvin > 0 ? (Number(kelvin) - 273.15).toFixed(1) : 0;
}

// 判断风向
export const getWindDirection = (deg) => {
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

// 周几
export const getDayInfo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
        return '今天';
    } else {
        return dayOfWeek;
    }
}

// 封装函数，根据日期保留一条数据
export const filterByDate = (data) => {
    // 使用 Map 来按日期保留一条数据
    const filteredMap = data.reduce((map, obj) => {
        const date = obj.dt_txt.split(' ')[0]; // 提取日期部分作为键
        map.set(date, obj); // 使用日期作为 Map 的键，保留每天的最后一条数据
        return map;
    }, new Map());
    
    // 将 Map 中的值转换为数组并返回
    return Array.from(filteredMap.values());
}
