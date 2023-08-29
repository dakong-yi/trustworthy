// pages/form/index.js
import Toast from 'tdesign-miniprogram/toast/index';
//import { fetchDeliveryAddress } from '../../../../services/address/fetchAddress';
import { areaData } from '../../config/index';
import { resolveAddress, rejectAddress } from './util';

const innerPhoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$';
const innerNameReg = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$';

Page({
  data: {
    locationState: {
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      districtCode: '',
      districtName: '',
    },
    areaData: areaData,
    areaPickerVisible: false,

    mode: '',
    dateVisible: false,
    date: new Date().getTime(), // 支持时间戳传入
    dateText: '',

    // 指定选择区间起始值
    start: '2023-01-01 00:00:00',
    end: '2099-12-31 00:00:00',

    timeVisible: false,
    time: '06:00', // 支持时间戳传入
    timeText: '',
    hospital: '',
    name: '',
    phone: '',
    remark: '',
    orderType:'',
    submitActive: false,
    verifyTips:'请填写完整内容',
  },

  showPicker(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },

  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    const { mode } = this.data;

    console.log('confirm', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });
    this.hidePicker();
  },

  

    onColumnChange(e) {
      console.log('picker pick:', e);
    },

    onPickerChange(e) {
      const { key } = e.currentTarget.dataset;
      const { value } = e.detail;

      console.log('picker change:', e.detail);
      this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: value,
        [`${key}Text`]: value.join(' '),
      });
    },

    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },


    onInputValue(e) {
      const item  = e.currentTarget.dataset.item;

      if (item === 'address') {
        const { selectedOptions = [] } = e.detail;
        this.setData(
          {
            'locationState.provinceCode': selectedOptions[0].value,
            'locationState.provinceName': selectedOptions[0].label,
            'locationState.cityName': selectedOptions[1].label,
            'locationState.cityCode': selectedOptions[1].value,
            'locationState.districtCode': selectedOptions[2].value,
            'locationState.districtName': selectedOptions[2].label,
            areaPickerVisible: false,
          },
          () => {
            const { isLegal, tips } = this.onVerifyInputLegal();
            this.setData({
              submitActive: isLegal,
            });
            this.data.verifyTips = tips;
          },
        );
      } else {
        const value = e.detail.value;
        console.log(e.detail);
        var newItem = item
        if(item == "date" || item=="time") {
          newItem = item+'Text'
        }
        this.setData(
          {
            [`${newItem}`]: value,
          },
          () => {
            console.log(this.data.hospital);
            const { isLegal, tips } = this.onVerifyInputLegal();
            this.setData({
              submitActive: isLegal,
              verifyTips:tips,
            });
          },
        );
      }
    },
    onVerifyInputLegal() {
      const { provinceCode,cityCode, districtCode } = this.data.locationState;
      const name = this.data.name;
      const phone = this.data.phone;
      const hospital = this.data.hospital;
      const date = this.data.date;
      const time = this.data.time;
      const prefixPhoneReg = String(this.properties.phoneReg || innerPhoneReg);
      const prefixNameReg = String(this.properties.nameReg || innerNameReg);
      const nameRegExp = new RegExp(prefixNameReg);
      const phoneRegExp = new RegExp(prefixPhoneReg);
      
      if (!date) {
        return {
          isLegal: false,
          tips: '请选择就诊日期',
        };
      }
      if (!time || !time.trim()) {
        return {
          isLegal: false,
          tips: '请选择就诊时间',
        };
      }
      if (!hospital || !hospital.trim()) {
        return {
          isLegal: false,
          tips: '请填写就诊医院',
        };
      }
      if (!name || !name.trim()) {
        return {
          isLegal: false,
          tips: '请填写联系人',
        };
      }
      if (!nameRegExp.test(name)) {
        return {
          isLegal: false,
          tips: '联系人仅支持输入中文、英文（区分大小写）、数字',
        };
      }
      if (!phone || !phone.trim()) {
        return {
          isLegal: false,
          tips: '请填写手机号',
        };
      }
      if (!phoneRegExp.test(phone)) {
        return {
          isLegal: false,
          tips: '请填写正确的手机号',
        };
      }
      if (!districtCode || !districtCode.trim()) {
        return {
          isLegal: false,
          tips: '请选择省市区信息',
        };
      }
      return {
        isLegal: true,
        tips: '添加成功',
      };
    },
    onPickArea() {
      this.setData({ areaPickerVisible: true });
    },
    onSubmit() {
      // const { submitActive,verifyTips } = this.data;
      // if (!submitActive) {
      //   Toast({
      //     context: this,
      //     selector: '#t-toast',
      //     message: verifyTips,
      //   });
      //   return;
      // }
      //todo 接口请求
      wx.navigateTo({
        url: '/pages/order/index',
      })
    },

});
