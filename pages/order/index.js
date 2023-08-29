import Toast from 'tdesign-miniprogram/toast/index';
// import { commitPay, wechatPayOrder } from './pay';


const stripeImg = `https://cdn-we-retail.ym.tencent.com/miniapp/order/stripe.png`;

Page({
  data: {
    loading: false,
    orderCard: {}, // 仅用于商品卡片展示
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


  onInput(e) {
    const { storeNoteIndex } = this.data;
    this.noteInfo[storeNoteIndex] = e.detail.value;
  },
  onBlur() {
    this.setData({
      notesPosition: 'center',
    });
  },
  onFocus() {
    this.setData({
      notesPosition: 'self',
    });
  },
  onTap() {
    this.setData({
      placeholder: '',
    });
  },
  

  onSureCommit() {
	},
  // 提交订单
  submitOrder() {
   
    
    
  },

  // 处理支付
  handlePay(data, settleDetailData) {
    const { channel, payInfo, tradeNo, interactId, transactionId } = data;
    const { totalAmount, totalPayAmount } = settleDetailData;
    const payOrderInfo = {
      payInfo: payInfo,
      orderId: tradeNo,
      orderAmt: totalAmount,
      payAmt: totalPayAmount,
      interactId: interactId,
      tradeNo: tradeNo,
      transactionId: transactionId,
    };

    if (channel === 'wechat') {
      // wechatPayOrder(payOrderInfo);
    }
  },
});
