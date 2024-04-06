const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

const Book = mongoose.model('Book')
const InventoryLog = mongoose.model('InventoryLog')
const BOOK_CONST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT'
}
const findBookOne = async (id) => {
  const one = await Book.findOne({
    _id: id,
  }).exec();

  return one;
};

const router = new Router({
  prefix: '/book'
})

router.post('/add', async (ctx) => {

  const {
    name,
    price,
    author,
    publishDate,
    classify,
    count,
  } = getBody(ctx).form

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count,
  })

  const res = await book.save()

  ctx.body = {
    data: res,
    code: 1,
    msg: '添加成功',
  }

})

router.get('/list', async (ctx) => {
  const {
    keyword = ''
  } = ctx.query;
  const query = {}
  if (keyword) {
    query.name = keyword
  }
  const list = await Book
    .find(query)
    .sort({
      _id: -1,
    })
    .exec();
  ctx.body = {
    data: list,
    code: 1,
    msg: '获取列表成功',
  }

})

router.delete(':id', async (ctx) => {
  const {
    id,
  } = ctx.params;
  console.log("执行了" + id);
  const delMsg = await Book.deleteOne({
    _id: id,
  })
  ctx.body = {
    data: 'delMsg',
    msg: '删除成功',
    code: 1,
  }
})

router.post('/update/count', async (ctx) => {
  const {
    id, type,
  } = getBody(ctx)

  const book = await Book.findOne({
    _id: id
  }).exec()

  if (!book) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍',
    }
    return;
  }

  let {
    num,
  } = ctx.request.body
  num = Number(num)

  if (type === BOOK_CONST.IN) {
    num = Math.abs(num)
  } else {
    num = -Math.abs(num)
  }

  book.count += num;
  if (book.count < 0) {
    ctx.body = {
      code: 0,
      msg: '剩下的量不足以出库'
    }
    return;
  }
  const res = await book.save()

  const log = new InventoryLog({
    num: Math.abs(num),
    type,
  });
  await log.save()
  ctx.body = {
    data: res,
    code: 1,
    msg: "操作成功"
  }

})

router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  const one = await Book.findOne({
    _id: id
  });

  // 没有找到书
  if (!one) {
    ctx.body = {
      msg: `没有找到书籍`,
      code: 0,
    }
    return;
  }

  const newQuery = {};

  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

  Object.assign(one, newQuery);

  const res = await one.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '保存成功',
  };
});

router.get('/detail/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const one = await findBookOne(id);

  // 没有找到书
  if (!one) {
    ctx.body = {
      msg: `没有找到书籍`,
      code: 0,
    };

    return;
  }

  ctx.body = {
    msg: '查询成功',
    data: one,
    code: 1,
  };
});

module.exports = router

