const { imagesmysql} = require('../qcloud')

module.exports = async ctx => {
  const data = await imagesmysql(ctx.req)
  
  ctx.state.data = data
}
