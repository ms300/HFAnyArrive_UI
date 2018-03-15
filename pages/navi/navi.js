//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {


    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1976D2',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
})
