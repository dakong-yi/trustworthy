import Toast from 'tdesign-miniprogram/toast/index';
// import { commitPay, wechatPayOrder } from './pay';
import {submitOrder,updateOrderStatus} from './fetch';
import {OrderStatus} from './config';

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
    version:'develop',
    formData:{},
    orderID:'',
  },
  payLock: false,
  onLoad(options) {
    const service = JSON.parse(decodeURIComponent(options.service));
    const formData = JSON.parse(decodeURIComponent(options.formData));
    this.setData({
      loading: true,
      formData
    });
    const orderCard = {
			thumb:service.image,
			title:service.title,
			price:formData.amount,
			num: 1,
			specs: service.desc,
			area:formData.province+'/'+formData.city+'/'+formData.district,
			name:formData.name,
			phone:formData.tel,
			hospital:formData.hospital,
			date:formData.appointment_date,
			time:formData.appointment_time,
			remark:formData.remark,
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
   const data = this.data.formData;
   data['status'] = OrderStatus.PENDING_PAYMENT

    submitOrder(data).then((res) =>{
      const item = res.data;
      if(!item.id){
        Toast({
          context: this,
          selector: '#t-toast',
          message: '提交失败',
        });
        return;
      }
      const orderCard = this.data.orderCard;
      orderCard['orderNo'] = item.id;
      const order = encodeURIComponent(JSON.stringify(orderCard))
      wx.navigateTo({
        url: '/pages/pay/index?order='+order,
      });
    });
  },

  // 处理支付
  handlePay() {
    this.closeDialog();
    if (this.data.current === 0) {
      // wechatPayOrder(payOrderInfo);
      //todo 微信支付跳过
    }
    const id = this.data.orderID
    const data = {status:OrderStatus.PENDING_DELIVERY}
    updateOrderStatus(id,data).then((res) =>{
        const item = res.data;
        if(!item.id){
          Toast({
            context: this,
            selector: '#t-toast',
            message: '支付失败请联系客服',
          });
          return;
        }
        wx.navigateTo({
          url: '/pages/order/pay-result/index',
        }) 
      });
  },
});
