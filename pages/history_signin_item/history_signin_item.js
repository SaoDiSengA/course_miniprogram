// pages/shangkeqiandao/shangkeqiandao.js
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
    day:'',
    logList:[],
    courseList:[{
      'id':1,
      'courseName':'数学课',
      'courseTime':'周一、周二',
      'class':'二年级3班',
      'img':'/static/images/icon/icon/1.png'
    },{
      'id':2,
      'courseName':'英语课',
      'courseTime':'周一、周三',
      'class':'二年级2班',
      'img':'/static/images/icon/icon/1.png'
    },{
      'id':3,
      'courseName':'美术课',
      'courseTime':'周三、周五',
      'class':'三年级3班',
      'img':'/static/images/icon/icon/1.png'
    }
  ],
    // logList:[{
    //   'name':'王同学',
    //   'time':'2022.01.05',
    //   'sign':'已签到',
    //   'isChecked':'true'
    // },{
    //   'name':'李同学',
    //   'time':'2022.01.05',
    //   'sign':'已签到',
    //   'isChecked':'false'
    // },{
    //   'name':'张同学',
    //   'time':'2022.01.05',
    //   'sign':'已签到',
    //   'isChecked':'false'
    // },{
    //   'name':'张同学',
    //   'time':'2022.01.05',
    //   'sign':'已签到',
    //   'isChecked':'true'
    // },{
    //   'name':'张同学',
    //   'time':'2022.01.05',
    //   'sign':'已签到',
    //   'isChecked':'true'
    // },{
    //   'name':'张同学',
    //   'time':'2022.01.05',
    //   'sign':'已签到',
    //   'isChecked':'true'
    // }]
  },
  historySignin(){
    wx.navigateTo({
      url: '/pages/history_signin/history_signin?id='+this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.courseId,options.schoolId,options.classId,options.courseName,options.className,options.teacherName,options.teacherRole,options.teacherId,options.courseTime,options.startTime,options.endTime,options.switchDay);
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
      url: 'http://localhost:8080/fr_courseType/getSignDayList', //仅为示例，并非真实的接口地址
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
        switchDay:'',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          logList:res.data
        })
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