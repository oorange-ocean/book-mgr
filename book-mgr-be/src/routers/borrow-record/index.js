const Router = require('@koa/router');
const mongoose = require('mongoose');
const BorrowRecord = mongoose.model('BorrowRecord');
const Book = mongoose.model('Book');
const User = mongoose.model('User');

const router = new Router({
  prefix: '/borrow-record'
});

// 创建借阅记录
// 创建借阅记录
router.post('/add', async (ctx) => {
  try {
    const { userId, bookId } = ctx.request.body;

    // 检查该书籍是否已经被借阅过
    const existingRecord = await BorrowRecord.findOne({ user: userId, book: bookId });

    if (existingRecord) {
      // ctx.status = 400;
      ctx.body = {
        msg: '该书籍已经被借阅过，不可再次借阅',
        code: 0
      };
      return;
    }

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      // ctx.status = 404;
      ctx.body = {
        msg: '用户或书籍不存在',
        code: 0
      };
      return;
    }

    // 计算借阅日期和应还日期
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 一个月后的日期

    const borrowRecord = new BorrowRecord({
      user: userId,
      book: bookId,
      borrowDate: borrowDate,
      dueDate: dueDate // 设置应还日期为借阅日期的一个月之后
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
router.get('/user/:userId', async (ctx) => {
  try {
    const userId = ctx.params.userId;
    const borrowRecords = await BorrowRecord.find({ user: userId }).populate('book');

    // 从借阅记录中提取书名、书籍ID和借阅记录的唯一标识符，并计算应还日期
    const data = borrowRecords.map(record => ({
      recordId: record._id, // 借阅记录的唯一标识符
      bookId: record.book._id,
      bookName: record.book.name,
      borrowDate: record.borrowDate,
      dueDate: record.dueDate, // 一个月后的日期
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
router.put('/:borrowRecordId/return', async (ctx) => {
  try {
    const borrowRecordId = ctx.params.borrowRecordId;

    // 查找借阅记录
    const borrowRecord = await BorrowRecord.findById(borrowRecordId);

    if (!borrowRecord) {
      ctx.status = 404;
      ctx.body = {
        msg: '借阅记录不存在',
        code: 0
      };
      return;
    }

    // 如果借阅记录已归还，返回错误消息
    if (borrowRecord.returned) {
      ctx.status = 400;
      ctx.body = {
        msg: '借阅记录已经归还过，无法再次归还',
        code: 0
      };
      return;
    }

    // 更新借阅记录为归还状态，并设置归还日期为当前日期
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

    if (borrowRecord.renewed) {
      ctx.body = {
        msg: '借阅记录已经续借过，不可再次续借',
        code: 0
      };
      return;
    }

    borrowRecord.renewed = true;

    // 更新应还日期为借阅日期的两个月之后
    const borrowDate = new Date(borrowRecord.borrowDate);
    const dueDate = new Date(borrowDate.getTime() + 60 * 24 * 60 * 60 * 1000); // 两个月后的日期
    borrowRecord.dueDate = dueDate;

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
