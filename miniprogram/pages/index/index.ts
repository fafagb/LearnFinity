type Message = {
  from: string;
  content: string;
};


Page({
 
  data: {
    currentTab: 0,
    input: '',
    messages: [] as Array<Message>,
  },
 



  // switchToIndex() {
  //   wx.navigateTo({
  //     url: '/pages/index/index',
  //   });
  // },


  // switchToMy() {
  //   wx.navigateTo({
  //     url: '/pages/my/my',
  //   });
  // },

 


  async callExternalAPI(userInput: string): Promise<string> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://openaiwebapi.azurewebsites.net/openai/call?str=${encodeURIComponent(userInput)}`,
        method: 'GET',
        data: {},
        success(res) {
          let content: string;

          try {
            content = res.data as string;
            resolve(content);
          } catch (err) {
            console.error('处理响应数据时发生错误:', err);
            reject(new Error('无法处理API响应'));
          }
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },

  handleInput(e: any) {
    this.setData({
      input: e.detail.value,
    });
  },

  async sendMessage() {
    const message = {
      from: '我',
      content: this.data.input,
    };

    this.setData({
      messages: [...this.data.messages, message],
      input: '',
    });

    try {
      const responseContent = await this.callExternalAPI(message.content);
      const responseMessage = {
        from: 'Chatbot',
        content: responseContent,
      };
      this.setData({
        messages: [...this.data.messages, responseMessage],
      });
    } catch (err) {
      console.error('调用外部API失败:', err);
    }

    setTimeout(() => {
      const query = wx.createSelectorQuery();
      query.select('.messages').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res: any) => {
        if (res && res[0] && res[1]) {
          wx.pageScrollTo({
            scrollTop: res[0].bottom + res[1].scrollTop,
            duration: 300,
          });
        }
      });
    }, 100);
  },

  switchTab(e: any) {
    const { tab } = e.currentTarget.dataset;
    this.setData({
      currentTab: tab,
    });
  },
});
