import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '../../service'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined
  },
  setup() {
    const regFrom = reactive({
      account: '',
      password: ''
    });

    const register = () => {
      auth.register(regFrom.account, regFrom.password)
    }

    return {
      regFrom,
      register
    }

  }

});
