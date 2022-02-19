
var dateTimePicker = require('../../utils/dateTimePicker.js');
var utils = require('../../utils/util.js');
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    imgs_name:[],
    postTime:'',
    imgs: [],
    date: '',
    content:'',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    'content':'',
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
    homeworkList:[]
  },
  hw_content(e){
    this.setData({
      content:e.detail.value        //当前文本框的值
    })
    console.log(this.data.content)
  },
  release_hw(){
    var postTime = Number(new Date());
    this.setData({
      postTime:postTime
    })
    if(this.data.content==''){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/homework_new/homework_new', //仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          courseId:this.data.courseId,
          classId:this.data.classId,
          teacherId:this.data.teacherId,
          role:this.data.teacherRole,
          courseTime:this.data.courseTime,
          teacherName:this.data.teacherName,
          courseName:this.data.courseName,
          postTime:this.data.postTime,
          content:this.data.content,
          imgs:this.data.imgs_name
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res){
          console.log('hahah ')
          console.log('hahah ')
        }
      })
      for (let index = 0; index < this.data.imgs.length; index++) {
        wx.uploadFile({
          filePath: this.data.imgs[index],
          name: 'img'+index,
          url: 'http://localhost:8080/upload/picture',
          success:function(res){
            console.log('hahah ')
          }
        })
      }
      wx.navigateTo({
        url: '/pages/homework/homework?courseId=' + this.data.courseId
        +'&schoolId='+this.data.schoolId+'&classId='+this.data.classId+'&className='+this.data.className+'&courseName='+this.data.courseName+'&teacherName='+this.data.teacherName+'&teacherRole='+this.data.teacherRole+'&teacherId='+this.data.teacherId+'&courseTime='+this.data.courseTime+'&startTime='+this.data.startTime+'&endTime='+this.data.endTime
      })
    }
      
      
      // let pages = getCurrentPages();
      // let prevPage = pages[pages.length-2];
      // prevPage.data.homeworkList.unshift({
      //   'id':this.data.hw_id,
      //   'name':'王老师',
      //   'time':this.data.date,
      // })
      // prevPage.setData({
      //   content:this.data.content
      // })
      // wx.navigateBack({
      //   detail:0
      // })
    },
   


  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options){
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

    var time = dateTimePicker.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      date: time,
      // hw_id:hw_id
    });
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
     dateTime: obj.dateTime,
     dateTimeArray: obj.dateTimeArray,
     dateTimeArray1: obj1.dateTimeArray,
     dateTime1: obj1.dateTime
    });
    },
    changeDate(e){
      this.setData({ date:e.detail.value});
    },
    changeTime(e){
     this.setData({ time: e.detail.value });
    },
    changeDateTime(e){
      this.setData({ dateTime: e.detail.value });
    },
    changeDateTime1(e) {
     this.setData({ dateTime1: e.detail.value });
    },
changeDateTimeColumn(e){
  var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
  
  arr[e.detail.column] = e.detail.value;
  dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  
  this.setData({
    dateTimeArray: dateArr,
    dateTime: arr
  });
},
changeDateTimeColumn1(e) {
  var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
  
  arr[e.detail.column] = e.detail.value;
  dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  
  this.setData({ 
    dateTimeArray1: dateArr,
    dateTime1: arr
  });
},

chooseImg: function (e) {
  var that = this;
  var imgs = this.data.imgs;
  if (imgs.length >= 9) {
    this.setData({
      lenMore: 1
    });
    setTimeout(function () {
      that.setData({
        lenMore: 0
      });
    }, 2500);
    return false;
  }
  wx.chooseMessageFile({
    count: 6,
    type:'image',
    success(res){
      console.log(res)
      for (let index = 0; index < res.tempFiles.length; index++) {
        that.data.imgs_name[index]=res.tempFiles[index].name
        that.data.imgs[index]=res.tempFiles[index].path
      }
      console.log(that.data.imgs_name)
      console.log(that.data.imgs)
      that.setData({
        imgs:that.data.imgs
      })
    }
  })
  // wx.chooseImage({
  //   count: 6, // 默认9
  //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //   success: function (res) {
  //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //     var tempFilePaths = res.tempFilePaths;
  //     var imgs = that.data.imgs;
  //     console.log(tempFilePaths + '----');
  //     for (var i = 0; i < tempFilePaths.length; i++) {
  //       if (imgs.length >= 6) {
  //         that.setData({
  //           imgs: imgs
  //         });
  //         return false;
  //       } else {
  //         imgs.push(tempFilePaths[i]);
  //       }
  //     }
  //     console.log(imgs);
  //     that.setData({
  //       imgs: imgs
  //     });
  //   }
  // });
},

deleteImg: function (e) {
  var imgs = this.data.imgs;
  var imgs_name = this.data.imgs_name;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  imgs_name.splice(index,1)
  this.setData({
    imgs: imgs,
    imgs_name:imgs_name
  });
  console.log(this.data.imgs)
  console.log(this.data.imgs_name)
},
    
    // 预览图片

previewImg: function (e) {
  //获取当前图片的下标
  var index = e.currentTarget.dataset.index;
  //所有图片
  var imgs = this.data.imgs;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
  })
},
})