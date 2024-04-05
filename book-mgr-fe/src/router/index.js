import { createRouter, createWebHashHistory } from "vue-router";
import { service } from '@/service'
import store from '@/store'

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import('../views/Auth/index.vue')
  },
  {
    path: "/",
    name: "BasicLayout",
    component: () => import('../layout/BasicLayout/index.vue'),
    redirect: '/books',
    children: [
      {
        path: 'books',
        name: 'Books',
        component: () => import(/* webpackChunkName: "Books" */ '../views/Books/index.vue'),
      },
      {
        path: 'books/:id',
        name: 'BookDetail',
        component: () => import('../views/BookDetail/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/Users/index.vue')
      },

    ]
  },


];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  console.log(store.state.characterInfo.length);
  if (!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo');
  };

  next()

})
//   let res = {};

//   try {
//     res = await user.info();
//   } catch (e) {
//     if (e.message.includes('code 401')) {
//       res.code = 401;
//     }
//   }

//   const { code } = res;

//   if (code === 401) {
//     if (to.path === '/auth') {
//       next();
//       return;
//     }

//     message.error('认证失败，请重新登入');
//     next('/auth');

//     return;
//   }

//   if (!store.state.characterInfo.length) {
//     await store.dispatch('getCharacterInfo');
//   }

//   const reqArr = [];

//   if (!store.state.userInfo.account) {
//     reqArr.push(store.dispatch('getUserInfo'));
//   }

//   if (!store.state.goodClassify.length) {
//     reqArr.push(store.dispatch('getGoodClassify'));
//   }

//   await Promise.all(reqArr);

//   if (to.path === '/auth') {
//     next('/goods');
//     return;
//   }

//   next();
// });


export default router;
