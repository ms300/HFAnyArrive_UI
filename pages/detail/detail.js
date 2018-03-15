//logs.js
var savedOption={}
const util = require('../../utils/util.js')
var station=require('../../station.js')
Page({
  data: {
    logs: [],
    bus_data:station.bus_data,
    show_result:0
  },
  onLoad: function (option) {
    console.log(option)
    savedOption=option
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1976D2',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var that = this;
    initBusDetail(that,option);

  },
  freshBtn: function(e){
    var that = this;
    initBusDetail(that, savedOption);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '合肥准时达——查询合肥实时公交信息',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

function initBusDetail(that,option){
  wx.showToast({
    title: '正在查询数据',
    icon: 'loading',
    duration: 10000,
    mask: true

  })
  var r = wx.request({
    url: 'https://hfbus.ms300.cn/bus_detail',
    data: {
      linename: option.linename,
      fstation:option.fstation,
      currentstation:option.currentstation,
      nextstation:option.nextstation
    },
    success: function (res) {
      wx.hideToast()
      console.log(res.data)
      that.setData({
        bus_data: res.data,
        show_result: 1
      })
    },
    fail: function (res) {
      console.log("加载失败");
      that.setData({
        show_result: 0
      })
      wx.hideToast()
    }
  })
}