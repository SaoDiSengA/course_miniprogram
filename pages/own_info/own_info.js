// pages/own_info/own_info.js

// 获取APP的全局变量值
var app = getApp()
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 前端测试页面用数据
        user_name: null,
        school_data: {
            '1': '学校',
            '2': '霍格沃茨废法学院撒地方',
            '3': '思过崖大学',
            '4': '清华',
            '5': '阳泉市平定县实验小学',
            '11': '阳泉市平定县第二实验小学校',
            '12': '阳泉市平定县东关小学校',
            '13': '阳泉市平定县西关小学校',
            '14': '阳泉市平定县第三实验小学校',
            '15': '阳泉师范高等专科学校附属小学'
        },
        grades: {
            3: '三年级',
            4: '四年级',
            5: '五年级'
        },
        id_number: null,
        mobile_number: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var school_names = this.data.school_data
        var grades = this.data.grades
        console.log(app.globalData.grade_id)
        this.setData({
            user_name: app.globalData.user_name,
            school_name: school_names[app.globalData.school_id],
            grade: grades[app.globalData.grade_id],
            id_number: app.globalData.id_number,
            mobile_number: app.globalData.user_mobile_number
        })
    },

    // 用户更改学籍号
    input_id_number: function (event) {
        var id_number = event.detail.value
        this.setData({
            id_number: id_number
        })
    },

    // 用户更改姓名
    input_user_name: function (event) {
        var user_name = event.detail.value
        this.setData({
            user_name: user_name
        })
    },

    // 用户更改手机号
    input_mobile_number: function (event) {
        var mobile_number = event.detail.value
        this.setData({
            mobile_number: mobile_number
        })
    },

    // 用户提交更改
    submit_click: function () {
        wx.showModal({
          title: '提示',
          content: '您的信息已修改成功',
          showCancel: false
        })
    }
})