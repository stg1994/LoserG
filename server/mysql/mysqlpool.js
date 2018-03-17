var OptPool = require('./OptPool');
var optPool = new OptPool();
var pool = optPool.getPool();
if (data.id !== undefined && data.url !== undefined) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    }

    //插入方法
    var userAddsql = 'insert into photolist(id,url) values(?,?)';
    var param = [data.id, data.url];

    conn.query(userAddsql, param, function (err, rs) {
      if (err) {
        console.log('insert err', err.message);
        return;
      }
      console.log('insert success');
    });

  })
  //更新方法
  var updatesql = 'update photolist set url=? where id=?'
  var params = ['www.stg1994.com', '0']
  conn.query(updatesql, params, function (err, rs) {
    if (err) {
      console.log('update err', err.message);
      return;
    }

    console.log('update succes')
  });

  //删除方法
  conn.query('delete  from ls', function (err, rs) {
    if (err) {
      console.log('insert err', err.message);
      return;
    }

    console.log('delete succes')
});
}