// pages/system_notion/system_notion.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        all_notions: [
            {'id': '一', 'title': '消息一标题'},
            {'id': '二', 'title': '消息二标题'},
            {'id': '三', 'title': '消息三标题'},
            {'id': '四', 'title': '消息四标题'},
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 点击消息，查看消息详情
    check_message: function () {
        wx.navigateTo({
          url: '../message_content/message_content',
        })
    }
})