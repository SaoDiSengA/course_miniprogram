// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 头像地址
        head_image: null,
        // 控制下拉列表的显示隐藏，false隐藏、true显示
        school_shows: false,
        // 学校的id信息
        school_ids: null,
        // 学校下拉列表的数据
        school_data: ['阳泉市平定县实验小学', '阳泉市平定县第二实验小学校', '阳泉市平定县东关小学校'],
        // 选择的下拉列表下标
        school_index: 0,
        // 控制下拉列表的显示隐藏，false隐藏、true显示
        grade_shows: false,
        // 年级下拉列表的数据
        grades: ['三年级', '四年级', '五年级'],
        // 年级的ID数据
        grade_ids: [3, 4, 5],
        // 选择的年级下拉列表下标
        grade_index: 0,
        // 学校的id信息
        school_id: null,
        // 年级信息
        grade: null,
        // 学籍号
        id_number: null,
        // 真实姓名
        name: null,
        // 同意用户协议
        confirm_aggrement: false,
        // 手机号码
        mobile_number: null,
        // 验证码
        check_number: null,
        // 密码
        password: null,
        // 再次确认密码
        again_password: null,
        // 手机验证码倒计时
        countTime: 60
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取学校名称和id
        var that = this
        wx.request({
          url: 'http://localhost:8080/parents/getSchoolName',
          method: 'POST',
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success(res){
            var school_infos = res.data.data
            that.handle_school_info(school_infos)
          }
        })
    },

    // 处理返回的学校信息
    handle_school_info: function (data) {
        var that = this
        var school_ids = []
        var school_names = []
        for (let index = 0; index < data.length; index++) {
            school_ids.push(data[index]['id'])
            school_names.push(data[index]['name'])
        }
        that.setData({
            school_ids: school_ids,
            school_data: school_names
        })
        console.log(that.data.school_ids)
        console.log(that.data.school_data)
    },

    // 上传用户头像
    change_head_image: function () {
        wx.chooseImage({
            // 上传的图像数量
            count: 1,
            // 可以指定是原图还是压缩图，默认二者都有
            sizeType: ['original', 'compressed'],
            // 可以指定来源是相册还是相机，默认二者都有
            sourceType: ['album', 'camera'],
            success: function(res) {
                console.log(res.tempFiles); // 图片的本地文件列表，每一项是一个file对象
                console.log(res.tempFilePaths); // 图片的本地文件路径列表
                var tempFilePath = res.tempFilePaths[0];
                wx.uploadFile({ 
                    url: 'https://pengkai.online/course_management_head_image/',
                    // 头像名称
                    filePath: tempFilePath,
                    name: '123'
                })
              }
        })
    },

    // 获取输入信息的各个函数

    // 点击下拉显示框-学校
    school_selectTaps() {
        this.setData({
            school_shows: !this.data.school_shows,
        });
    },

    // 点击学校的下拉列表
    school_optionTaps(e) {
        let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
        var school_ids = this.data.school_ids
        var id = Indexs
        console.log(Indexs)
        this.setData({
            school_index: Indexs,
            school_shows: !this.data.school_shows,
            school_id: school_ids[id]
        });
    },

    // 点击下拉显示框-年级
    grade_selectTaps() {
        this.setData({
            grade_shows: !this.data.grade_shows,
        });
    },

    // 点击年级的下拉列表
    grade_optionTaps(e) {
        var that = this
        var grade_ids = this.data.grade_ids
        let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
        console.log(Indexs)
        that.setData({
            grade_index: Indexs,
            grade_shows: !this.data.grade_shows,
            grade: grade_ids[Indexs]
        });
        console.log(that.data.grade)
    },

    // 学籍信息
    status_input: function (event) {
        this.setData({
            id_number: event.detail.value
        })
    },

    // 姓名信息
    name_input: function (event) {
        this.setData({
            name: event.detail.value
        })
    },

    // 手机号码信息
    mobile_number_input: function (event) {
        this.setData({
            mobile_number: event.detail.value
        })
    },

    // 验证码信息
    check_number_input: function (event) {
        this.setData({
            check_number: event.detail.value
        })
    },

    // 登录密码信息
    password_input: function (event) {
        this.setData({
            password: event.detail.value
        })
    },

    // 确认登录密码信息
    password_again_input: function (event) {
        this.setData({
            again_password: event.detail.value
        })
    },

    // 校验手机号是否合法
    judge_mobile_number: function (mobile_number) {
        let reg = /^1([0-9])\d{9}$/;
        // 必须是1开头，第二位数字可以是3|5|6|7|8|9任意一个，总长为11
        // let reg = /^1([3|5|6|7|8|9])\d{9}$/;
        if (reg.test(mobile_number)) {
            return true;
        }else {
            return false;
        }
    },

    // 验证码倒计时
    countDown: function () {
        var _this = this
        var countTime = _this.data.countTime // 获取倒计时初始值
        var timer = setInterval(function () {
            countTime -= 1
          _this.setData({
            countTime: countTime
          })
          if (countTime <= -1) {
            clearInterval(timer)
            // 取消置顶的setInterval函数将要执行的代码
            _this.setData({
                countTime: 60
            })
          }
        }, 1000)
      },

    // 发送验证码
    send_check_number: function () {
        console.log(this.data.mobile_number);
        var res = this.judge_mobile_number(this.data.mobile_number);
        var that = this;
        if(res){
            // 发起请求
            wx.request({
                url: 'http://localhost:8080/user/sendSms',
                method: "POST",
                header: {
                    'content-type': "application/x-www-form-urlencoded",
                    'phone': this.data.mobile_number,
                },
                success(res) {
                    that.countDown()
                }
            })
        }else{
            wx.showModal({
                title: '',
                content: '您输入的手机号不符合格式要求！',
                showCancel: false,
                success(res) {}
            })
        }
    },

    // 点击同意用户协议按钮
    confirm_aggrement: function (event) {
        this.setData({
            confirm_aggrement: true
        })
    },

    // 用户协议跳转
    user_aggrement_content: function () {
        wx.navigateTo({
          url: '../user_aggrement/user_aggrement',
        })
    },

    // 注册页面跳转
    register_click: function () {
    	console.log('注册页面')
        console.log(this.data.school_id)
        console.log(this.data.grade)
        console.log(this.data.id_number)
        console.log(this.data.name)
        console.log(this.data.mobile_number)
        console.log(this.data.check_number)
        console.log(this.data.password)
        console.log(this.data.again_password)
        if (this.data.id_number == '' || this.data.id_number == null ||
            this.data.name == '' || this.data.name == null ||
            this.data.mobile_number == '' || this.data.mobile_number == null ||
            this.data.check_number == '' || this.data.check_number == null ||
            this.data.password == '' || this.data.password == null ||
            this.data.again_password == '' || this.data.again_password == null) {
                wx.showModal({
                    title: '',
                    content: '您的输入不能为空！',
                    showCancel: false,
                    success(res) {}
                })
        }else{
            if (this.data.password != this.data.again_password) {
                wx.showModal({
                    title: '',
                    content: '您两次输入的密码不一致！',
                    showCancel: false,
                    success(res) {}
                })
            }else{
                if (!this.data.confirm_aggrement) {
                    wx.showModal({
                        title: '',
                        content: '您尚未同意用户协议！',
                        showCancel: false,
                        success(res) {}
                    })
                }else{
                    wx.request({
                      url: 'http://localhost:8080/parents/register',
                      method: "POST",
                      header: {
                        'content-type': "application/x-www-form-urlencoded",
                        'school_id': this.data.school_id,
                        'grade': this.data.grade,
                        'account': this.data.id_number,
                        'name': this.data.name,
                        'phone': this.data.mobile_number,
                        'varifyCode': this.data.check_number,
                        'password': this.data.password,
                        'role': 'parents',
                        },
                        success(res) {
                            var status = res.data.code
                            var message = res.data.message
                            if(status == 200){
                                wx.switchTab({
                                  url: '../index/index',
                                })
                            }else if(status == 400){
                                wx.showModal({
                                    title: '提示信息',
                                    content: message,
                                    showCancel: false,
                                    success(res) {}
                                })
                            }
                        }
                    })
                }
            }
        }
    },

    // 登录页面跳转
    login_click: function (event) {
        wx.navigateTo({
          url: '../login/login',
        })
    }
})