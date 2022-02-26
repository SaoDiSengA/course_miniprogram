// pages/my_classes/my_classes.js

// 获取APP的变量
var app = getApp()
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 前端测试页面用数据
        // my_apply_classes: [
        //     {'name': '音乐课程', 'grade': '二年级', 'type': '音乐'},
        //     {'name': '体育课程', 'grade': '三年级', 'type': '体育'},
        //     {'name': '美术课程', 'grade': '四年级', 'type': '美术'},
        //     {'name': '科学课程', 'grade': '五年级', 'type': '科学'},
        //     {'name': '舞蹈课程', 'grade': '六年级', 'type': '舞蹈'}
        // ],
        
        // 前端测试接口用数据
        my_apply_classes: []
    },

    /**
     * 生命周期函数--监听页面加载
     * 用户查询已报名的课程
     */
    onLoad: function (options) {
        var that = this
        wx.request({
            url: 'https://epass.sibd.org.cn:8080/parents/signUp',
            method: 'POST',
            header: {
                'content-type': "application/x-www-form-urlencoded",
                'student_id': app.globalData.student_id
            },
            success(res) {
            	// 获取返回的已报名课程数据
            	var my_apply_classes = res.data.data
                // 修改课程类型，将它转变为字符串形式
                that.change_course_type_to_string(my_apply_classes)
                // 将数据传入到data域中
                that.setData({
                    my_apply_classes: my_apply_classes
                })
            }
        })
    },

    // 修改课程分类,将它由数字变为字符串
    change_course_type_to_string: function (data) {
        for (let i = 0; i < data.length; i++) {
            if(data[i].type_course_id == '4'){
                data[i].type = '科学'
            }else if(data[i].type_course_id == '2'){
                data[i].type = '美术'
            }else if(data[i].type_course_id == '3'){
                data[i].type = '趣味'
            }else if(data[i].type_course_id == '6'){
                data[i].type = '编程'
            }else if(data[i].type_course_id == '7'){
                data[i].type = '手工'
            }
        }
    },

    // 用户进入课程详情页面
    join_click: function () {
        wx.navigateTo({
          url: '../course_info/course_info',
        })
    }
})