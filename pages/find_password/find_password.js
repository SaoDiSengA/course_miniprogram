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
  },
  tijiao(e){
    this.setData({
      confirmpw:true,
      tjbtn:false,
      txtcolor1:"black",
      txtcolor2:"rgb(104,144,247)",
      step1:false,
      step2:true,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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