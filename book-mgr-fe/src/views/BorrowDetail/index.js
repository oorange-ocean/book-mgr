import { defineComponent, ref, onMounted } from 'vue';
import { book, borrowRecord } from '@/service';
import { formatTimestamp } from '@/helpers/utils';
import store from '@/store';
import dayjs from 'dayjs'
import { CheckOutlined } from '@ant-design/icons-vue'
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    CheckOutlined
  },
  setup() {
    const userId = store.state.userInfo._id;
    const unreturnedBooks = ref([]);
    const returnedBooks = ref([]);
    const curLogType = ref('unreturned');

    const unreturnedColumns = [
      { title: '书名', dataIndex: 'bookName' },
      { title: '借阅日期', dataIndex: 'borrowDate', customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD') },
      { title: '应还日期', dataIndex: 'dueDate', customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD') },
      {
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      },
    ];

    const returnedColumns = [
      { title: '书名', dataIndex: 'bookName' },
      { title: '借阅日期', dataIndex: 'borrowDate', customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD') },
      { title: '归还日期', dataIndex: 'returnDate', customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD') },
    ];

    const fetchBorrowRecords = async () => {
      const res = await borrowRecord.getBorrowRecordByUser(userId);
      // console.log(res);
      if (res && res.data) {
        unreturnedBooks.value = res.data.data.filter(record => !record.returned);
        returnedBooks.value = res.data.data.filter(record => record.returned);
      }
    };

    const returnBook = async ({ recordId, bookId }) => {
      let res = await borrowRecord.markReturned(recordId);
      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })
      fetchBorrowRecords();
      res = await book.updateCount({
        id: bookId,
        num: 1,
        type: 'IN_COUNT'
      })

    };

    const renewBook = async ({ recordId }) => {
      // console.log(recordId);
      const res = await borrowRecord.markRenewed(recordId);
      result(res)
        .success(({ msg }) => {
          message.success(msg)

        })
      fetchBorrowRecords();
    };

    const logFilter = (logType) => {
      curLogType.value = logType;
    };

    onMounted(() => {
      fetchBorrowRecords()
    })

    return {
      unreturnedBooks,
      returnedBooks,
      unreturnedColumns,
      returnedColumns,
      returnBook,
      renewBook,
      curLogType,
      logFilter,
    };
  },
});
