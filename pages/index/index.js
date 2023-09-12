// index.js
import { fetchFunctions,fetchBanners,fetchServices } from "./fetch"
import Dialog from 'tdesign-miniprogram/dialog/index';
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

Page({
  data: {
    banners:[],
    services:[],
		img1: 'https://tdesign.gtimg.com/miniprogram/images/example1.png',
    img2: 'https://tdesign.gtimg.com/miniprogram/images/example2.png',
		img3: 'https://tdesign.gtimg.com/miniprogram/images/example3.png',
		image: 'https://news.blcu.edu.cn/__local/5/F1/81/B3878F10EDE39EE7350771B095A_2CE19E27_14C83.jpg',
    functions:[],
    vertical: false,
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
		swiperList
  },

    onLoad(e) {
      fetchFunctions().then((res) =>{
        const functions = res.data.map((item)=>{
          const func = {
            id:item.id,
            title:item.attributes.title,
            image:item.attributes.image,
            serviceID:item.attributes.service_id,
          };
          return func;
        });
        this.setData({
          functions: functions,
        });
      });

      fetchBanners().then((res) =>{
        const banners = res.data.map((item)=>{
          return item.attributes.image;
        });
        this.setData({banners:banners});
      });

      fetchServices().then((res) =>{
        const services = res.data.map((item)=>{
          const service = {
            id:item.id,
            title:item.attributes.title,
            image:item.attributes.image,
            desc:item.attributes.desc,
            price:item.attributes.price,
          };
          return service;
        });
        this.setData({services:services});
      });
    },

    onTap(e) {
      const { index } = e.detail;


    },
    onChange(e) {
      const { current, source } = e.detail;


    },
    onImageLoad(e) {

		},
		
		onClickGridItem(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
				url: '/pages/form/index?id='+id
			});
    },

});

