// import _ from '../common';
// 0 代表只有管理员，1 代表只有用户，2 代表都有
export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: 0,
  },
  {
    title: `书籍管理`,
    url: '/books',
    onlyAdmin: 0,
  },
  {
    title: `书籍借阅`,
    url: '/borrow-record',
    onlyAdmin: 1,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: 0,
  },
  {
    title: '日志列表',
    url: '/log',
    onlyAdmin: 0,
  },
  {
    title: '杂项',
    // onlyAdmin: false,
    children: [
      {
        title: `书籍分类管理`,
        url: '/book-classify',
        onlyAdmin: 0,
      },
      {
        title: '重制密码列表',
        url: '/reset/password',
        onlyAdmin: 0,
      },
      {
        title: '邀请码管理',
        url: '/invite-code',
        onlyAdmin: 0,
      },
    ],
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: 2,
  },
];
