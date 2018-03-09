Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    nickName:'点击我登录',
    avatarUrl:'',
    gender:'',
    Tchuan:'错误',
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 加载用户信息
  onLoad: function () {
    this.setData({
      loading:true
    })
    var that=this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
           nickName : res.userInfo.nickName,
           avatarUrl: res.userInfo.avatarUrl,
           gender: res. userInfo.gender, //性别 0：未知、1：男、2：女,,
           loading:false
        })
      }
    })
  },
  // 点击预览图片
  imgcheck:function(){
    wx.previewImage({
      current: this.data.avatarUrl, // 当前显示图片的http链接
      urls: [this.data.avatarUrl] // 需要预览的图片http链接列表
    })
  },
  // 点击开始录音
  Lyin:function(){
    var that=this
    wx.startRecord({
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        that.setData({
          hidden: false,
          Tchuan: res.errMsg,
        })
      }
    })
  },
  // 点击扫描二维码
  Ewei:function(){
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
      },
      fail:(res)=>{
        that.setData({
          hidden: false,
          Tchuan: res.errMsg,
        })
      }
    })
  },
  // 拨打电话
  iphone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },
  // 打开导航
  Map:()=>function(){
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
      fail:(res)=>function(){
        that.setData({
          hidden: false,
          Tchuan: res.errMsg,
        })
      }
    })
  },
  // 点击确定隐藏弹窗
  cancel: function () {
    this.setData({
      hidden: true
    });
  }
})