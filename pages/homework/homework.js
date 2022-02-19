// pages/homework/hw_math.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'id':'',
    // 'courseName':'',
    // 'courseTime':'',
    'content':'',
    'teacherRole':'',
    'courseName':'',
    'className':'',
    'courseId':'',
    'schoolId':'',
    'classId':'',
    'teacherName':'',
    homeworkList:[],
    // homeworkList:[{
    //   'id':1,
    //   'name':'王老师',
    //   'time':'2022/01/05',
    // },{
    //   'id':2,
    //   'name':'王老师',
    //   'time':'2022/01/05',
    // },{
    //   'id':3,
    //   'name':'王老师',
    //   'time':'2022/01/05',
    // },{
    //   'id':4,
    //   'name':'王老师',
    //   'time':'2022/01/05',
    // },{
    //   'id':5,
    //   'name':'王老师',
    //   'time':'2022/01/05',
    // },{
    //   'id':6,
    //   'name':'王老师',
    //   'time':'2022/01/05',
    // }]

  },
  loaddata(){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/homework/homework', //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        courseId:that.data.courseId,
        classId:that.data.classId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          homeworkList:res.data.reverse(),
        })
      }
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
    that.loaddata()
    
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

    // this.data.homeworkList.unshift({
    //   'name':'王老师',
    //   'time':'2022.01.10'
    // })
    // this.setData({
    //   homeworkList:this.data.homeworkList
    // })
    // console.log(this.data.content)
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

  },
  hw(event){
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/homework_content/homework_content?id='+event.currentTarget.id+'&hw_content='+this.data.content
    })
  },
  new_hw(e){
    wx.navigateTo({
      url: '/pages/homework_new/homework_new?courseId=' + this.data.courseId
      +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId+'&courseTime='+this.data.courseTime+'&startTime='+this.data.startTime+'&endTime='+this.data.endTime

    })
  }
})