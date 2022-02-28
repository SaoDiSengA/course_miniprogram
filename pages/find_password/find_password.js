// pages/findpassword/findpwd.js

// 获取APP的全局变量值
var app = getApp()
console.log(app.globalData)
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "tjbtn":true,
    "txtcolor1":"rgb(104,144,247)",
    "txtcolor2":"black",
    "confirmpw":false,
    step1:true,
    step2:false,
    mobile_number: null,
    verify_code: null,
    // 手机验证码倒计时
    countTime: 60,
    // 用户输入的新密码
    password: null,
    // 用户再次确认的新密码
    again_password: null
  },

  // 获取用户输入的手机号码
  input_mobile_number: function (event) {
    var mobile_number = event.detail.value
    this.setData({
      mobile_number: mobile_number
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

  // 验证码倒计时
  countDown: function () {
    var _this = this
    var countTime = _this.data.countTime // 获取倒计时初始值
    var timer = setInterval(function () {
        countTime -= 1
      _this.setData({
        countTime: countTime
      })
      if (countTime <= -1) {
        clearInterval(timer)
        // 取消置顶的setInterval函数将要执行的代码
        _this.setData({
            countTime: 60
        })
      }
    }, 1000)
  },

  // 获取用户输入的验证码
  input_verify_code: function (event) {
    var verify_code = event.detail.value
    this.setData({
      verify_code: verify_code
    })
  },

  // 用户发起发送验证码请求
  getVerificationCode: function () {
    var that = this
    var mobile_number = that.data.mobile_number
    var res = that.judge_mobile_number(mobile_number)
    if(res){
      wx.request({
        url: 'https://epass.sibd.org.cn:8080/user/sendSms',
        method: 'POST',
        header: {
          'content-type': "application/x-www-form-urlencoded",
          'phone': mobile_number
        },
        success(res){
          that.countDown()
        }
      })
    }else{
      wx.showModal({
        title: '提示信息',
        content: '您输入的手机号不符合格式要求！',
        showCancel: false,
        success(res) {}
       })
    }
  },

  // 用户发起找回密码的请求
  submit: function () {
    var that = this
    var mobile_number = that.data.mobile_number
    // 将用户手机号码传入全局变量
    app.globalData.user_mobile_number = mobile_number
    var verify_code = that.data.verify_code
    console.log(verify_code)
    wx.request({
      url: 'https://epass.sibd.org.cn:8080/user/checkSms',
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded",
        'phone': mobile_number,
        'verifyCode': verify_code
      },
      success(res){
        console.log(res)
        var status = res.data.code
        var message = res.data.message
        if(status == 200){
          that.setData({
            confirmpw:true,
            tjbtn:false,
            txtcolor1:"black",
            txtcolor2:"rgb(104,144,247)",
            step1:false,
            step2:true,
          });
        }else if(status == 400){
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false,
            success(res) {}
          })
        }
      }
    })
  },

  // 获取用户输入的新密码
  input_password: function (event) {
    var password = event.detail.value
    this.setData({
      password: password
    })
  },

  // 获取用户确认的新密码
  again_input_password: function (event) {
    var again_password = event.detail.value
    this.setData({
      again_password: again_password
    })
  },

  // 用户发起修改密码的请求
  check: function () {
    var that = this
    var mobile_number = that.data.mobile_number
    var password = that.data.password
    var again_password = that.data.again_password
    if(password == again_password){
      wx.request({
        url: 'https://epass.sibd.org.cn:8080/parents/forget',
        method: 'POST',
        header: {
          'content-type': "application/x-www-form-urlencoded",
          'phone': mobile_number,
          'password': password
        },
        success(res){
          wx.showModal({
            cancelColor: '提示信息',
            content: '修改密码成功！',
            showCancel: false,
            success(res){
              wx.redirectTo({
                url: '../login/login',
              })
            }
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致！',
        showCancel: false,
        success(res) {}
      })
    }
  }
})