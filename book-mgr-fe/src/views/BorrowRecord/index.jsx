import { defineComponent, ref, onMounted, createVNode } from 'vue'
import { book, bookClassify, log } from '../../service'
import { result, formatTimestamp } from '@/helpers/utils'
import { message, Modal, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { getClassifyTitleById } from '@/helpers/book-classify';
import { borrowRecord } from '@/service'
import store from '@/store'

export default defineComponent({
  components: {

  },
  setup() {
    const router = useRouter()
    const columns = [{
      title: '书名',
      dataIndex: 'name'

    },
    {
      title: '价格',
      dataIndex: 'price'

    },
    {
      title: '作者',
      dataIndex: 'author'

    },
    {
      title: '出版日期',
      dataIndex: 'publishDate',
      slots: {
        customRender: 'publishDate'
      }

    },
    {
      title: '分类',
      slots: {
        customRender: 'classify',
      },
    },
    {
      title: '库存',
      dataIndex: 'count'

    },
    {
      title: '操作',
      slots: {
        customRender: 'actions'
      }

    },

    ];

    const list = ref([]);
    const keyword = ref("")
    const isSearch = ref(false);

    const getList = async () => {
      const res = await book.list({

        keyword: keyword.value,
      });

      result(res)
        .success(({ data }) => {
          list.value = data
        });
    };



    onMounted(async () => {
      getList()
    });
    const onSearch = () => {
      getList()
      isSearch.value = Boolean(keyword.value);
    }
    const backAll = () => {
      keyword.value = '';
      isSearch.value = false;

      getList();
    };

    const borrow = async ({ text: record }) => {
      const bookId = record._id;
      const userId = store.state.userInfo._id;
      const BorrowTime = Date.now()
      let res = await borrowRecord.addBorrowRecord(userId, bookId, BorrowTime)
      result(res)
        .success(({ msg }) => {
          message.success(msg);
        })

      res = await book.updateCount({
        id: record._id,
        num: 1,
        type: 'OUT_COUNT'
      })

      result(res)
        .success((data) => {

          const one = list.value.find((item) => {
            return item._id === record._id;
          });

          if (one) {
            one.count = one.count - 1;


          }
        });

      getList()

    }


    return {
      columns,
      list,
      formatTimestamp,
      keyword,
      onSearch,
      isSearch,
      backAll,
      getList,
      getClassifyTitleById,
      borrow


    }
  }
})