module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  },
  bindAuthVariablesMiddleware: (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
    next()
  },
}
