// pages/confirm_order/confirm_order.js

// 获取APP的全局变量值
var app = getApp()
// console.log(app.globalData)
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
      // 获取用户手机号码
      var mobile_number = app.globalData.user_mobile_number
      // 获取openId
      var open_id = this.data.open_id
      wx.request({
        url: 'https://epass.sibd.org.cn:8080/WXPay/goWeChatPay',
        method: 'POST',
        header: {
          'content-type': "application/x-www-form-urlencoded",
        },
        data: {
          'course_name': course_info.title,
          'openid': open_id,
          'course_id': course_info.course_id,
          'student_id': app.globalData.student_id,
          'school_id': app.globalData.school_id,
          'class_id': course_info.class_id,
          'week': course_info.week,
          'start_time': course_info.start_time
        },
        success(res){
          console.log(res.data.data)
          console.log('awdasd')
          wx.requestPayment({
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType:'MD5',
            paySign: res.data.data.sign,
            timeStamp: res.data.data.timeStamp,
            "success":function(res){
              wx.navigateTo({
                url: '../order_success/order_success',
              })
            },
            "fail":function(res){
              console.log(res)
            },
      			"complete":function(res){
      			  console.log(res)
      			}
          })
          
        }
      })
    } 
})