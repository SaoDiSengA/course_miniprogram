// pages/confirm_order/confirm_order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    
    pay_click: function () {
        wx.navigateTo({
          url: '../order_success/order_success',
        })
    }
})