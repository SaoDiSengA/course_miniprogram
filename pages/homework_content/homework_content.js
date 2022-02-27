// pages/homework_content/homework_content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        'courseName':'',
        'postTime':'',
        'imgs':'',
        'homeworkContent':'',
        'teacherName':'',
        hw_list:[],
        preimgs:[],
        imgs_a:[],
    },
    　　//图片点击事件

    previewImg: function (e) {
        //获取当前图片的下标
        var index = e.currentTarget.dataset.index;
        var src = e.currentTarget.dataset.src;
        console.log(src)
        var imgs_a = this.data.imgs_a;
        wx.previewImage({
        //当前显示图片
        current: imgs_a[index],
        //所有图片18800008821
        urls: imgs_a
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var id = options.id; //点进来的id
        console.log(id);  //当前id
        // var content = that.data.hw_list[id-1].content; 
        // console.log(content);
        wx.request({
            url: 'http://localhost:8080/homework/homework/'+options.id, //仅为示例，并非真实的接口地址
            method: 'get',
            data: {
            
            },
            header: {
            'content-type': 'application/json' // 默认值
            },
            success: function(res){
            console.log(res.data)
            // let a = res.data.imgs.split(",")
            for (let index = 0; index < res.data.imgs.length; index++) {
                // that.data.imgs.concat('http://localhost:8080'+res.data.imgs[index])
                that.setData({
                    imgs_a:that.data.imgs_a.concat('http://localhost:8080'+res.data.imgs[index])
                })
                console.log(that.data.imgs_a)
            }
            that.setData({
                hw_list:res.data,
                // imgs:a,
                imgs:res.data.imgs
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