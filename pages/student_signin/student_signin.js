// pages/shangkeqiandao/shangkeqiandao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'id':'',
    teacherRole:'',
    teacherName:'',
    courseName:'',
    className:'',
    courseId:'',
    schoolId:'',
    classId:'',
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
    logList:[{
      'name':'王同学',
      'time':'2022.01.05',
      'sign':'已签到',
      'isChecked':'true'
    },{
      'name':'李同学',
      'time':'2022.01.05',
      'sign':'已签到',
      'isChecked':'false'
    },{
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'已签到',
      'isChecked':'false'
    },{
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'已签到',
      'isChecked':'true'
    },{
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'已签到',
      'isChecked':'true'
    },{
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'已签到',
      'isChecked':'true'
    }]
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
  //签到图标显示
    var that = this;
    var courseId = options.courseId;
    var schoolId = options.schoolId;
    var classId = options.classId;
    var courseName = options.courseName;
    var className = options.className;
    console.log(courseId,schoolId,classId,courseName,className,options.teacherName,options.teacherRole);
    that.setData({
      courseId:courseId,
      schoolId:schoolId,
      classId:classId,
      courseName:courseName,
      className:className,
      teacherName:options.teacherName,
      teacherRole:options.teacherRole
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