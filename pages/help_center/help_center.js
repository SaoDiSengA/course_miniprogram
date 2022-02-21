// pages/help_center/help_center.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        all_quesition: [
            {'quesition_id': '一', 'quesition_content': '问题一的标题'},
            {'quesition_id': '二', 'quesition_content': '问题二的标题'},
            {'quesition_id': '三', 'quesition_content': '问题三的标题'},
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 查看问题详情
    check_quesition: function () {
        wx.navigateTo({
          url: '../quesition_content/quesition_content',
        })
    }
    
})