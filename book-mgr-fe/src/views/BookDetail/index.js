import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { book, inventoryLog } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import Update from '@/views/Books/Update/index.vue'
const columns = [
  {
    title: '数量',
    dataIndex: 'num'
  },
  {
    title: '操作时间',
    slots: {
      customRender: 'createdAt',
    }

  }
]

export default defineComponent({
  components: {
    Update,
    CheckOutlined,

  },
  setup() {

    const route = useRoute()
    const router = useRouter()
    const { id } = route.params;
    const detailInfo = ref({})
    const showUpdateModal = ref(false)
    const log = ref([])
    const curLogType = ref('IN_COUNT');
    const logTotal = ref(0)
    const getDetail = async () => {
      const res = await book.detail(id)

      result(res)
        .success(({ data }) => {
          detailInfo.value = data;

        })

    }

    const getInventoryLog = async () => {
      const res = await inventoryLog.list(curLogType.value)
      result(res)
        .success(({ data: { list, total } }) => {
          console.log(list);
          log.value = list;
          logTotal.value = total;

        })
    }

    onMounted(() => {
      getDetail();
      getInventoryLog();

    })



    const remove = async () => {
      const res = await book.remove(id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)

          router.replace('/books')
        })
    }
    const update = (book) => {
      Object.assign(detailInfo.value, book)
    }

    // 筛选日志
    const logFilter = (type) => {
      curLogType.value = type;

      getInventoryLog();
    };
    return {
      d: detailInfo,
      formatTimestamp,
      remove,
      showUpdateModal,
      update,
      curLogType,
      log,
      logTotal,
      columns,
      logFilter,


    }
  }


})