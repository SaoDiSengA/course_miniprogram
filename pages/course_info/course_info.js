// pages/course_info/course_info.js

// 获取APP的全局变量值
var app = getApp()
console.log(app.globalData)
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 前端测试页面用数据
        course_title: '音乐课程',
        course_teahcers: [
            {'role': '班主任', 'name': '小李老师'},
            {'role': '班主任', 'name': '小马老师'},
            {'role': '音乐老师', 'name': '小彭老师'}
        ],
        course_homeworks: [
            {'name': '音乐课程', 'origin': '小李老师', 'classes': '三年级二班', 'time': '2022.02.21', 'status': 0},
            {'name': '美术课程', 'origin': '小马老师', 'classes': '三年级三班', 'time': '2022.02.20', 'status': 1},
            {'name': '科学课程', 'origin': '小彭老师', 'classes': '三年级四班', 'time': '2022.02.19', 'status': 1},
        ],
        teahcer_font_color: 'black',
        homework_font_color: 'black',
        selected_teacher: 1,
        selected_homework: 0,

        // 前后端对接用数据
        // course_title: null,
        // course_teahcers: [],
        // course_homeworks: [],
        // teahcer_font_color: 'black',
        // homework_font_color: 'black',
        // selected_teacher: 1,
        // selected_homework: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var course_data = app.globalData.course_data
        var school_id = app.globalData.school_id
        var course_id = course_data.id
        var start_time = course_data.start_time
        var week = course_data.week
        that.setData({
            course_title: course_data.title
        })
        wx.request({
            url: 'https://epass.sibd.org.cn:8080/parents/ViewTeache',
            method: "POST",
            header: {
                'content-type': "application/x-www-form-urlencoded",
                'school_id': school_id,
                'course_id': course_id,
                'start_time': start_time,
                'week': week
            },
            success(res) {
                var course_teachers = res.data.data
                var new_course_teachers = that.handle_course_teachers_info(course_teachers)
                that.setData({
                    course_teahcers: new_course_teachers
                })
            }
        })
    },

    // 点击“班级老师”按钮
    check_teacher: function () {
      this.setData({
          teahcer_font_color: '#7a6fff',
          homework_font_color: 'black',
          selected_teacher: 1,
          selected_homework: 0
      })  
    },
    
    // 对老师信息进行更改
    handle_course_teachers_info: function (data) {
      var course_teachers = []
      for(var key in data){
          var teacher_name = data[key]
          var teacher = {}
          teacher['role'] = key
          teacher['name'] = teacher_name
          course_teachers.push(teacher)
      }
      return course_teachers
    },

    // 点击“班级作业”按钮
    check_homework: function () {
        this.setData({
            teahcer_font_color: 'black',
            homework_font_color: '#7a6fff',
            selected_teacher: 0,
            selected_homework: 1
        })
    },

    // 点击查看作业
    check_homework_content: function (event) {
        var course_name = event.currentTarget.id
        var course_homeworks = this.data.course_homeworks
        var new_course_homeworks = this.change_homework_status(course_homeworks, course_name)
        this.setData({
            course_homeworks: new_course_homeworks
        })
        wx.navigateTo({
          url: '../homework_content/homework_content',
        })
    },

    // 点击作业后，将作业状态变为已读状态
    change_homework_status: function (data, course_name) {
        for (let i = 0; i < data.length; i++) {
            if(data[i]['name'] == course_name){
                data[i]['status'] = 1
            }
        }
        return data;
    }
})