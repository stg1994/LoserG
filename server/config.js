const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxef23eb5d031960c6',

    // 微信小程序 App Secret
    appSecret: '26e5241a563980fecc37b77b08a6d6f0',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
      host: '10.66.194.126',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '13545715089sq',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-shanghai',
        // Bucket 名称
        fileBucket: 'loser',
        // 文件夹
        uploadFolder: 'images'
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    // 其他配置 ...
    serverHost: 'https://279450047.stg1994.com',
    tunnelServerUrl: 'https://7m4fav4j.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1251018606',
    qcloudSecretId: 'AKID0wsivBFKD3So0KOGXnz2Ka1a0IPOoxbA',
    qcloudSecretKey: 'cYQBmCTZeZWOB42wnhnYCzoCQTCylVZs',
    networkTimeout: 30000,
    wxMessageToken: 'stg1994',

   
}

module.exports = CONF
