// app.js
import {host} from './config/index'
App({
	onLaunch: function () {
		wx.getStorage({
			key: 'userInfo',
			success: function(res) {
				const userInfo = res.data;
				const {expireAt} = userInfo;
				if (userInfo == null || expireAt < Date.now()) {
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
						let userInfo = {};
						wx.request({
							url: host+'/strapi-wechat-miniprogram-auth/login',
							method: "post",
							data: {
								code: code,
								userInfo
							},
							success(res) {
								console.log('wx.request res', res)
								userInfo = res.data.user
								const expireAt = 2*24*3600 + Date.now();
								userInfo['expireAt'] = expireAt
								console.log(userInfo);
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
