// pages/history_signin/history_signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'id':'',
    'courseTime':'',
    'courseName':'',
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
      'id':6,
      'time':'2022/01/10',
    },{
      'id':5,
      'time':'2022/01/09',
    },{
      'id':4,
      'time':'2022/01/08',
    },{
      'id':3,
      'time':'2022/01/07',
    },{
      'id':2,
      'time':'2022/01/06',
    },{
      'id':1,
      'time':'2022/01/05',
    }]
  },
  history_signin_item(event){
    wx.navigateTo({
      url: '/pages/history_signin_item/history_signin_item?id='+this.data.id+'&sign_id='+event.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    console.log(id);
    that.setData({
      courseTime:that.data.courseList[(id-1)].courseTime,
      courseName:that.data.courseList[(id-1)].courseName,
      id:id
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