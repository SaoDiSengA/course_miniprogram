// pages/order_success/order_success.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 点击查看订单按钮，进入我的课程页面
    check_click: function () {
        wx.navigateTo({
          url: '../my_classes/my_classes',
        })
    }
})