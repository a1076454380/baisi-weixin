
// const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    content:'',
    loading:true,
    page:1,
    apiUrl:'http://route.showapi.com/255-1?showapi_appid=48591&showapi_sign=62f2d8f1a027431f823d43f7fc675b42'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // type	String		29	否	查询的类型，默认全部返回。
  // type=10 图片 
  // type= 29 段子 
  // type= 31 声音 
  // type= 41 视频
  // title	String			否	文本中包括的内容，模糊查询
  // page	String	1	1	否	第几页。每页最多返回20条记录
  request:function(){
    var that = this
    wx.request({
      url: that.data.apiUrl + '&type=' + that.data.num + '&page=' + that.data.page,
      data: {},
      header: {
        'ContentType': "json"
      },
      success: function (res) {
        that.setData({
          content: res.data.showapi_res_body.pagebean.contentlist,
          loading: false
        })
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    })
  },
  onLoad: function (options) {
    this.request()
    // util.request()
  },
  // 顶部导航栏点击事件
  navTap:function(e){
        this.setData({
          num: e.target.dataset.typ,
          page: 1,
          loading:true
        })
        this.request()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page=this.data.page+1
    this.setData({
      page:page,
      loading: true
    })
    this.request()
  }
})