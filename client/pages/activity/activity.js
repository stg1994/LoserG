// activity.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
let col1H = 0;
let col2H = 0;
let col3H = 0;

Page({
  
  /**
     * 页面的初始数据
     */
  data:{
    Data:null,
    topPic:'http://pic1.win4000.com/wallpaper/2018-01-08/5a53328fd7772.jpg',
    snowText: '第一场雪',
    snowtext: '第一场雪',
      takeSession: false,
      requestResult: '',
      scrollH: 0,
      imgWidth: 0,
      loadingCount: 0,
      images: [],
      col1: [],
      col2: [],
      col3:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //加载图片地址
    wx.request({
      url: config.service.imgUrlData,
      method: 'GET',
      header: { 'content-type': 'application/ json'},
      success: function (res) { console.log(res.data.data) },
      fail: function (res) { console.log(res) },
    }),



     this.data.Data = JSON.parse(options.snowData);
    console.log("接收的数据是=" + options.snowData);
    wx.getSystemInfo({
      success: (res) => {
    let ww = res.windowWidth;
    let wh = res.windowHeight;
    let imgWidth = ww * 0.30;
    let scrollH = wh;

    this.setData({
      scrollH: scrollH,
      imgWidth: imgWidth
    });
    //加载首组图片
    this.loadImages();
      }
    })
  },


  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

        
  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,  // 当前显示图片的http链接 
      urls: [this.data.imgUrl]    // 需要预览的图片http链接列表 
    })
  },


  //瀑布流图片展示
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;
    let col3 = this.data.col3;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else if (col2H <= col3H) {
      col2H += imgHeight;
      col2.push(imageObj);
    }else{
      col3H += imgHeight;
      col3.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2,
      col3: col3
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },
  
    loadImages: function () {
    let images =  [
      { pic: "http://pic1.win4000.com/mobile/2018-01-08/5a531db9c0aad.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-12-22/5a3cac0a3c43d.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-29/5a1e2ba090098.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/wallpaper/2018-01-13/5a59bb309e31d.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/wallpaper/2018-01-12/5a58192674b58.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-29/5a1e120d3e134.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-21/5a138dd91ab04.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-21/5a138dd9d2f83.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-21/5a138dde46dc5.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-13/5a097cbda333c.jpg", height: 0 },
      { pic: "http://pic1.win4000.com/mobile/2017-11-09/5a03ee9880324.jpg", height: 0 },
      { pic: "http://d.5857.com/wlppr_171214/007.jpg", height: 0 },
      { pic: "http://d.5857.com/wlppr_171214/005.jpg", height: 0 },
      { pic: "http://d.5857.com/ttc_171206/001.jpg", height: 0 }
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });

  },



})