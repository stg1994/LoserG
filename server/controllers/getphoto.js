const _ = require('lodash');
var COS = require('cos-nodejs-sdk-v5');
const config = require('./config.js');
//const RouterBase = require('../common/routerbase');


var cos = new COS({
  // 必选参数
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
});


var params = {
  Bucket: 'loser-1251018606',    /* 必须 */
  Region: 'ap-shanghai',    /* 必须 */
  Prefix: '',    /* 非必须 */
  Delimiter: '', /* 非必须 */
  Marker: 'images/1520419960125-HJgYESpuM.jpg',    /* 非必须 */
  MaxKeys: '2',    /* 非必须 */
  EncodingType: 'url',    /* 非必须 */
};

cos.getBucket(params, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
},
  (res) => {
    this.res({
      data: _.map(res.data.Contents, 'Key').filter(item => {
        // 只返回`jpg/png`后缀图片
        return ['.jpg', '.png'].includes(path.extname(item));
      }),
    });
    });

//module.exports = cos.getBucket();