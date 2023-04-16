Component({
  data: {
    selected: 0, // 默认选中第一个选项卡
    list: [
      {
        pagePath: '/pages/index/index',
        text: '问',
      },
      {
        pagePath: '/pages/my/my',
        text: '我',
      },
    ],
  },
  methods: {
    switchTab(e: { currentTarget: { dataset: { index: any; }; }; }) {
      const index = e.currentTarget.dataset.index;
      const pagePath = this.data.list[index].pagePath;

      // 判断当前选项卡是否已经被选中，如果是则不执行任何操作
      if (this.data.selected === index) {
        return;
      }

      wx.switchTab({
        url: pagePath,
        success: () => {
          // 更新选项卡的样式
          this.setData({
            selected: index,
          });
        },
      });
    },
  },
});