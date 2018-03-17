const { cos, auth, conf } = require('qcloud_cos');
const config = require('../cos/cosconfig.js');

conf.setAppInfo(config.cosAppId, config.cosSecretId, config.cosSecretKey);

module.exports = Object.assign(cos, { auth, conf });