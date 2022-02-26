// pages/learn_test/learn_test.js
Page({

    /**
   * 页面的初始数据
   */
  data: {
    // 控制下拉列表的显示隐藏，false隐藏、true显示
    school_shows: false,
    // 下拉列表的数据
    school_data: ['阳泉市平定县实验小学', '阳泉市平定县第二实验小学校', '阳泉市平定县东关小学校'],
    // 选择的下拉列表下标
    school_index: 0,
  },

  // 点击下拉显示框-学校
  school_selectTaps() {
    this.setData({
      school_shows: !this.data.school_shows,
    });
  },
  // 点击学校的下拉列表
  school_optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
        school_index: Indexs,
        school_shows: !this.data.school_shows
    });
  },
})