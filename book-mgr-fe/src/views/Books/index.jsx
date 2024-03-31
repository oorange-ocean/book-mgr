import { defineComponent, ref, onMounted, createVNode } from 'vue'
import AddOne from './AddOne/index.vue'
import { book } from '../../service'
import { result, formatTimestamp } from '@/helpers/utlis'
import { message, Modal, Input } from 'ant-design-vue'
import Update from './Update/index.vue'

export default defineComponent({
  components: {
    AddOne,
    Update,
  },
  setup() {
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
      dataIndex: 'classify'

    },
    {
      title: '库存',
      slots: {
        customRender: 'count'
      }

    },
    {
      title: '操作',
      slots: {
        customRender: 'actions'
      }

    },

    ];

    const open = ref(false);
    const list = ref([]);
    const keyword = ref("")
    const isSearch = ref(false);
    const showUpdateModal=ref(false)
    const curEditBook=ref({})

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

    const remove = async ({ text: record }) => {

      const { _id } = record;

      const res = await book.remove(_id)
      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })
      getList()

    }


    const updateCount = (type, record) => {
      let word = '增加';

      if (type === 'OUT_COUNT') {
        word = '减少';
      }

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="__book_input_count" />
          </div>
        ),
        onOk: async () => {
          console.log('ok');

          const el = document.querySelector('.__book_input_count');
          let num = el.value;

          const res = await book.updateCount({
            id: record._id,
            num,
            type,
          });


          result(res)
            .success((data) => {
              if (type === 'IN_COUNT') {
                // 入库操作
                num = Math.abs(num);
              } else {
                // 出库操作
                num = -Math.abs(num);
              }

              const one = list.value.find((item) => {
                return item._id === record._id;
              });

              if (one) {
                console.log(num);
                one.count = one.count + num;

                message.success(`成功${word} ${Math.abs(num)} 本书`);
              }
            });
        },
      });
    };

    const Update = ({ record }) => {
      showUpdateModal.value = true;
        curEditBook.value = record;
    };

    return {
      columns,
      open,
      list,
      formatTimestamp,
      keyword,
      onSearch,
      isSearch,
      backAll,
      remove,
      getList,
      updateCount,
      showUpdateModal,
      Update,
      curEditBook,


    }
  }
})