// pages/confirm_order/confirm_order.js

// 获取APP的全局变量值
var app = getApp()
console.log(app.globalData)
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      open_id: null,
      course_info: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 获取课程详情
      var course_info = app.globalData.course_data
      // 转换对象作用域
      var that = this
      // 传递数据
      that.setData({
        course_info: course_info
      })
      // 调用云函数获取用户的openid
      wx.cloud.callFunction({
        name: 'get_openid',
        success(res){
          that.setData({
            open_id: res.result.openid
          })
        }
      })
    },

    
    // 用户点击支付
    pay_click: function () {
      // 获取课程详情
      var course_info = this.data.course_info
      // 获取openId
      var open_id = this.data.open_id
      wx.request({
        url: 'http://localhost:8080/WXPay/goWeChatPay',
        method: 'POST',
        header: {
          'content-type': "application/x-www-form-urlencoded",
        },
        data: {
          'openid': open_id,
          'detail': course_info.title,
        },
        success(res){
          console.log(res.data)
          var app_id = res.data.data.appId
          var nonceStr = res.data.data.nonceStr
          var orderId = res.data.data.orderId
          var package = res.data.data.package
          var paySign = res.data.data.paySign
          var signType = res.data.data.signType
          var timeStamp = res.data.data.timeStamp
          wx.requestPayment({
            "timeStamp": timeStamp,
            "nonceStr": nonceStr,
            "package": package,
            "SignType": signType,
            "paySign": paySign,
            success(res){
              console.log(res)
            }
          })
        }
      })
    }
})