// 封装的sql语句的执行函数，App.js里面直接调用，并传实参sql语句
const mysql=require('mysql')
function  fn(sql,callback){
  const conn=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    // port: "3306",
    password:'333666tjr',
    database:'disaster',
  })
  conn.connect()
  conn.query(sql, (err,result) =>{
    callback(err,result)
  })
  conn.end()
}
module.exports=fn
