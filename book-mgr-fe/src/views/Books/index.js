import { defineComponent, ref, onMounted } from 'vue'
import AddOne from './AddOne/index.vue'
import { book } from '../../service'
import { result } from '@/helpers/utlis'

export default defineComponent({
  components: {
    AddOne,
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
      dataIndex: 'publishDate'

    },
    {
      title: '分类',
      dataIndex: 'classify'

    },

    ]


    const open = ref(false)

    onMounted(async () => {
      const res = await book.list()
    }
    )

    return {
      columns,
      open,
    }
  }
})