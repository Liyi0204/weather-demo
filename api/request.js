const BASE_URL = import.meta.env.VITE_APP_BASE_URL
const sendRequest = async (url, data, sendType, opt) => {
	// const {
	// 	getToken,
	// 	clearToken
	// } = useUser()
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data: data,
			// header: {
			// 	'token': getToken()
			// },
			timeout: 10000,
			method: sendType,
			success: function(res) {
				const {
					cod,
					message,
					success,
					status
				} = res.data
				if (cod == 200) {
					resolve(res);
				} else {
					if (message) {
						//已知的异常，有返回
						console.log('bad reqest:', message);
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}else {
						//未知的异常
						console.log('bad reqest:', res.data.error);
						uni.showModal({
							title: '提示',
							content: '服务维护中，请稍后重试', //+res.data.error,
							showCancel: false
						})
					}
					reject(res.data);
				}
			},
			fail: function(res) {
				console.log('error', res);
			}
		})
	})
}

const GET = (url, data, opt) => {
	return sendRequest(url, {
		...data
	}, 'GET', opt)
}

const POST = (url, data, opt) => {
	return sendRequest(url, data, 'POST', opt)
}

export default {
	BASE_URL,
	GET,
	POST
}