import Toast from 'tdesign-miniprogram/toast/index';
// import { commitPay, wechatPayOrder } from './pay';


const stripeImg = `https://cdn-we-retail.ym.tencent.com/miniapp/order/stripe.png`;

Page({
  data: {
    loading: false,
		orderCard: {}, // 仅用于商品卡片展示
		showPayDialog:false,
		current: 0,
    options: [
      { value: 0, label: '微信支付' },
    ],
    fee:1,
    currencyType:'CNY',
    paymentArgs:{orderID:'1'},
    version:'develop'
  },
  payLock: false,
  onLoad(options) {
    this.setData({
      loading: true,
    });
    const orderCard = {
			thumb:'https://news.blcu.edu.cn/__local/5/F1/81/B3878F10EDE39EE7350771B095A_2CE19E27_14C83.jpg',
			title:'半天陪诊',
			price:29900,
			num: 1,
			specs: '全程陪诊4小时',
			area:'北京市/北京市/朝阳区',
			name:'张三',
			phone:'12345678',
			hospital:'航空总院',
			date:'2023-10-01',
			time:'06:00',
			remark:'暂无',
		};
    this.setData({ orderCard });
  },

	closeDialog() {
		this.setData({ showPayDialog: false });
	},


  handleError() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '结算异常, 请稍后重试',
      duration: 2000,
      icon: '',
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
    this.setData({
      loading: false,
    });
  },  

  // 提交订单
  submitOrder() {
   
		//todo 生成订单，跳转支付页
		this.setData({
      showPayDialog: true,
    });
    
  },

  // 处理支付
  handlePay() {
    this.closeDialog();
    if (this.data.current === 0) {
      // wechatPayOrder(payOrderInfo);
      //todo 支付跳过
      wx.navigateTo({
        url: '/pages/order/pay-result/index',
      }) 
    }
  },
});
