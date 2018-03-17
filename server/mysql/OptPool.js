var mysql = require('mysql');

function OptPool() {
  this.falg = true; //是否连接过
  this.pool = mysql.createPool({
    host: '10.66.194.126',
    user: 'root',
    password: '13545715089sq',
    database: 'cAuth',
    port: '3306'
  });

  this.getPool = function () {
    if (this.falg) {
      //第一次进入，初始化这个连接池

      this.pool.on('connection', function (connection) {
        connection.query('select session auto_increment_increment');
        this.falg = false;
      })
    }

    return this.pool;
  }
}

module.exports = OptPool;