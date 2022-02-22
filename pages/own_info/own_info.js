// pages/own_info/own_info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 前端测试页面用数据
        user_name: '张三',
        school_name: '小店区第二小学',
        grade: '三年级',
        id_number: '612728200011033561',
        mobile_number: '15319595933'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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