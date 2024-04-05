import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '../../service'
import { message } from 'ant-design-vue'
import { result } from '../../helpers/utils/index'
import store from '@/store'
import { getCharacterInfoById } from '@/helpers/character';
import { setToken } from '@/helpers/token';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined
  },
  setup() {
    const router = useRouter()
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: '',
    });

    const loginForm = reactive({
      account: '',
      password: ''

    })

    const register = async () => {

      if (regForm.account === '') {
        message.info('请输入账户');
        return;
      }

      if (regForm.password === '') {
        message.info('请输入密码');
        return;
      }
      if (regForm.inviteCode === '') {
        message.info('请输入邀请码');
        return;
      }
      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode)
      result(res).success((data) => {
        message.success(data.msg)
      })

    }

    const login = async () => {
      if (loginForm.account === '') {
        message.info('请输入账户');
        return;
      }

      if (loginForm.password === '') {
        message.info('请输入密码');
        return;
      }
      const res = await auth.login(loginForm.account, loginForm.password)
      result(res).success(({ msg, data: { user, token } }) => {
        message.success(msg)
        store.commit('setUserInfo', user);
        store.commit('setCharacterInfo', getCharacterInfoById(user.character))
        console.log(store.state);
        setToken(token)
        router.replace('/books')


      })
    }

    return {
      regForm,
      register,
      login,
      loginForm
    }

  }

});
