Component({
  data: {
    selected: 0,
    color: "#000000",
    roleId: '',
    selectedColor: "#1396DB",
    allList: [{
      //家长角色
      list1: [{
        pagePath: "pages/parent_index/parent_index",
        text: "首页",
        iconPath: "/icons/index.png",
        selectedIconPath: "/icons/index_selected.png"
      },{
        pagePath: "pages/own/own",
        text: "我的",
        iconPath: "/icons/own.png",
        selectedIconPath: "/icons/own_selected.png"
      }],
      //老师、班主任角色
      list2: [{
        pagePath: "pages/teacher_index/teacher_index",
        text: "首页",
        iconPath: "/icons/index.png",
        selectedIconPath: "/icons/index_selected.png"
      },
      {
        pagePath: "pages/own/own",
        text: "我的",
        iconPath: "/icons/own.png",
        selectedIconPath: "/icons/own_selected.png"
      }],
    }],
  },
  attached() {
    // 家长角色用1表示，老师角色用2表示
    const roleId = 1
    if (roleId == 1) {
      this.setData({
        list: this.data.allList[0].list1
      })
    } else if (roleId == 2) {
      this.setData({
        list: this.data.allList[0].list2
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  },
})
