// pages/findpassword/findpwd.js
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
    verify_code: null
  },

  // 获取用户输入的手机号码
  input_mobile_number: function (event) {
    var mobile_number = event.detail.value
    this.setData({
      mobile_number: mobile_number
    })
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
    wx.request({
      url: 'https://epass.sibd.org.cn:8080/user/sendSms',
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded",
        'phone': mobile_number
      },
      success(res){
      }
    })
  },

  // 用户发起找回密码的请求
  submit: function () {
    var that = this
    var mobile_number = that.data.mobile_number
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
  }
})