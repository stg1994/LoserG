
var FileHash = 0;

let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    songList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    FileHash = options.Hash;
    this.requestData();

  },

  onShow:function(){
    
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