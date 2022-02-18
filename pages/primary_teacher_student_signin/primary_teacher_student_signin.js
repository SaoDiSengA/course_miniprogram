// pages/shangkeqiandao/shangkeqiandao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'sign':"点&nbsp;&nbsp;&nbsp;名",
    'name':'xx课',
    'time':'周三、周五',
    logList:[{
      'id':1,
      'name':'王同学',
      'time':'2022.01.05',
      'sign':'点&nbsp;&nbsp;&nbsp;名',
      'color':'rgb(116,126,247)',
      'isChecked':'false'
    },{
      'id':2,
      'name':'李同学',
      'time':'2022.01.05',
      'sign':'点&nbsp;&nbsp;&nbsp;名',
      'color':'rgb(116,126,247)',
      'isChecked':'false'
    },{
      'id':3,
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'点&nbsp;&nbsp;&nbsp;名',
      'color':'rgb(116,126,247)',
      'isChecked':'false'
    },{
      'id':4,
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'点&nbsp;&nbsp;&nbsp;名',
      'color':'rgb(116,126,247)',
      'isChecked':'false'
    },{
      'id':5,
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'点&nbsp;&nbsp;&nbsp;名',
      'color':'rgb(116,126,247)',
      'isChecked':'false'
    },{
      'id':6,
      'name':'张同学',
      'time':'2022.01.05',
      'sign':'点&nbsp;&nbsp;&nbsp;名',
      'color':'rgb(116,126,247)',
      'isChecked':'false'
    }]
  },
  check(e){
    console.log(e.currentTarget.id);
    var i = e.currentTarget.id;
    this.setData({
      ["logList["+(i-1)+"].isChecked"]:true,
      ["logList["+(i-1)+"].sign"]:"已&nbsp;&nbsp;&nbsp;点",
      ["logList["+(i-1)+"].color"]:"rgb(190,190,190)",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //签到图标显示
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