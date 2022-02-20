// pages/classes_content/classes_content.js

// 获取APP的全局变量值
var app = getApp()
console.log(app.globalData)
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      course_data: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var course_data = app.globalData.course_data
      this.setData({
        course_data: course_data
      })
    },

    // 点击报名按钮，跳转到支付页面
    apply_click: function () {
        wx.navigateTo({
          url: '../confirm_order/confirm_order',
        })
    }
})