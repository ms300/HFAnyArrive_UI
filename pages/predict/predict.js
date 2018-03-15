// pages/predict/predict.js
var station = require('../../station.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stations:[],
    index1:0,
    index2:0,
    time:0,
    show_result:0,
    linename:0,
    sstation:"",
    fstation:""
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#512DA8',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    wx.setNavigationBarTitle({
      title: '公交运行时间预测',
    })
    

  },

  lineChange: function (e){
      this.setData({
        stations: station.line_stations[e.detail.value],
        linename: e.detail.value
      });

      this.setData({
        sstation: this.data.stations[0],
        fstation: this.data.stations[0]
      })

    },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value,
      sstation: this.data.stations[e.detail.value]
    })
  }, 
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value,
      fstation: this.data.stations[e.detail.value]
    })
  }, bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
    predict:function(){
      var that=this;
      doPredict(that);
    },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

function doPredict(that) {
  wx.showToast({
    title: '正在进行预测',
    icon: 'loading',
    duration: 60000,
    mask: true

  })
  var r = wx.request({
    url: 'https://hfbus.ms300.cn/predict',
    data: {
      linename: that.data.linename,
      fstation: that.data.fstation,
      sstation: that.data.sstation,
      time: that.data.time
    },
    success: function (res) {
      if (res.statusCode!=200){
        that.setData({
          predict_data: "预测错误:" + res.statusCode ,
          show_result: 0
        })
        wx.hideToast()

      }else{
        wx.hideToast()
        console.log(res.data)
        that.setData({
          predict_data: res.data,
          show_result: 1
        })
      }
    },
    fail: function (res) {
      console.log("预测失败");
      that.setData({
        show_result: 0
      })
      wx.hideToast()
    }
  })
}



