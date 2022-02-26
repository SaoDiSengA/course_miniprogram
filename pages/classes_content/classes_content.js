// pages/classes_content/classes_content.js

// 获取APP的全局变量值
var app = getApp()
console.log(app.globalData)
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      course_data: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var course_data = app.globalData.course_data
      var course_time = this.change_num_to_string(course_data['week'])
      var start_time = this.calculate_one_day_time(course_data['start_time'])
      var end_time = this.calculate_one_day_time(course_data['end_time'])
      course_data['class_time'] = course_time
      course_data['new_start_time'] = start_time
      course_data['new_end_time'] = end_time
      this.setData({
        course_data: course_data
      })
    },

    // 计算开始时间
    calculate_one_day_time: function(data){
      var times = data.split(':')
      var hour = times[0]
      var minute = times[1]
      var time = hour + ':' + minute
      return time
    },

    // 建立数字-星期的映射关系
    change_num_to_string: function(data){
      var nums = data.split(',')
      var strings = []
      for(let index = 0; index < nums.length; index++){
        var num = nums[index]
        if (num == '1') {
          strings.push('星期一')
        }else if(num == '2'){
          strings.push('星期二')
        }else if(num == '3'){
          strings.push('星期三')
        }else if(num == '4'){
          strings.push('星期四')
        }else if(num == '5'){
          strings.push('星期五')
        }else if(num == '6'){
          strings.push('星期六')
        }else if(num == '7'){
          strings.push('星期日')
        }
      }
      var course_time = strings.join('、')
      return course_time
    },

    // 点击报名按钮，跳转到支付页面
    apply_click: function () {
        wx.navigateTo({
          url: '../confirm_order/confirm_order',
        })
    }
})