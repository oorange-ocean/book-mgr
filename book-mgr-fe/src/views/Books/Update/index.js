import { defineComponent, reactive,watch } from 'vue'
import { book } from '../../../service/index.js'
import { result, clone } from '../../../helpers/utlis/index.js'
import { message } from 'ant-design-vue'
import moment from 'moment'
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
    book:Object,

  },
  setup(props, context) {

    const editForm=reactive({ name: '',
    price: 0,
    author: '',
    publishDate: 0,
    classify: '',
    count: ''})

  

    const close = () => {

      context.emit('update:open', false)
    }
    watch(() => props.book, (current) => {
      Object.assign(editForm, current);
      editForm.publishDate = moment(Number(editForm.publishDate));
    });

    const submit = async () => {
      console.log("--------submit-------------");
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author:editForm.author,
        publishDate: editForm.expirationDate,
        classify: editForm.classify,
      });

      result(res)
        .success(({ data, msg }) => {
          Object.assign(props.book,data)
          message.success(msg);
          close();
        });
    };

    return {
      editForm,
      props,
      close,
      submit,
    }
  }

})