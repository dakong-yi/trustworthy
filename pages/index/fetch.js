function fetchFunctions() {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: 'http://127.0.0.1:1337/functions', // 接口的URL
			method: 'GET', // 请求方法，可以是 GET、POST、PUT、DELETE 等
			header: {
				'Content-Type': 'application/json', // 请求头中的内容类型
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.foy2GzmA56rTyAfjUrEcfUSAIAMzjBx99eKJ2rBGIng'
			},
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
}

module.exports = {
	fetchFunctions:fetchFunctions
};