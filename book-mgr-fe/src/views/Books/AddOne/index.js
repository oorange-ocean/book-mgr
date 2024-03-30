import { defineComponent, reactive } from 'vue'
import { book } from '../../../service/index.js'
import { result, clone } from '../../../helpers/utlis'
import { message } from 'ant-design-vue'
const defaultFormData = {
  name: '',
  price: 0,
  author: '',
  publishDate: 0,
  classify: ''
}
export default defineComponent({
  props: {
    open: Boolean,

  },
  setup(props, context) {

    console.log(props);
    const addForm = reactive(clone(defaultFormData))

    const summit = async () => {
      const form = clone(addForm)
      form.publishDate = addForm.publishDate.valueOf()
      const res = await book.add(form)
      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData)
          message.success(data.msg)

        })

    }

    const close = () => {

      context.emit('update:open', false)
    }


    return {
      addForm,
      summit,
      props,
      close,
    }
  }

})