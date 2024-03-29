import { defineComponent, reactive } from 'vue'
import { book } from '../../../service/index.js'
export default defineComponent({
  setup() {
    const addForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: ''
    });

    const summit = async () => {
      const res = await book.add(addForm)
      console.log(addForm);

    }


    return {
      addForm,
      summit,
    }
  }

})