var mysql = require('mysql');  //加载mysql的模块

var connection = mysql.createConnection({
  host: '10.66.194.126',
  user: 'root',
  password: '13545715089sq',
  database: 'cAuth',
  port: '3306'

})
//连接mysql
connection.connect(function (err) {
  if (err) {
    console.log('query-' + err);
    return;
  }

  console.log('conection connect succedd');
})


//插入方法
var userAddsql = 'insert into photolist(id,url) values(?,?)';
var param = ['0', 'www.stg1994.com'];

connection.query(userAddsql, param, function (err, rs) {
  if (err) {
    console.log('insert err', err.message);
    return;

  }
  console.log('insert success');
});

var obj = new Object();

//查询方法
connection.query('select * from photolist', function (err, rs, fields) {
  if (err) {
    console.log('insert err', err.message);
    return;
  }

  console.log('insert success' + rs[0].id);
  console.log(fields);
});

//更新方法
var updatesql = 'update photolist set url=? where id=?'
var params = ['www.stg1990.com', '0']
connection.query(updatesql, params, function (err, rs) {
  if (err) {
    console.log('update err', err.message);
    return;
  }

  console.log('update succes')
});

//删除方法
connection.query('delete  from ls', function (err, rs) {
  if (err) {
    console.log('insert err', err.message);
    return;
  }

  console.log('delete succes')
});

//关闭connect连接
connection.end(function (err) {
  if (err) {
    return;
  }
  console.log('connection end succedd');
})