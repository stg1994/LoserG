const config = require("config.js");
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast(); 
    wx.showModal({
      title,
      content: JSON.stringify(content),
      showCancel: false
    })

}

function json2Form  (json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

// 一维数组转二维数组
function listToMatrix(list, elementsPerSubArray) {
  let matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i += 1) {
    if (i % elementsPerSubArray === 0) {
      k += 1;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}

//为promise设置简单回调（无论成功或失败都执行）
function always(promise, callback) {
  promise.then(callback, callback);
  return promise;
}


//网络请求
function request(parameters = "", success, method = "GET", header = {}) {
  wx.request({
    url: config.BaseURL + (method == "GET" ? "?" : "") + parameters,
    data: {},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function (res) {
      console.log(res);
      success(res);
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}




//loading提示
function showLoading(title = "请稍后", duration = 5000) {
  wx.showToast({
    title: title,
    icon: 'loading',
    duration: (duration <= 0) ? 5000 : duration
  });
}

//隐藏提示框
function hideToast() {
  wx.hideToast();
}





module.exports = {
  formatTime, showBusy, showSuccess, showModel, json2Form, listToMatrix, always, request, showLoading, hideToast}
