interface PaymentParams {
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: 'MD5' | 'HMAC-SHA256' | 'RSA';
  paySign: string;
}

Page({
  data: {},

  becomeMember() {
    wx.request({
      url: 'https://api.example.com/getPaymentParams',
      method: 'GET',
      success: (res) => {
        if (res && res.data) {
          const {
            timeStamp,
            nonceStr,
            package: wxPackage,
            signType,
            paySign,
          } = res.data as PaymentParams;

          // 调用微信支付接口
          wx.requestPayment({
            timeStamp,
            nonceStr,
            package: wxPackage,
            signType,
            paySign,
            success() {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000,
              });
            },
            fail() {
              wx.showToast({
                title: '支付失败',
                icon: 'error',
                duration: 2000,
              });
            },
          });
        }
      },
      fail: (error) => {
        console.error('获取支付参数失败:', error);
      },
    });
  },
});
