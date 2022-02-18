// pages/shangkeqiandao/shangkeqiandao.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    'courseName':'',
    'className':'',
    'courseId':'',
    'schoolId':'',
    'classId':'',
    'teacherName':'',
    courseTime:'',
    startTime:'',
    endTime:'',
    logList:[],
    // logList:[{
    //   'name':'王老师',
    //   'time':'2022/01/05',
    //   'signInStatus':'0'
    // },{
    //   'name':'王老师',
    //   'time':'2022/01/05',
    //   'signInStatus':'0'
    // },{
    //   'name':'王老师',
    //   'time':'2022/01/05',
    //   'signInStatus':'1'
    // },{
    //   'name':'王老师',
    //   'time':'2022/01/05',
    //   'signInStatus':'0'
    // },{
    //   'name':'王老师',
    //   'time':'2022/01/05',
    //   'signInStatus':'1'
    // },{
    //   'name':'王老师',
    //   'time':'2022/01/05',
    //   'signInStatus':'1'
    // }]
  },

  tijiao(){
    var time = dateTimePicker.formatTime(new Date());
    if(this.data.date==time){
      wx.showToast({
        title: '您今天已经签到过了',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }else{
      const that=this; 
      wx.request({
        url: 'http://localhost:8080/fr_courseType/updateTeacherSignRecord', //仅为示例，并非真实的接口地址
        method: 'get',
        data: {
          teacherId:that.data.teacherId,
          teacherRole:that.data.teacherRole,
          courseId:that.data.courseId,
          schoolId:that.data.schoolId,
          classId:that.data.classId,
          teacherName:that.data.teacherName,
          courseTime:that.data.courseTime,
          startTime:that.data.startTime,
          endTime:that.data.endTime,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res){
          console.log(res.data)
          wx.showToast({
            title: '签到成功',
            icon:'success',
            duration: 2000//持续的时间
          })
          that.setData({
            ['logList['+(that.data.logList.length-1)+'].signInStatus']:'已签到',
          })
          // that.data.logList.unshift({
          //   'teacherName':that.data.teacherName,
          //   'day':res.data.list.day,
          //   'signInStatus':'已签到'
          // })
        }
      })
      this.setData({
        // logList:this.data.logList,
        date:time
    })
    }
    
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
    wx.request({
      url: 'http://localhost:8080/fr_courseType/getTeacherSignRecords', //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        teacherId:that.data.teacherId,
        teacherRole:that.data.teacherRole,
        courseId:that.data.courseId,
        schoolId:that.data.schoolId,
        classId:that.data.classId,
        teacherName:that.data.teacherName,
        courseTime:that.data.courseTime,
        startTime:that.data.startTime,
        endTime:that.data.endTime,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          logList:res.data.reverse(),
        })
        for (let index = 0; index < that.data.logList.length; index++) {
          if(that.data.logList[index].signInStatus==1){
            that.setData({
              ['logList['+index+'].signInStatus']:'已签到',
            })
          }
          if(that.data.logList[index].signInStatus==0){
            that.setData({
              ['logList['+index+'].signInStatus']:'未签到',
            })
            console.log(that.data.logList[index].signInStatus)
          }
        }
      }
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