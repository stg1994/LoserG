//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    urls:''
  },



  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      //图片选择数量
      count: 9,
      //图片类型：原图/缩略图
      sizeType: ['compressed'],
      //图片来源：图库/相机
      sourceType: ['album', 'camera'],
      //选择成功，运行以下情况
      success: function (res) {
        //悬浮窗显示“正在上传”
        util.showBusy('正在上传')
        //图片本地临时地址
        var filePath = res.tempFilePaths[0]
        console.log("图片本地地址",res)
        // 上传图片到COS对象存储
        const uploadTask = wx.uploadFile({ //添加图片上传进度
          //图片上传地址
          url: config.service.uploadUrl,
          //文件上传保存的地方
          filePath: filePath,
          //文件名
          name: 'file',
          
          //文件上传成功，运行以下情况
          success: function (res) {
            //悬浮窗显示“上传图片成功”
            util.showSuccess('上传图片成功')
            //打印访问的地址
            console.log(config.service.uploadUrl, '上传图片成功')
            //打印上传成功后返回的数据
            console.log("网站返回数据", res)
            //JSON解析数据
            res = JSON.parse(res.data)
            //将返回的数据中的data.imgUrl赋值给imgUrl
            that.setData({ imgUrl: res.data.imgUrl })

            {
              wx.request({
              url: config.service.imgUrlData,
              data: ({ id: '1', urls: res.data.imgUrl, }),
              header: { 'content-type': 'application/json'},
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: function(res) {console.log("成功打印：", res.data.data)},
              fail: function(res) {console.log("错误打印：",res)},
              complete: function(res) {console.log("完成打印：",res)},
            })
            }
          },

          
          //图片上传到COS对象存储失败
          fail: function (e) {
            //悬浮窗显示“上传图片失败”
            util.showModel('上传图片失败')
            //打印上传图片失败，并显示错误信息
            console.log('上传图片失败',e)
          }
        })

        //上传图片进度
        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })

      },

      //选择图片失败
      fail: function (e) {
        //打印错误信息
        console.log('未知错误，请检查')
        console.error(e)
      }
    })
  },



  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  },

})