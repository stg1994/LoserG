
var FileHash = 0;

let app = getApp();
var dataUrl = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'

Page({

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

    FileHash = options.Hash;
    this.requestData();

    this._enableInterval();
    if (app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: true
      })
    }

  },

  /**
   * 页面的初始数据
   */
  data: {
    songList: 0,
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
  },
  play: function (res) {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: dataUrl,
      title: '此时此刻',
      coverImgUrl: '{{Image}}',
      complete: function (res) {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
    app.globalData.backgroundAudioPlaying = true
  },
  seek: function (e) {
    clearInterval(this.updateInterval)
    var that = this
    wx.seekBackgroundAudio({
      position: e.detail.value,
      complete: function () {
        // 实际会延迟两秒左右才跳过去
        setTimeout(function () {
          that._enableInterval()
        }, 2000)
      }
    })
  },
  pause: function () {
    var that = this
    wx.pauseBackgroundAudio({
      dataUrl: dataUrl,
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  _enableInterval: function () {
    var that = this
    update()
    this.updateInterval = setInterval(update, 500)
    function update() {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          })
        }
      })
    }
  },
  onUnload: function () {
    clearInterval(this.updateInterval)
  },

  /**
   * 网络请求
   */
  requestData:function(){
    var that =this;
    wx.request({
      url: 'http://www.kugou.com/yy/index.php',
      method:'GET',
      data:{
        'r':'play/getdata',
        'hash':FileHash,
      },
      success:function(res){
        console.log(res.data);

        if (res == null ||
          res.data == null ||
          res.data.data == null ||
          res.data.data.length <= 0) {
          console.error("god bless you...");
          return;
        }
        bindData(res.data.data);
     
        var itemList = [];
        itemList.push({SongName:SongName,SongUrl:SongUrl,AuthorName:AuthorName,Image:Image,Lrc:Lrc});
        console.log(itemList);
        that.setData({
          songList: itemList,
          hidden: true,
        });
        wx.hideToast();
      },
      fail:function(e){
        console.log(e);
      }
    })
  },
})


/**
 * 定义几个数组用来存取item中的数据
 */

var SongName = [];//歌曲
var SongUrl = [];//歌曲地址
var AuthorName = [];//作者
var Image = [];//专辑照片
var Lrc = [];//歌词



/**
 * 绑定接口中返回的数据
 * @param itemData hibai返回的content;
 */
function bindData(itemData) {

  var songname = itemData.song_name.replace("//ww", "//ws");
  SongName.push(songname);

  var songurl = itemData.play_url.replace("//ww", "//ws");
  SongUrl.push(songurl);

  var image = itemData.img.replace("//ww", "//ws");
  Image.push(image);

  var lrc = itemData.lyrics.replace("//ww", "//ws");
  Lrc.push(lrc);

  var authorname = itemData.author_name.replace("//ww","//ws");
  AuthorName.push(authorname);
}
