// app.js
App({
	onLaunch: function () {
		wx.getStorage({
			key: 'userInfo',
			success: function(res) {
				const userInfo = res.data;
				const {expireAt} = userInfo;
				console.log(userInfo);
				if (userInfo == null || expireAt < Date.now()) {
					console.log(userInfo);
					getApp().getUserinfo();
				} 
				getApp().globalData.userInfo = userInfo;
				console.log('获取到用户信息：', userInfo);
			},
			fail: function(err) {
				getApp().getUserinfo();
				console.log('获取用户信息失败：' + err.errMsg);
			}
		});
	},
	getUserinfo: function(){
		wx.login({
			success: res => {
				if (res.code) {
					// 获取到用户的登录凭证
					const code = res.code;
					console.log(code);
					// 在这里可以将 code 发送到开发者服务器进行进一步处理
					const expireAt = 2*24*3600 + Date.now();
					const userInfo = { nickName: 'John', age: 25 ,avatarUrl:'https://pic1.zhimg.com/v2-4f8cdd5b17b804d8a3557cf1a2757a9c_r.jpg',expireAt:expireAt };
					wx.setStorage({
						key: 'userInfo',
						data: userInfo,
						success: function() {
							console.log('用户信息保存成功');
							getApp().globalData.userInfo = userInfo;
						},
						fail: function(err) {
							console.log('用户信息保存失败：' + err.errMsg);
						}
					});
				} else {
					// 登录失败
					console.log('登录失败：' + res.errMsg);
				}
			},
			fail: err => {
				// 调用登录接口失败
				console.log('调用登录接口失败：' + err.errMsg);
			}
		});
	},
	globalData: {
    userInfo: null
  }
})
