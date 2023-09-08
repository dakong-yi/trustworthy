import {OrderStatus} from '../order/config';
import {updateOrderStatus} from './fetch';
Page({
  data: {
    paymentMethods: [
      { value: 'credit-card', label: '信用卡' },
      { value: 'alipay', label: '支付宝' },
      { value: 'wechat-pay', label: '微信支付' },
    ],
    selectedPaymentMethod: 'wechat-pay',
    order:{},
  },

  onLoad(options){
    const order = JSON.parse(decodeURIComponent(options.order));
    this.setData({order});
    console.log(order);
  },
  handlePaymentMethodChange(event) {
    this.setData({
      selectedPaymentMethod: event.detail.value
    });
  },
  handlePayment() {
    // 处理支付逻辑
    const selectedPaymentMethod = this.data.selectedPaymentMethod;
    // 调用支付接口进行支付操作
    console.log('Selected payment method:', selectedPaymentMethod);
    const id = this.data.order.orderNo;
    const totalPaid = this.data.order.amount;
    const orderNo = this.data.order.orderNo;
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
          url: '/pages/order/pay-result/index?totalPaid='+totalPaid+'&orderNo='+orderNo,
        }) 
      });
  },

});