// believe.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
      {
        id: '1',
        src: 'http://pic1.win4000.com/mobile/2018-01-08/5a531db9c0aad.jpg',
        name: '照片01',
        data: '2017/11/1'
      }, {
        id: '2',
        src: 'http://pic1.win4000.com/mobile/2017-12-22/5a3cac0a3c43d.jpg',
        name: '照片02',
        data: '2017/11/2'
      }, {
        id: '3',
        src: 'http://pic1.win4000.com/mobile/2017-11-29/5a1e2ba090098.jpg',
        name: '照片03',
        data: '2017/11/3'
      }, {
        id: '4',
        src: 'http://pic1.win4000.com/wallpaper/2018-01-13/5a59bb309e31d.jpg',
        name: '照片04',
        data: '2017/11/4'
      }, {
        id: '5',
        src: 'http://pic1.win4000.com/wallpaper/2018-01-12/5a58192674b58.jpg',
        name: '照片05',
        data: '2017/11/5'
      }, {
        id: '6',
        src: 'http://pic1.win4000.com/mobile/2017-11-29/5a1e120d3e134.jpg',
        name: '照片06',
        data: '2017/11/6'
      }, {
        id: '7',
        src: 'http://pic1.win4000.com/mobile/2017-11-21/5a138dd91ab04.jpg',
        name: '照片07',
        data: '2017/11/7'
      }, {
        id: '8',
        src: 'http://pic1.win4000.com/mobile/2017-11-21/5a138dd9d2f83.jpg',
        name: '照片08',
        data: '2017/11/8'
      }, {
        id: '9',
        src: 'http://pic1.win4000.com/mobile/2017-11-21/5a138dde46dc5.jpg',
        name: '照片09',
        data: '2017/11/9'
      }, {
        id: '10',
        src: 'http://pic1.win4000.com/mobile/2017-11-13/5a097cbda333c.jpg',
        name: '照片10',
        data: '2017/11/10'
      }, {
        id: '11',
        src: 'http://pic1.win4000.com/mobile/2017-11-09/5a03ee9880324.jpg',
        name: '照片11',
        data: '2017/11/11'
      }, {
        id: '12',
        src: 'http://d.5857.com/wlppr_171214/007.jpg',
        name: '照片12',
        data: '2017/11/12'
      }, {
        id: '13',
        src: 'http://d.5857.com/wlppr_171214/005.jpg',
        name: '照片13',
        data: '2017/11/13'
      }, {
        id: '14',
        src: 'http://d.5857.com/ttc_171206/001.jpg',
        name: '照片14',
        data: '2017/11/14'
      }, {
        id: '15',
        src: 'http://pic1.win4000.com/mobile/2017-11-09/5a03ee9880324.jpg',
        name: '照片15',
        data: '2017/11/15'
      }, {
        id: '16',
        src: 'http://d.5857.com/ttc_171206/001.jpg',
        name: '照片16',
        data: '2017/11/16'
      }, {
        id: '17',
        src: 'http://d.5857.com/ttc_171206/001.jpg',
        name: '照片17',
        data: '2017/11/17'
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  
})