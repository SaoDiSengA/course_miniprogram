// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
  	student_id: null,
  	school_id: null,
    course_data: null,
    user_mobile_number: null,
    user_name: null,
    user_rank: null,
    userInfo: null,
    teacherId:'',
    teacherRole:''
  }
})
