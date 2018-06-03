//music.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        albumList:[],
        focus: false,
        value: "",
      },

  /**
   * 下拉清空搜索结果
   */
  onPullDownRefresh:function(){
     wx.showToast({
       title: '清空搜索结果',
       icon:'success',
       duration:1000
     });
     wx.clearStorageSync()
  },

  /**
   * 上拉提示
   */
  onReachBottom:function(){
    wx.showToast({
      title: '小姐姐，别拉了，下面啥都没穿',
      icon:'none',
      mask:true,
      duration:2000
    })

  },
  /**
   * 搜索提交表单
   */
  formSubmit:function(e){
    var that = this;
    if (e.detail.value == null){
      wx.showToast({
        title: '请输入歌曲名称',
        icon:'loading'
      })
    }
    else{
      console.log(e.detail.value);
      /**
       * 请求网站数据
       */
        wx.showToast({
          title: '加载中',
          icon: 'loading'
        });
        wx.request({
          url: 'https://songsearch.kugou.com/song_search_v2',
          data: {
            'keyword': e.detail.value,
            'page': '1',
            'pagesize': '30',
            'userid': '-1',
            'clientver': '',
            'platform': 'WebFilter',
            'filter': '2',
            'iscorrection': '1',
            'privilege_filter': '0',
            '_': '1489023388641',
          },
          method: 'GET',
          success: function (res) {

            if (res == null ||
              res.data == null ||
              res.data.data == null ||
              res.data.data.lists == null ||
              res.data.data.lists.length <= 0) {
              console.error("god bless you...");
              //console.log(res.data);
              return;
            }

            for (var i = 0; i < res.data.data.lists.length; i++)
              bindData(res.data.data.lists[i]);

            //将获得的各种数据写入itemList，用于setData
            var itemList = [];
            console.log("搜索歌曲数量：" + Hash.length);
            for (var i = 0; i < Hash.length; i++) {
              itemList.push({ Hash: Hash[i], Albumid: Albumid[i], Albumname: Albumname[i], Filename: Filename[i] });
            }

            that.setData({
              albumList: itemList,
             // hidden: true,
            });
            wx.hideToast();
          },
          fail: function (e) {
            console.log(e)
          }
        });
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
     onLoad: function (options) {
       
     console.log('onLoad');
    },


})

/**
 * 定义几个数组用来存取item中的数据
 */

var Hash = [];//歌曲哈希值
var Albumid = [];//专辑ID
var Albumname = [];//专辑名称
var Filename = [];//歌曲名


/**
 * 绑定接口中返回的数据
 * @param itemData hibai返回的content;
 */
function bindData(itemData) {

  var hash = itemData.FileHash.replace("//ww","//ws");
  Hash.push(hash);

  var albumid = itemData.AlbumID.replace("//ww","//ws");
  Albumid.push(albumid);

  var albumname = itemData.AlbumName.replace("//ww","//ws");
  Albumname.push(albumname);

  var filename = itemData.FileName.replace("//ww","//ws");
  Filename.push(filename);
}

