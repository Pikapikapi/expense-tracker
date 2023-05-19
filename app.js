const express = require('express')
const exhbs = require('express-handlebars')
const handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
//要寫在express-session之後，passport的session是建立在express-session上
const usePassport = require('./config/passport')
const { bindAuthVariablesMiddleware } = require('./middleware/auth')
const flash = require('connect-flash')

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

//Template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
//註冊網頁中會使用到的helper
handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

app.use(express.static('public'))
// 取得瀏覽器回傳的資料
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
usePassport(app) // 呼叫passport函式並載入app，要寫在路由之前
// 使用flash來快速顯示成功登入或失敗等訊息
app.use(flash())
//使用解構函數使用的方法，跟router當中使用的方式一樣，都是使用use添加
app.use(bindAuthVariablesMiddleware)

app.use(routes)

app.listen(port, () => {
  console.log(`Now listening http://localhost:${port}`)
})
