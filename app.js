// app.js
App({
  onLaunch() {
    // 云开发环境初始化
    wx.cloud.init({
      env: 'y-test-2greqdv891ed8e1c'
    })
  },
  globalData: {
    id_number: null,
    grade_id: null,
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
