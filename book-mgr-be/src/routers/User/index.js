const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// const { getBody } = require('../../helpers/utils');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/user',

})

router.get('/list', async (ctx) => {
  // let {
  //   page,
  //   size,
  //   keyword,
  // } = ctx.query;

  // page = Number(page);
  // size = Number(size);

  const query = {};

  // if (keyword) {
  //   query.account = keyword;
  // }

  const list = await User
    .find(query)
    .sort({
      _id: -1,
    })
    // .skip((page - 1) * size)
    // .limit(size)
    .exec();

  const total = await User.countDocuments().exec();

  ctx.body = {
    msg: '获取列表成功',
    data: {
      list,
      // page,
      // size,
      total,
    },
    code: 1,
  };
});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await User.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功',
  };
});


module.exports = router;