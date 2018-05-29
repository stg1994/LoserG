/**
 * @autor Mr.Song
 * 小视频 
 */
const util = require("../../utils/util.js");
//播放的视频或者音频的ID
var playingID = -1;
var types = ["41"];
var dataType = 0;
var page = 1;//页码
var videoMaxtime = 0;//视频 最大时间
var DATATYPE = {
  VIDEODATATYPE: "41",
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoDataList: [],
    topTabItems: ["视频"],
    currentTopItem: "0",
    swiperHeight: "0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshNewData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          swiperHeight: (res.windowHeight - 37)
        });
      }
    })
  },

  //swiperChange
  bindChange: function (e) {
    var that = this;
    dataType = e.detail.current;
    that.setData({
      currentTopItem: e.detail.current
    });

    //如果需要加载数据
    if (this.needLoadNewDataAfterSwiper()) {
      this.refreshNewData();
    }
  },
  //刷新数据
  refreshNewData: function () {
    //加载提示框
    util.showLoading();
    var that = this;
    var parameters = 'a=list&c=data&type=' + types[dataType];
    console.log("parameters = " + parameters);
    util.request(parameters, function (res) {
      page = 1;
      that.setNewDataWithRes(res, that);
      setTimeout(function () {
        util.hideToast();
        wx.stopPullDownRefresh();
      }, 1000);
    });
  },


  //监听用户下拉动作
  onPullDownRefresh: function () {
    this.refreshNewData();
  },

  //滚动后需不要加载数据
  needLoadNewDataAfterSwiper: function () {

    switch (types[dataType]) {
    //视频
      case DATATYPE.VIDEODATATYPE:
        return this.data.videoDataList.length > 0 ? false : true;
      default:
        break;
    }

    return false;
  },

  //设置新数据
  setNewDataWithRes: function (res, target) {
    switch (types[dataType]) {
      //视频
      case DATATYPE.VIDEODATATYPE:
        videoMaxtime = res.data.info.maxtime;
        target.setData({
          videoDataList: res.data.list,       
        });
        break;
      default:
        break;
    }
  },

  //加载更多操作
  loadMoreData: function () {
    
    console.log("加载更多");
    //加载提示框
    util.showLoading();

    var that = this;
    var parameters = 'a=list&c=data&type=' + types[dataType] + "&page=" + (page + 1) + "&maxtime=" + this.getMaxtime();
    console.log("parameters = " + parameters);
    util.request(parameters, function (res) {
      page += 1;
      that.setMoreDataWithRes(res, that);
      setTimeout(function () {
        util.hideToast();
        wx.stopPullDownRefresh();
      }, 1000);
    });
  },

  //获取最大时间
  getMaxtime: function () {
    switch (types[dataType]) {
      //视频
      case DATATYPE.VIDEODATATYPE:
        return videoMaxtime;
      default:
        return 0;
    }
  },

  //获取视频图片
  getVideoPhoto:function () {
    var i = 0;
    for (i = 0; i < 20; i++) {
     videoPhotoList =   res.data.list[i].bimageuri
          };
  },


  //设置加载更多的数据
  setMoreDataWithRes(res, target) {
    switch (types[dataType]) {
      //视频
      case DATATYPE.VIDEODATATYPE:
        videoMaxtime = res.data.info.maxtime;
        target.setData({
          videoDataList: target.data.videoDataList.concat(res.data.list)
        });
        
        console.log(array);
        break;
      default:
        break;
    }
  },

  //视频播放开始播放
  videoPlay: function (obj) {
    console.log("playingID = " + playingID);
    console.log(obj);

    playingID = obj.currentTarget.id;
    //暂停音频的播放
    if (this.audioContext) {
      this.audioContext.pause();
    }
    //暂停上一条视频的播放
    if (this.videoContext) {
      console.log(this.videoContext);
      this.videoContext.pause();
    }
    this.videoContext = wx.createVideoContext(obj.currentTarget.id);
  },


})
