const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowRecordSchema = new Schema({
  // 关联用户
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // 关联书籍
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  // 借阅日期
  borrowDate: {
    type: Date,
    default: Date.now
  },
  // 应归还日期
  dueDate: {
    type: Date,
    //  required: true
  },
  // 实际归还日期
  returnDate: {
    type: Date
  },
  // 是否已归还
  returned: {
    type: Boolean,
    default: false
  },
  // 是否已续借
  renewed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('BorrowRecord', BorrowRecordSchema);
