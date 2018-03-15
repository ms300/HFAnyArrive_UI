//index.js
//获取应用实例
var WxSearch = require('../wxSearch/wxSearch.js');
var station = require('../../station.js');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    station_data:station.station_data,
    show_result:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      console.log('onLoad');
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4CAF50',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      wx.setNavigationBarTitle({
        title: '合肥准时达',
      })
      var that = this;
      //初始化的时候渲染wxSearchdata 第二个为你的search高度
      WxSearch.init(that, 43, ['226路', '126路', '129路', '科技馆', '肥西路']);
      WxSearch.initMindKeys(station.stations.concat(station.lines));
  },
      wxSearchFn: function (e) {
        var that = this
        WxSearch.wxSearchAddHisKey(that);
        searchStation(that);
      },
      wxSearchInput: function (e) {
        var that = this
        WxSearch.wxSearchInput(e, that);
      },
      wxSerchFocus: function (e) {
        var that = this
        WxSearch.wxSearchFocus(e, that);
      },
      // wxSearchBlur: function (e) {
      //   var that = this
      //   WxSearch.wxSearchBlur(e, that);
      // },
      wxSearchKeyTap: function (e) {
        var that = this
        WxSearch.wxSearchKeyTap(e, that);
      },
      wxSearchDeleteKey: function (e) {
        var that = this
        WxSearch.wxSearchDeleteKey(e, that);
      },
      wxSearchDeleteAll: function (e) {
        var that = this;
        WxSearch.wxSearchDeleteAll(that);
      },
      wxSearchTap: function (e) {
        var that = this
        WxSearch.wxSearchHiddenPancel(that);
      },
      showBusDetail: function(e){
        var that = this;
        showBusDetail(that);
      },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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

function searchStation(that){
  var keyword = that.data.wxSearchData.value;
  console.log(keyword);
  wx.showLoading({
    title: '加载中',
  })
  var r= wx.request({
    url: 'https://hfbus.ms300.cn/find_bus', 
    data: {
      keyword:keyword
    },
    success: function (res) {
      wx.hideLoading()
      //console.log(res.data)
      that.setData({
        station_data: res.data,
        show_result:1
      })
    },
    fail:function(res){
      that.setData({
        show_result: 0
      })
      wx.hideLoading()
    }
  })
}
