// app.js
App({
	onLaunch: function () {
    wx.login({
      success: res => {
        const code = res.code;
        wx.getUserInfo({
          success: res => {
						const userInfo = res.userInfo;
						console.log(userInfo);
            // 在这里获取到用户的基本信息，可以进行后续的操作
          },
          fail: err => {
            // 处理获取用户信息失败的情况
          }
        });
      },
      fail: err => {
        // 处理登录失败的情况
      }
    });
  },
})
