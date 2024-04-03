import { defineComponent, ref, onMounted } from 'vue'
import { user } from '@/service'
import { result } from '@/helpers/utils'
import { formatTimestamp } from '@/helpers/utils';
import { message } from 'ant-design-vue'
import AddOne from './AddOne/index.vue';

const showAddModal = ref(false)
const keyword = ref('')
const isSearch = ref(false)
const columns = [
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createdAt',
    },

  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },

  },
  // {
  //   title: '角色',
  //   slots: {
  //     customRender: 'character',
  //   },
  // },
  // {
  //   title: '操作',
  //   slots: {
  //     customRender: 'actions',
  //   },
  // },
  // {
  //   title: '库存',
  //   slots: {
  //     customRender: 'count',
  //   },
  // },
];


export default defineComponent({
  components: {
    AddOne,
  },

  setup() {
    const list = ref([]);
    const total = ref(0)

    const getUser = async () => {
      const res = await user.list(keyword.value)
      result(res)
        .success(({ data: { list: resList, total: resTotal } }) => {
          list.value = resList;
          // console.log(list);
          total.value = resTotal;

        })

    };

    onMounted(() => {
      getUser();
    })

    const remove = async ({ _id }) => {
      const res = await user.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getUser();
        });
    };

    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
        });
    };

    const onSearch = () => {
      getUser();
      isSearch.value = !!keyword.value;
    };
    const backAll = () => {
      isSearch.value = false;
      keyword.value = '';
      getUser();
    };

    return {
      list,
      total,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      getUser,
      resetPassword,
      onSearch,
      isSearch,
      backAll,
      keyword,

    }



  }
})