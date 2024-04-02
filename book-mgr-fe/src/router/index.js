import { createRouter, createWebHashHistory } from "vue-router";

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
        path:'books/:id',
        name:'BookDetail',
        component:()=>import ('../views/BookDetail/index.vue')
      }

    ]
  },
  

];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
