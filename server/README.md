# LoserG微信小程序服务器端代码 - Node.js

## 下载源码

你可以直接通过 git 将代码 clone 到本地，也可以点击[这里](https://github.com/stg1994/LoserG.git)下载。

```bash
git clone https://github.com/stg1994/LoserG.git
```

## 开始使用

### 启动项目


- 将代码放到服务器此地址：`/data/release/weapp`
- 运行示例的 Node 版本：`v8.1.0`
- Node 进程管理工具：`pm2`

## 项目结构

```
weapp
├── README.md
├── common
│   └──routerbase.js
├── controllers
│   ├── config.js
│   ├── getphoto.js
│   ├── imgUrlData.js
│   ├── index.js
│   ├── login.js
│   ├── message.js
│   ├── photolist.js
│   ├── tunnel.js
│   ├── upload.js
│   └── user.js
├── middlewares
│   └── response.js
├── mysql
│   ├── OptPool.js
│   ├── mysql.js
│   └── mysqlpool.js
├── routes
│   └── index.js
├── serivices
│   └── cos
│        ├── cosconfig.js
│        └── index.js
├── tools
│   ├── cAuth.sql
│   └── initdb.js
├── app.js
├── config.js
├── nodemon.json
├── package-lock.json
├── package.json
├── process.prod.json
├── qcloud.js
├── sdk.config.json
└── tool.md

```
`app.js` 是 LoserG 的主入口文件，LoserG 使用 Koa 框架，在 `app.js` 创建一个 Koa 实例并响应请求。

`routes/index.js` 是 LoserG 的路由定义文件

`controllers` 存放 LoserG 所有业务逻辑的目录，`index.js` 不需要修改，他会动态的将 `controllers` 文件夹下的目录结构映射成 modules 的 Object，例如 LoserG 中的目录将会被映射成如下的结构：

```javascript
// index.js 输出
{
  login: require('login'),
  message: require('message'),
  tunnel: require('tunnel'),
  upload: require('upload'),
  user: require('user')
}
```

`qcloud.js` 导出了一个 SDK 的单例，包含了所有的 SDK 接口，之后使用的时候只需要 `require` 这个文件就行，无需重复初始化 SDK。

`config.js` 主要的配置如下：

```javascript
{
  port: '5757',                             // 项目启动的端口

  appId: 'wx00dd00dd00dd00dd',              // 微信小程序 App ID
  appSecret: 'abcdefg',                     // 微信小程序 App Secret
  wxLoginExpires: 7200,                     // 微信登录态有效期
  useQcloudLogin: false,                    // 是否使用腾讯云代理登录

  /**
   * MySQL 配置，用来存储用户登录态和用户信息
   * 如果不提供 MySQL 配置，模式会使用自动配置好的本地镜像中的 MySQL 储存信息
   * 具体查看文档-登录态储存和校验
   **/
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: '',
    char: 'utf8'
  },
  
  // COS 配置，用于上传模块使用
  cos: {
    /**
     * 区域
     * 华北：cn-north
     * 华东：cn-east
     * 华南：cn-south
     * 西南：cn-southwest
     */
    region: 'cn-south',
    fileBucket: 'test',                    // Bucket 名称
    uploadFolder: ''                       // 文件夹
  }
}
```

除了 `config.js` ，腾讯云还会在你初始化小程序解决方案的时候，向你的机器下发 `sdk.config`，里面包含了你的腾讯云 AppId、SecretId、SecretKey 和服务器等信息，无需修改，`qcloud.js` 会自动引入。如果你想要在自己的机器上部署 SDK 的 Demo，请查看[自行部署 Demo 说明]()。