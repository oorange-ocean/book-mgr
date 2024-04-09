import {
  del, post, get, put
} from '@/helpers/request';

export const addBorrowRecord = (userId, bookId, borrowDate) => {
  return post('/borrow-record/add', {
    userId,
    bookId,
    borrowDate,
  });
};

export const getBorrowRecordList = () => {
  return get('/borrow-record');
};

export const getBorrowRecordByUser = (userId) => {
  return get(`/borrow-record/user/${userId}`);
};

export const getBorrowRecordByBook = (bookId) => {
  return get(`/borrow-record/book/${bookId}`);
};

export const markReturned = (recordId) => {
  return put(`/borrow-record/${recordId}/return`);
};

export const markRenewed = (recordId) => {
  return put(`/borrow-record/${recordId}/renew`);
};

export const deleteBorrowRecord = (recordId) => {
  return del(`/borrow-record/${recordId}`);
};
