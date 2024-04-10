import { defineComponent, reactive } from 'vue'
import { book } from '../../../service/index.js'
import { result, clone } from '../../../helpers/utils/index.js'
import { message } from 'ant-design-vue'
import store from '@/store';

const defaultFormData = {
  name: '',
  price: 0,
  author: '',
  publishDate: 0,
  classify: '',
  count: ''
}

export default defineComponent({
  props: {
    open: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData))

    // 设置默认分类
    if (store.state.bookClassify.length) {
      addForm.classify = store.state.bookClassify[0]._id;
    }

    const summit = async () => {
      // 校验表单数据
      if (!validateFormData(addForm)) {
        return; // 如果校验失败，不执行后续操作
      }

      // 发送请求添加书籍
      const form = clone(addForm)
      form.publishDate = addForm.publishDate.valueOf()
      const res = await book.add(form)
      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData)
          message.success(data.msg)
          context.emit('getList')
          close()
        })
    }

    // 关闭弹窗
    const close = () => {
      context.emit('update:open', false)
    }

    // 校验表单数据的方法
    const validateFormData = (formData) => {
      // 这里可以根据实际情况编写数据校验逻辑
      // 比如检查是否所有字段都有值，是否满足特定条件等
      if (!formData.name || !formData.price || !formData.author || !formData.publishDate || !formData.classify || !formData.count) {
        message.error('请填写完整的表单数据');
        return false;
      }
      return true;
    }

    return {
      addForm,
      summit,
      props,
      close,
      store: store.state
    }
  }
})
