import {httpHeader,host} from "../../../config/index"

function fetchOrders(query) {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: host + '/api/orders?'+query, // 接口的URL
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

function submitOrder(data) {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: host + '/api/orders', // 接口的URL
			method: 'POST', // 请求方法，可以是 GET、POST、PUT、DELETE 等
			header: httpHeader,
			data:{'data':data},
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

function updateOrderStatus(id,data) {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: host + '/api/orders/'+id, // 接口的URL
			method: 'PUT', // 请求方法，可以是 GET、POST、PUT、DELETE 等
			header: httpHeader,
			data:{'data':data},
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
	fetchOrders:fetchOrders,
	submitOrder:submitOrder,
};