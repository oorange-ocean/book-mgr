import { defineComponent, reactive } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import store from '@/store';

const defaultFormData = {
  account: '',
  password: '',
  character: '',
};

export default defineComponent({
  props: {
    open: Boolean,
  },
  setup(props, context) {
    const { characterInfo } = store.state;

    const addForm = reactive(clone(defaultFormData));

    addForm.character = characterInfo[1]._id;

    const close = () => {
      context.emit('update:open', false);
    };

    const submit = async () => {
      // 校验表单数据
      if (!validateFormData(addForm)) {
        return; // 如果校验失败，不执行后续操作
      }

      const form = clone(addForm);

      const res = await user.add(form.account, form.password, form.character);

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData);
          message.success(data.msg);
          close();
          context.emit('getUser');
        });
    };

    // 校验表单数据的方法
    const validateFormData = (formData) => {
      // 这里可以根据实际情况编写数据校验逻辑
      // 比如检查是否所有字段都有值，密码是否符合要求等
      if (!formData.account || !formData.password || !formData.character) {
        message.error('请填写完整的表单数据');
        return false;
      }
      return true;
    }

    return {
      addForm,
      submit,
      props,
      close,
      characterInfo,
    };
  },
});
