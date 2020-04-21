let express = require('express')
let bodyParser = require('body-parser')
// let path=require('path')
let session = require('express-session')
// let router=require('./routes/router')

let app = express();
const sql = require('./mysql')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'fuckupig',
  cookie: { maxAge: 3600000 },
  resave: true,
  saveUninitialized: true,
}))
app.use(function (req, res, next) {
  //设置跨域访问
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200)
    /*让options请求快速返回*/
  } else {
    next()
  }
})


// 下面都是封装的接口，项目运行时，nodemon App.js 运行文件，生成接口，前端才可以获取数据。
// 封装的接口是  /api/aa    生成的接口是http:127.0.0.1:5000/api/aa 会自动添加域名和端口号
//根据id获取联赛的信息
app.get('/api/leagues/:league_id', (req, res) => {
  // console.log(req.params)
  var id = req.params.league_id
  var sqlStr = 'select * from leagues where league_id=' + id
  sql(sqlStr, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})
//获取每个联赛的俱乐部信息
app.get('/api/clubs/:league_name', (req, res) => {
  // console.log(req.params)
  let name = JSON.stringify(req.params.league_name)
  let sqlStr = 'select * from clubs where league_name=' + name
  sql(sqlStr, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
}),
  //根据俱乐部名字，获取俱乐部的信息
  app.get('/api/club/:club_id', (req, res) => {
    // console.log(req.params.club_id)
    let id = req.params.club_id
    let sqlStr = 'select * from clubs where club_id=' + id
    sql(sqlStr, (err, result) => {
      if (err) console.log(err)
      res.send(result)
      // console.log(result)
    })
  }),

  //获取每个俱乐部的球员
  app.get('/api/players/:club_name', (req, res) => {
    // console.log(req.params)
    var name = JSON.stringify(req.params.club_name)
    var sqlStr = 'select * from players where club_name=' + name
    sql(sqlStr, (err, result) => {
      if (err) console.log(err)
      res.send(result)
    })
  })
//登录用户，下面自己封装了返回的值，前面默认是res.send(result),现在是res.json
app.post('/api/login', (req, res) => {
  // 返回的req.body是个json对象，要和sql数据（字符串）查询，
  // { username: 'tjr', password: '123' }
  // 1.转换成json字符串,sql语句直接拼接
  // {"username":"tjr","password":"123"}
  //  let sqlStr='select * from users where user_name='+user_name
  // 2.sql语句中添加字符串，''表示变量，''里面的""表示转成字符串
  // let sqlStr="select * from users where user_name='"+user_name+"'"

  // console.log(req.body)
  // console.log(JSON.stringify(req.body))
  let user_name = JSON.stringify(req.body.username)
  // let password=req.body.password
  let sqlStr = 'select * from users where user_name=' + user_name
  sql(sqlStr, (err, result) => {
    // console.log(result)
    if (!result.length) {
      res.json({
        code: 400,
        msg: '用户名不存在'
      })
      return
    }
    // let pass=result[0].password
    let user = {
      user_id: result[0].user_id,
      user_name: result[0].user_name
    }
    let a = 'select * from user_permission where user_id=' + user.user_id + 'union all select * from user_role where user_id=' + user.user_id
    sql(a,(err,res)=>{
      console.log(res);
    })
    req.session.login = user
    res.json({
      code: 200,
      msg: '登录成功',
      user: user
    })
  })
})

//注销用户
app.get('/api/logout', (req, res) => {
  // console.log(req)
  req.session.login = null
  res.json({
    code: 200,
    msg: '注销成功'
  })
})
//自动登录
app.get('/api/autologin', (req, res) => {
  let user = req.session.login
  if (user) {
    res.json({
      code: 200,
      msg: '自动登录',
      user: user
    })
  } else {
    res.json({
      code: 400,
      msg: 'not found'
    })
  }
})
//注册
app.post('/api/register', (req, res) => {
  // console.log(req.body)
  let user_name = req.body.username
  let password = req.body.password
  let email = req.body.email
  let sqlStr = "insert into users(user_name,password,email) values ('" + user_name + "','" + password + "','" + email + "')"
  sql(sqlStr, (err, result) => {
    if (err) console.log(err)
    // console.log(result)
    res.json({
      code: 200,
      msg: '注册成功'
    })
  })
})

// app.use(router)
app.listen(5000, function () {
  console.log('running')
})

