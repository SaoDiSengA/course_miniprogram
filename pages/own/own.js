// pages/parent_own/parent_own.js

// 获取APP的全局变量值
var app = getApp()
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_name: null,
        user_mobile_number: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            user_name: app.globalData.user_name,
            user_mobile_number: app.globalData.user_mobile_number
        })
    },

    // 点击跳转到个人信息页面
    check_user_info: function () {
        wx.navigateTo({
          url: '../own_info/own_info',
        })
    },

    // 用户退出账号
    exit_click: function () {
        wx.redirectTo({
          url: '../login/login',
        })
    }

})