import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name'

    },
    {
      title: '年龄',
      dataIndex: 'age'

    }
    ]
    const dataSource = [{
      name: 'xiaohong',
      age: 2
    }]

    return {
      columns,
      dataSource,
    }
  }
})