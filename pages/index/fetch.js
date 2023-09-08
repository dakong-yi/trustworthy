import {httpHeader,host} from "../../config/index"

function fetchFunctions() {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: host + '/api/functions', // 接口的URL
			method: 'GET', // 请求方法，可以是 GET、POST、PUT、DELETE 等
			header: httpHeader,
			success: function(res) {
				// 请求成功时的处理逻辑
				resolve(res.data);
			},
			fail: function(err) {
				// 请求失败时的处理逻辑
				reject(err);
			}
		});
	});
};

function fetchBanners() {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: host + '/api/banners', // 接口的URL
			method: 'GET', // 请求方法，可以是 GET、POST、PUT、DELETE 等
			header: httpHeader,
			success: function(res) {
				// 请求成功时的处理逻辑
				resolve(res.data);
			},
			fail: function(err) {
				// 请求失败时的处理逻辑
				reject(err);
			}
		});
	});
};

function fetchServices() {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: host + '/api/services', // 接口的URL
			method: 'GET', // 请求方法，可以是 GET、POST、PUT、DELETE 等
			header: httpHeader,
			success: function(res) {
				// 请求成功时的处理逻辑
				resolve(res.data);
			},
			fail: function(err) {
				// 请求失败时的处理逻辑
				reject(err);
			}
		});
	});
};

module.exports = {
	fetchFunctions:fetchFunctions,
	fetchBanners:fetchBanners,
	fetchServices:fetchServices,
};