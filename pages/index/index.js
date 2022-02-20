// pages/index/index.js

// 获取APP的全局变量值
var app = getApp()
console.log(app.globalData)
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_rank: null,
        tabbar: ["全部", "音乐", "体育", "科学", "美术", "主持", "舞蹈"],
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
    
        // 前端开发测试数据-家长端
        // all_data: [
        //   {'name': '课程1', 'grade': '二年级', 'type': '音乐'},
        //   {'name': '课程2', 'grade': '三年级', 'type': '体育'},
        //   {'name': '课程3', 'grade': '四年级', 'type': '科学'},
        //   {'name': '课程4', 'grade': '四年级', 'type': '科学'},
        //   {'name': '课程5', 'grade': '四年级', 'type': '科学'},
        //   {'name': '课程6', 'grade': '四年级', 'type': '科学'},
        // ],
        // music_data: [
        //   {'name': '音乐课程1', 'grade': '二年级', 'type': '音乐'},
        //   {'name': '音乐课程2', 'grade': '三年级', 'type': '音乐'},
        //   {'name': '音乐课程3', 'grade': '四年级', 'type': '音乐'}
        // ],
        // sport_data: [
        //   {'name': '体育课程1', 'grade': '二年级', 'type': '体育'},
        //   {'name': '体育课程2', 'grade': '三年级', 'type': '体育'},
        //   {'name': '体育课程3', 'grade': '四年级', 'type': '体育'}
        // ],
        // science_data: [
        //   {'name': '科学课程1', 'grade': '二年级', 'type': '科学'},
        //   {'name': '科学课程2', 'grade': '三年级', 'type': '科学'},
        //   {'name': '科学课程3', 'grade': '四年级', 'type': '科学'}
        // ],
        // art_data: [
        //   {'name': '美术课程1', 'grade': '二年级', 'type': '美术'},
        //   {'name': '美术课程2', 'grade': '三年级', 'type': '美术'},
        //   {'name': '美术课程3', 'grade': '四年级', 'type': '美术'}
        // ],
        // direct_data: [
        //   {'name': '主持课程1', 'grade': '二年级', 'type': '主持'},
        //   {'name': '主持课程2', 'grade': '三年级', 'type': '主持'},
        //   {'name': '主持课程3', 'grade': '四年级', 'type': '主持'}
        // ],
        // dance_data: [
        //   {'name': '舞蹈课程1', 'grade': '二年级', 'type': '舞蹈'},
        //   {'name': '舞蹈课程2', 'grade': '三年级', 'type': '舞蹈'},
        //   {'name': '舞蹈课程3', 'grade': '四年级', 'type': '舞蹈'}
        // ],
        
        // 后端对接初始化数据-家长端
        all_data: [],
        music_data: [],
        sport_data: [],
        science_data: [],
        art_data: [],
        direct_data: [],
        dance_data: [],

        // 前端开发测试数据-老师端
        teacherId:2,
        teacherRole:1,
        teacherName:'',
        courseName:'',
        className:'',
        courseId:'',
        schoolId:'',
        classId:'',
        courseTime:'',
        startTime:'',
        endTime:'',
        courseList:[
            // {
            //     // 'id':3,
            //     // 'courseName':'数学课',
            //     // 'courseTime':'周一、周二',
            //     // 'className':'小班',
            //     // 'img':'https://pengkai.online/courese_management/classes.png',
            //     // courseId:'2',
            //     // schoolId:'2',
            //     // classId:'2',
            //     // 'teacherName':'王老师',
            //     // courseTime:'周一',
            //     // startTime:'7:00:00',
            //     // endTime:'8:00:00',
            // }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 将需要显示的页面的角色信息传入
      this.setData({
        user_rank: app.globalData.user_rank
      })

      console.log(this.data.user_rank)

      // 老师端进行跳转
      if(this.data.user_rank == 1){
        var that = this
      	wx.request({
	        url: 'http://localhost:8080/fr_courseType/getTeachCourses', //仅为示例，并非真实的接口地址
	        method: 'get',
	        data: {
	          teacherId:that.data.teacherId,
	          teacherRole:that.data.teacherRole
	        },
	        header: {
	          'content-type': 'application/json' // 默认值
	        },
	        success: function(res){
	          console.log(res.data)
	          that.setData({
	            courseList:res.data,
	          })
	        }
	    })
      }

      // 家长端进行跳转
      if (this.data.user_rank == 0) {
      	//  高度自适应
        wx.getSystemInfo({
	        success: function (res) {
	        	//顶部脱离文档流了(- res.windowWidth / 750 * 100);
	            let calc = res.windowHeight; 
	            that.setData({
	            	winHeight: calc
	            });
	        }
        });

        // 获取数据
        // 获取数据
        wx.request({
	        url: 'http://localhost:8080/parents/homePage',
	        method: "POST",
	        header: {
	            'content-type': "application/x-www-form-urlencoded",
	        },
	        success(res) {
	            console.log(res)
	            // 获取返回状态码
	            var status = res.data.code
	            // 获取返回的全部课程数据
	            var all_data = res.data.data['0']
	            // 获取返回的音乐课程数据
	            var music_data = res.data.data["1"]
	            // 获取返回的体育课程数据
	            var sport_data = res.data.data["2"]
	            // 获取返回的科学课程数据
	            var science_data = res.data.data["3"]
	            // 获取返回的美术课程数据
	            var art_data = res.data.data["4"]
	            // 获取返回的主持课程数据
	            var direct_data = res.data.data["5"]
	            // 获取返回的舞蹈课程数据
	            var dance_data = res.data.data["6"]
	            if(status == 200){
	              // 修改课程类型
	              that.change_course_type_to_string(all_data)
	              that.change_course_type_to_string(music_data)
	              that.change_course_type_to_string(sport_data)
	              that.change_course_type_to_string(science_data)
	              that.change_course_type_to_string(art_data)
	              that.change_course_type_to_string(direct_data)
	              that.change_course_type_to_string(dance_data)
	              // 传递数据
	              that.setData({
	                  'all_data': all_data,
	                  "music_data": music_data,
	                  "sport_data": sport_data,
	                  "science_data": science_data,
	                  "art_data": art_data,
	                  "direct_data": direct_data,
	                  "dance_data": dance_data
	              })
	            }
        	}
        })
      }
    },


    // 家长端逻辑

   // 修改课程分类,将它由数字变为字符串
  change_course_type_to_string: function (data) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].type_course_id == '1'){
        data[i].type = '机器人'
      }else if(data[i].type_course_id == '2'){
        data[i].type = '美术'
      }else if(data[i].type_course_id == '3'){
        data[i].type = '趣味'
      }else if(data[i].type_course_id == '6'){
        data[i].type = '编程'
      }else if(data[i].type_course_id == '7'){
        data[i].type = '手工'
      }
    }
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    let that = this;
    // console.log("滚动切换标签",e)
    that.setData({
      currentTab: e.detail.current
    });
    that.checkCor();
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    let that = this;
    if (that.data.currentTab > 3) {
      that.setData({
        scrollLeft: 300
      })
    } else {
      that.setData({
        scrollLeft: 0
      })
    }
  },

  // 点击报名函数进行跳转
  apply_click: function (event) {
    var course_name = event.currentTarget.id
    wx.request({
      url: 'http://localhost:8080/parents/queryCourse',
      method: 'GET',
      header: {
        'content-type': "application/x-www-form-urlencoded",
        'couresName': course_name
      },
      success(res){
        app.globalData.course_data = res.data.data
      }
    })
    wx.navigateTo({
      url: '../classes_content/classes_content',
    })
  },


    //   老师端逻辑

     // 点击切换导航的回调
    changeNav(event){

    },

    // 点击切换页面
  changePag(event){
    var a = event.currentTarget.id;
    for(var i=0;i<this.data.courseList.length;i++){
        if(this.data.courseList[i].id==a){
        this.setData({
            courseId:this.data.courseList[i].courseId,
            schoolId:this.data.courseList[i].schoolId,
            classId:this.data.courseList[i].classId,
            className:this.data.courseList[i].className,
            courseName:this.data.courseList[i].courseName,
            teacherName:this.data.courseList[i].teacherName,
            // courseTime:this.data.courseList[i].courseTime,
            courseTime:this.data.courseList[i].courseTime,
            startTime:this.data.courseList[i].startTime,
            endTime:this.data.courseList[i].endTime,
        })
        }
    }
    console.log(event.currentTarget.id);
        wx.navigateTo({
        url: '/pages/course_management/course_management?courseId=' + this.data.courseId
        +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId+'&courseTime='+this.data.courseTime+'&startTime='+this.data.startTime+'&endTime='+this.data.endTime
        })
    },
})