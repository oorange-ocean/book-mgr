const mongoose = require('mongoose')
const Router = require('@koa/router')
const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth'
});

router.post('/register', async (ctx) => {
  // const User = new User({
  //   account: '',
  //   password: '',

  // });
  // const res = await User.save()

  // ctx.body = {
  //   code: 1,
  //   msg: '注册成功',
  //   data: res
  // }
  console.log(ctx.request.body);
  ctx.body = {
    code: 1,
    msg: '注册成功'
  }

})

router.post('/login', async (ctx) => {
  ctx.body = '登录成功'

})

module.exports = router