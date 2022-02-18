// pages/classes_content/classes_content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 点击报名按钮，跳转到支付页面
    apply_click: function () {
        wx.navigateTo({
          url: '../confirm_order/confirm_order',
        })
    }
})