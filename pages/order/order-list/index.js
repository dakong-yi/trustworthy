import { OrderStatus } from '../config';

Page({
  data: {
		page: {
			size: 5,
			num: 1,
		},
    tabs: [
      { key: -1, text: '全部' },
      { key: OrderStatus.PENDING_PAYMENT, text: '待付款', info: '' },
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
    this.pullDownRefresh = this.selectComponent('#wr-pull-down-refresh');
  },

  onShow() {
    if (!this.data.backRefresh) return;
    this.onRefresh();
    this.setData({ backRefresh: false });
  },

  onReachBottom() {
    if (this.data.listLoading === 0) {
      this.getOrderList(this.data.curTab);
    }
  },

  onPageScroll(e) {
    this.pullDownRefresh && this.pullDownRefresh.onPageScroll(e);
  },

  onPullDownRefresh_(e) {
    const { callback } = e.detail;
    this.setData({ pullDownRefreshing: true });
    this.refreshList(this.data.curTab)
      .then(() => {
        this.setData({ pullDownRefreshing: false });
        callback && callback();
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
    const params = {
      parameter: {
        pageSize: this.data.page.size,
        pageNum: this.data.page.num,
      },
		};
		const orderList = [
			{
				orderNo:"1235678",
				statusDesc:'待付款',
				status:5,
				totalAmount:19900,
				amount:9900,
				freightFee:0,
				goodsList:[
					{
						id:'1',
						thumb:'https://news.blcu.edu.cn/__local/5/F1/81/B3878F10EDE39EE7350771B095A_2CE19E27_14C83.jpg',
						title:'半天陪诊',
						price:19900,
						num:1,
						specs:["全天任选4小时"],
					}
				],
				buttons:[{ primary: false, type: 2, name: '取消订单' },
				{ primary: true, type: 1, name: '付款' }],
			}
		];
    if (statusCode !== -1) params.parameter.orderStatus = statusCode;
		this.setData({ listLoading: 0 });
		this.setData({orderList: orderList});
    return [];
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
    this.page = {
      size: this.data.page.size,
      num: 1,
		};
		const orderList = [
			{},
		];
    this.setData({ curTab: status, orderList: [] });
		
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
