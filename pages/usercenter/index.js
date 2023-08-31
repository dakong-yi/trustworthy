import Toast from 'tdesign-miniprogram/toast/index';

const menuData = [
  [
		{
      title: '陪诊师入驻',
      tit: '',
      url: '',
      type: 'medical-companion-join',
    },
		{
      title: '陪诊师协议',
      tit: '',
      url: '',
      type: 'medical-companion-protocol',
    },
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center',
    },
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
      icon: 'service',
    },
  ],
];

const orderTagInfos = [
  {
    title: '待付款',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '待进行',
    iconName: 'deliver',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
  {
    title: '进行中',
    iconName: 'package',
    orderNum: 0,
    tabType: 40,
    status: 1,
  },
  {
    title: '已完成',
    iconName: 'comment',
    orderNum: 0,
    tabType: 60,
    status: 1,
  }
];

const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    phoneNumber: '',
  },
  menuData,
  orderTagInfos,
  customerServiceInfo: {
		serviceTimeDuration:"每周三至周五 9:00-12:00  13:00-15:00",
		servicePhone:"10086"
	},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    // this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
		const app = getApp();
		this.setData({
			currAuthStep:2,
			isNeedGetUserInfo:true,
			userInfo: app.globalData.userInfo
		});
  },


  onClickCell({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'medical-companion-protocol': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '最终解释权归平台所有',
          icon: '',
          duration: 1000,
        });
        break;
			}
			case 'medical-companion-join': {
				  wx.navigateTo({
						url: '/pages/join/index',
					});
					break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了帮助中心',
          icon: '',
          duration: 1000,
        });
        break;
      }
      
      
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
		const status = e.detail.tabType;
		wx.switchTab({ url: `/pages/order/order-list/index?status=${status}` });
  },

  jumpAllOrder() {
		wx.switchTab({
			url: '/pages/order/order-list/index',
		})

  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const { currAuthStep } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({ url: '/pages/usercenter/person-info/index' });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
