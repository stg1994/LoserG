var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const request = require('../../lib/request.js');
// 引入模块

var app = getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    
    // 相册列表数据
    albumList: [],

    // 图片布局列表（二维数组，由`albumList`计算而得）
    layoutList: [],

    // 布局列数
    layoutColumnSize: 3,

    // 触发了长按
    triggerLongTap: false,

    // 是否显示toast
    showToast: false,

    // 提示消息
    toastMessage: '',

    // 是否显示动作命令
    showActionsSheet: false,

    // 当前操作的图片
    imageInAction: '',

    // 图片预览模式
    previewMode: false,

    // 当前预览索引
    previewIndex: 0,
  },

  // 隐藏toast消息
  hideToast() {
    this.setData({
      showToast: false,
      toastMessage: '',
    });
  },

  // 隐藏动作列表
  hideActionSheet() {
    this.setData({
      showActionsSheet: false,
      imageInAction: '',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.renderAlbumList();//加载渲染相册列表
    this.getAlbumList().then((resp) => { 
      console.log(resp.data);
      if (resp.code !== 0) {
        // 图片列表加载失败
        return;
      }
      this.setData({ 'albumList': this.data.albumList.concat(resp.data) });
      this.renderAlbumList();
    });

  },

  // 获取相册列表
  getAlbumList() {
    //let promise = request({
    // method: 'GET',
    //  url: config.service.list,
    // });

    //setTimeout(() => this.hideLoading(), 1000);
    //return promise;
    return request({ 
      method: 'POST', 
      url: config.service.imgUrlData,
      data:{id:'1'},
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      responseType: 'text',
           
       });
  },


  // 渲染相册列表
  renderAlbumList() {
    let layoutColumnSize = this.data.layoutColumnSize;
    let layoutList = [];
    console.log(this.data.albumList.length);
    if (this.data.albumList.length) {
      console.log("失败2");
      layoutList = util.listToMatrix([0].concat(this.data.albumList), layoutColumnSize);
      console.log(layoutList);
      let lastRow = layoutList[layoutList.length - 1];
      if (lastRow.length < layoutColumnSize) {
        let supplement = Array(layoutColumnSize - lastRow.length).fill(0);
        lastRow.push(...supplement);
      }
    }
    console.log("失败3");
    this.setData({ layoutList });
  },


  // 从相册选择照片或拍摄照片
  chooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: (res) => {
        //this.showLoading('正在上传图片…');
        console.log(config.service.uploadUrl);
        //上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: res.tempFilePaths[0],
          name: 'file',

          success: (res) => {
            let response = JSON.parse(res.data);

            if (response.code === 0) {
              console.log(response);
              let albumList = this.data.albumList;
              albumList.unshift(response.data.imgUrl);

              this.setData({ albumList });
              this.renderAlbumList();
              this.setData({
                showToast: true,
                toastMessage: '图片上传成功',
              });
              console.log('上传图片成功')
            } else {
              console.log(response);
            }
          },

          fail: (res) => {
            console.log('fail', res);
          },
          
        });

      },
    });
  },
  // 进入预览模式
  enterPreviewMode(event) {
    if (this.data.showActionsSheet) {
      return;
    }
    let imageUrl = event.target.dataset.src;
    let previewIndex = this.data.albumList.indexOf(imageUrl);
    this.setData({ previewMode: true, previewIndex: previewIndex });
  },

  // 退出预览模式
  leavePreviewMode() {
    this.setData({ previewMode: false, previewIndex: 0 });
  },


  // 显示可操作命令
  showActions(event) {
    this.data.triggerLongTap = true;
    setTimeout(() => {
      this.data.triggerLongTap = false;
    }, 1000);

    this.setData({
      showActionsSheet: true,
      imageInAction: event.target.dataset.src,
    });
  },

  // 下载图片
  downloadImage() {
    wx.downloadFile({
      url: this.data.imageInAction,
      type: 'image',
      success: (resp) => {
        wx.saveFile({
          tempFilePath: resp.tempFilePath,
          success: (resp) => {
            this.setData({
              showToast: true,
              toastMessage: '图片保存成功',
            });
          },

          fail: (resp) => {
            console.log('fail', resp);
          },

          complete: (resp) => {
            console.log('complete', resp);
          },
        });
      },

      fail: (resp) => {
        console.log('fail', resp);
      },
    });

    this.setData({
      showActionsSheet: false,
      imageInAction: '',
    });
  },


  

})