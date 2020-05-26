// 接口的公共地址，后续如果接口改变时可手动改变
const BASE_URL = 'http://10.21.234.73:8080'
export const myRequest = (options)=>{
	return new Promise((resolve, reject)=>{ // Promise相关知识需要学习JavaScript
		// 封装主体：网络请求
		uni.request({
			url: BASE_URL + options.url,	
			data: options.data || {},		// 感觉这里的{}可以不写？
			method: options.method || 'GET',// 默认值是GET，如果有需要改动，在options中设定其他的method值
			success: (res) => {
				console.log(res.data);		// 控制台显示数据信息
				resolve(res)
			},
			fail: (err) =>{
				// 页面中弹框显示失败
				uni.showToast({
					title: '请求接口失败'
				})
				// 返回错误消息
				reject(err)
			}
		})
	}
	)
}