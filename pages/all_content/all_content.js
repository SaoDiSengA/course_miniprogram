// pages/all_content/all_content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        all_data: [
            {'name': '课程1', 'grade': '二年级', 'type': '音乐'},
            {'name': '课程2', 'grade': '三年级', 'type': '体育'},
            {'name': '课程3', 'grade': '四年级', 'type': '科学'}
        ],
    },

    // 点击报名函数进行跳转
    apply_click: function () {
        wx.navigateTo({
          url: '../classes_content/classes_content',
        })
    }
})