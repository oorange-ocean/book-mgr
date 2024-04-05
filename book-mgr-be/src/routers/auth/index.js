const mongoose = require('mongoose')
const Router = require('@koa/router')
const User = mongoose.model('User')
const InviteCode = mongoose.model('InviteCode')
const { getBody } = require('../../helpers/utils/index')
const jwt = require('jsonwebtoken')
const config = require('../../project.config')

const router = new Router({
  prefix: '/auth'
});

router.post('/register', async (ctx) => {
  const {
    account, password, inviteCode
  } = getBody(ctx)
  if (account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    };

    return;
  }
  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec()
  if ((!findCode) || findCode.user) {
    ctx.body = {
      code: 0,
      msg: '邀请码不正确',
      data: null,
    }
    return
  }
  //创建一个用户
  const user = new User({
    account,
    password


  });
  const res = await user.save()
  //同步邀请码数据
  findCode.user = res._id;
  findCode.meta.UpdatedAt = new Date().getTime();
  await findCode.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }



})

router.post('/login', async (ctx) => {
  const {
    account,
    password,
  } = getBody(ctx);

  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null,
    };

    return;
  }

  const one = await User.findOne({
    account,
  }).exec();

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null,
    };

    return;
  }

  const user = {
    account: one.account,
    character: one.character,
    _id: one._id,
  };

  if (one.password === password) {
    ctx.body = {
      code: 1,
      msg: '登入成功',
      data: {
        user,
        token: jwt.sign(user, config.JWT_SECRET),
      },
    };

    return;
  }

  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null,
  };

})

module.exports = router