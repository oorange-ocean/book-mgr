const Koa = require('koa')

const app = new Koa();

const Router = require('@koa/router')

const router = new Router({
  prefix: '/auth'
});

router.get('/register', async (ctx) => {
  ctx.body = '注册成功'

})


app.use(router.routes())
app.listen(3000, () => {
  console.log('启动成功');
})