import { OrderStatus,OrderStatusText ,OrderStatusButtons} from '../config';
import {fetchOrders} from './fetch';

Page({
  data: {
		page: {
			size: 5,
			num: 1,
		},
    tabs: [
      { key: -1, text: '全部' },
			{ key: OrderStatus.PENDING_PAYMENT, text: '待付款', info: '' },
			{ key: OrderStatus.PENDING_DELIVERY, text: '待进行', info: '' },
      { key: OrderStatus.PENDING_RECEIPT, text: '待完成', info: '' },
      { key: OrderStatus.COMPLETE, text: '已完成', info: '' },
    ],
    curTab: -1,
    orderList: [],
    listLoading: 0,
    pullDownRefreshing: false,
    emptyImg:
      'https://cdn-we-retail.ym.tencent.com/miniapp/order/empty-order-list.png',
    backRefresh: false,
    status: -1,
  },
  
  onLoad(query) {
    let status = parseInt(query.status);
    status = this.data.tabs.map((t) => t.key).includes(status) ? status : -1;
    this.init(status);
  },

  onShow() {
    if (!this.data.backRefresh) return;
    this.onRefresh();
    this.setData({ backRefresh: false });
  },

  onReachBottom() {
    console.log(this.data.page.num);
    if (this.data.listLoading === 0) {
      this.getOrderList(this.data.curTab);
    }
  },

  onPageScroll(e) {
    this.pullDownRefresh && this.pullDownRefresh.onPageScroll(e);
  },

  onPullDownRefresh_(e) {
    this.setData({ pullDownRefreshing: true });
    this.refreshList(this.data.curTab)
      .then(() => {
        this.setData({ pullDownRefreshing: false });
      })
      .catch((err) => {
        this.setData({ pullDownRefreshing: false });
        Promise.reject(err);
      });
  },

  init(status) {
    status = status !== undefined ? status : this.data.curTab;
    this.setData({
      status,
    });
    this.refreshList(status);
  },

  getOrderList(statusCode = -1, reset = false) {
    let query = 'filters[status][$gt]=-1';
    if(statusCode !== -1) {
      query = 'filters[status][$eq]='+statusCode
    }
    query = query + "&pagination[page]="+this.data.page.num+"&pagination[pageSize]="+this.data.page.size
    this.setData({ listLoading: 1 });
    fetchOrders(query).then((res) =>{
      const orderList = res.data.map((item)=>{
        const order = {
          orderNo: item.id,
          status:item.attributes.status,
          statusDesc:OrderStatusText[item.attributes.status],
          totalAmount:item.attributes.amount,
          amount:item.attributes.amount,
          freightFee:0,
          goodsList:[
            {
              id:item.attributes.service_id,
              thumb:item.attributes.service_image,
              title:item.attributes.service_title,
              price:item.attributes.amount,
              num:1,
              specs:[item.attributes.service_desc],
            },
          ],
          buttons:OrderStatusButtons[item.attributes.status]
        };
        return order;
      });

      return new Promise((resolve) => {
        if (reset) {
          this.setData({ orderList: [] }, () => resolve());
        } else resolve();
      }).then(() => {
        this.setData({
          orderList: this.data.orderList.concat(orderList),
          listLoading: orderList.length && orderList.length == this.data.page.size > 0  ? 0 : 2,
          page: {num:++this.data.page.num,size:this.data.page.size},
        });
      });      
    })
    .catch((err) => {
      this.setData({ listLoading: 3 });
      return Promise.reject(err);
    });
  },

  onReTryLoad() {
    this.getOrderList(this.data.curTab);
  },

  onTabChange(e) {
    const { value } = e.detail;
    this.setData({
      status: value,
    });
    this.refreshList(value);
  },

  getOrdersCount() {
    // return fetchOrdersCount().then((res) => {
    //   const tabsCount = res.data || [];
    //   const { tabs } = this.data;
    //   tabs.forEach((tab) => {
    //     const tabCount = tabsCount.find((c) => c.tabType === tab.key);
    //     if (tabCount) {
    //       tab.info = tabCount.orderNum;
    //     }
    //   });
    //   this.setData({ tabs });
    // });
  },

  refreshList(status = -1) {
    const page = {
      size: this.data.page.size,
      num: 1,
		};
    this.setData({ curTab: status, orderList: [] ,page:page});
		
    return Promise.all([
      this.getOrderList(status, true),
      this.getOrdersCount(),
    ]);
  },

  onRefresh() {
    this.refreshList(this.data.curTab);
  },

  onOrderCardTap(e) {
    const { order } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/order/order-detail/index?orderNo=${order.orderNo}`,
    });
  },
});
