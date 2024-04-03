import { defineComponent, ref, onMounted } from 'vue'
import { user } from '@/service'
import { result } from '@/helpers/utils'
import { formatTimestamp } from '@/helpers/utils';


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

  setup() {
    const list = ref([]);
    const total = ref(0)

    const getUser = async () => {
      const res = await user.list()
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

    return {
      list,
      total,
      columns,
      formatTimestamp,

    }



  }
})