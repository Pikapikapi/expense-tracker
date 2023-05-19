const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/user')
const expense = require('./modules/expense')
//middleware
const { authenticator } = require('../middleware/auth')

//網址結構符合 / 字串的request導向home模組
//條件越寬鬆的往頁，要往越後面放，因為讀取還是有序的
router.use('/users', users)
router.use('/expense', authenticator, expense)
router.use('/', authenticator, home)

module.exports = router
