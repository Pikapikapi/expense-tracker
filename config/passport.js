const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            req.flash('warning_msg', 'That email is not registered!')
            return done(null, false)
          }
          return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              req.flash('warning_msg', 'Email or Password incorrect.')
              return done(null, false)
            }
            return done(null, user)
          })
        })
        .catch((err) => done(err, false))
    })
  )
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      //反序列化，取出的user資訊，會放進req.user以供後續使用
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
