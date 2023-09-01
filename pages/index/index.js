// index.js
import { fetchFunctions } from "./fetch"
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
      fetchFunctions().then((data) =>{
        this.setData({
          functions: data,
        });
        console.log(this.data.functions);
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
			console.log(e);
			wx.navigateTo({
				url: '/pages/form/index'
			});
		}

});

