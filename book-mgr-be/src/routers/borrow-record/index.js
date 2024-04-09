const Router = require('@koa/router');
const mongoose = require('mongoose');
const BorrowRecord = mongoose.model('BorrowRecord');
const Book = mongoose.model('Book');
const User = mongoose.model('User');

const router = new Router({
  prefix: '/borrow-record'
});

// 创建借阅记录
router.post('/add', async (ctx) => {
  try {
    const { userId, bookId, borrowDate } = ctx.request.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      ctx.status = 404;
      ctx.body = {
        msg: '用户或书籍不存在',
        code: 0
      };
      return;
    }

    const borrowRecord = new BorrowRecord({
      user: userId,
      book: bookId,
      borrowDate: borrowDate
    });

    await borrowRecord.save();

    ctx.body = {
      msg: '借阅记录创建成功',
      data: borrowRecord,
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});

// 获取所有借阅记录
router.get('/', async (ctx) => {
  try {
    const borrowRecords = await BorrowRecord.find();
    ctx.body = {
      msg: '查询成功',
      data: borrowRecords,
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});

// 根据用户 ID 获取借阅记录
// 根据用户 ID 获取借阅记录
// 根据用户 ID 获取借阅记录
router.get('/user/:userId', async (ctx) => {
  try {
    const userId = ctx.params.userId;
    const borrowRecords = await BorrowRecord.find({ user: userId }).populate('book');

    // 计算应还日期为借阅日期的一个月之后
    const data = borrowRecords.map(record => ({
      bookName: record.book.name,
      borrowDate: record.borrowDate,
      dueDate: new Date(record.borrowDate.getTime() + 30 * 24 * 60 * 60 * 1000), // 加上一个月的毫秒数
      returnDate: record.returnDate,
      returned: record.returned,
      renewed: record.renewed
    }));

    ctx.body = {
      msg: '查询成功',
      data: data,
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});



// 根据书籍 ID 获取借阅记录
router.get('/book/:bookId', async (ctx) => {
  try {
    const bookId = ctx.params.bookId;
    const borrowRecords = await BorrowRecord.find({ book: bookId });
    ctx.body = {
      msg: '查询成功',
      data: borrowRecords,
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});

// 更新借阅记录（标记归还）
router.put('/:id/return', async (ctx) => {
  try {
    const borrowRecordId = ctx.params.id;
    const borrowRecord = await BorrowRecord.findById(borrowRecordId);

    if (!borrowRecord) {
      ctx.status = 404;
      ctx.body = {
        msg: '借阅记录不存在',
        code: 0
      };
      return;
    }

    borrowRecord.returned = true;
    borrowRecord.returnDate = Date.now();

    await borrowRecord.save();

    ctx.body = {
      msg: '借阅记录已更新',
      data: borrowRecord,
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});

// 更新借阅记录（标记续借）
router.put('/:id/renew', async (ctx) => {
  try {
    const borrowRecordId = ctx.params.id;
    const borrowRecord = await BorrowRecord.findById(borrowRecordId);

    if (!borrowRecord) {
      ctx.status = 404;
      ctx.body = {
        msg: '借阅记录不存在',
        code: 0
      };
      return;
    }

    borrowRecord.renewed = true;

    await borrowRecord.save();

    ctx.body = {
      msg: '借阅记录已续借',
      data: borrowRecord,
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});

// 删除借阅记录
router.delete('/:id', async (ctx) => {
  try {
    const borrowRecordId = ctx.params.id;
    await BorrowRecord.findByIdAndDelete(borrowRecordId);

    ctx.body = {
      msg: '借阅记录已删除',
      code: 1
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      msg: '服务器错误',
      code: 0
    };
  }
});

module.exports = router;
