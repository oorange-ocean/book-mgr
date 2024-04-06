// import _ from '../common';

export default [
  // {
  //   title: '总览',
  //   url: '/dashboard',
  //   onlyAdmin: true,
  // },
  {
    title: `书籍管理`,
    url: '/books',
    onlyAdmin: false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '日志列表',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '杂项',
    // onlyAdmin: false,
    children: [
      // {
      //   title: `${_.KEYWORD}分类管理`,
      //   url: '/good-classify',
      //   onlyAdmin: true,
      // },
      {
        title: '重制密码列表',
        url: '/reset/password',
        onlyAdmin: true,
      },
      // {
      //   title: '邀请码管理',
      //   url: '/invite-code',
      //   onlyAdmin: true,
      // },
    ],
  },
  // {
  //   title: '个人设置',
  //   url: '/profile',
  //   onlyAdmin: false,
  // },
];
