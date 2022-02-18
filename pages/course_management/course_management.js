// pages/lesson/zhuchi/zhuchi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      'teacherId':'',
      'teacherRole':'',
      'courseName':'',
      'className':'',
      'courseId':'',
      'schoolId':'',
      'classId':'',
      'teacherName':'',
      courseTime:'',
      startTime:'',
      endTime:'',
    },
    teacherSignIn(){
      wx.navigateTo({
        url: '/pages/teacher_signin/teacher_signin?courseId=' + this.data.courseId
        +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId+'&courseTime='+this.data.courseTime+'&startTime='+this.data.startTime+'&endTime='+this.data.endTime
      })
    },
    studentSignIn(){
      var that = this;
      if(that.data.teacherRole==1){
        wx.navigateTo({
          url: '/pages/student_signin/student_signin?courseId=' + this.data.courseId
          +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId
        })
      }
      if(that.data.teacherRole==0){
        wx.navigateTo({
          url: '/pages/student_signin_bzr/student_signin_bzr?courseId=' + this.data.courseId
          +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId
        })
      }
      
    },
    homework(){
      wx.navigateTo({
        url: '/pages/homework/homework?courseId=' + this.data.courseId
        +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      console.log(options.courseId,options.schoolId,options.classId,options.courseName,options.className,options.teacherName,options.teacherRole,options.teacherId,options.courseTime,options.startTime,options.endTime);
      that.setData({
        courseId:options.courseId,
        schoolId:options.schoolId,
        classId:options.classId,
        courseName:options.courseName,
        className:options.className,
        teacherName:options.teacherName,
        teacherRole:options.teacherRole,
        teacherId:options.teacherId,
        courseTime:options.courseTime,
        startTime:options.startTime,
        endTime:options.endTime,
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})