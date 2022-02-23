// pages/login/login.js

// 获取APP的全局变量值
var app = getApp()
var util = require('../../utils/util.js')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        user_mobile_number: null,
        user_password: null,
        teacherId:'',
        teacherRole:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 注册用户页面跳转
    register_click: function () {
        wx.navigateTo({
          url: '../register/register',
        })
    },

    // 忘记密码页面跳转
    forget_click: function () {
        wx.navigateTo({
          url: '../find_password/find_password',
        })
    },

    // 获取用户输入的手机号
    mobile_info: function (event) {
        this.setData({
            user_mobile_number: event.detail.value
        })

    },

    // 获取用户输入的密码
    password_info: function (event) {
        this.setData({
            user_password: event.detail.value
        })
    },

    // 校验手机号是否合法
    judge_mobile_number: function (mobile_number) {
        let reg = /^1([0-9])\d{9}$/;
        // 必须是1开头，第二位数字可以是3|5|6|7|8|9任意一个，总长为11
        // let reg = /^1([3|5|6|7|8|9])\d{9}$/;
        if (reg.test(mobile_number)) {
            return true;
        }else {
            return false;
        }
    },

    // 登录
    login_click: function () {
        console.log(this.data.user_mobile_number)
        if (this.data.user_mobile_number == null || this.data.user_password == null || this.data.user_mobile_number==''||this.data.user_password=='') {
            wx.showModal({
                title: '',
                content: '您的输入不能为空！',
                showCancel: false,
                success(res) {}
            })
        }else {
            // 角色控制，0表示家长，1表示老师
            // app.globalData.user_rank = 0
            // app.globalData.user_mobile_number = this.data.user_mobile_number
            // wx.switchTab({
            //   url: '../index/index',
            // })
            var res = this.judge_mobile_number(this.data.user_mobile_number)
            if(res){
                // 向后台发送请求
                var that = this
                wx.request({
                  url: 'http://localhost:8080/parents/login',
                  method: "POST",
                  header: {
                    'content-type': "application/x-www-form-urlencoded",
                    'phone': this.data.user_mobile_number,
                    'password': this.data.user_password
                  },
                  success(res) {
                    console.log(res)
                    console.log(res.data.data.role)
                    console.log(res.data.data.id)
                    var status = res.data.code
                    var role = res.data.data.role
                    if (res.data.data.role=="teacher_manage"){
                      that.setData({
                        teacherRole:0
                      })
                    }
                    
                    if (res.data.data.role=="teacher_teache"){
                      that.setData({
                        teacherRole:1
                      })
                    }
                    that.setData({
                      teacherId:res.data.data.id
                    })
                    console.log(that.data.teacherRole)
                    console.log(that.data.teacherId)
                    var name = res.data.data.name
                    if (status == 400) {
                      wx.showModal({
                        title: '',
                        content: '账号或密码错误，请重新尝试!',
                        showCancel: false,
                        success(res) {
                        }
                      })
                    }else if(status == 401){
                      wx.showModal({
                        title: '',
                        content: '登录失败，未注册!',
                        showCancel: false,
                        success(res) {
                        }
                      })
                    }else if(status == 200){
                      // 根据角色区分，跳转到不同的页面
                      if(role == 'parents'){
                        app.globalData.user_rank = 0
                      }else{
                        app.globalData.user_rank = 1
                      }
                      // 将用户手机号传入全局变量
                      app.globalData.user_mobile_number = that.data.user_mobile_number
                      app.globalData.user_name = name
                      app.globalData.teacherId = that.data.teacherId
                      app.globalData.teacherRole = that.data.teacherRole
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }
                  }
                })
            }else{
                wx.showModal({
                    title: '',
                    content: '您输入的手机号不符合格式要求！',
                    showCancel: false,
                    success(res) {}
                })
            }
        }
    }
})