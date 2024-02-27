const Router = require('koa-router');
const dataBase = require('../../db');

const router = new Router(); // создали роутер

// определяем для какого метода идет обработка запроса (put)
// router.put('/message/:message', async (ctx) => { // получаем параметр из URL
router.post('/message', async (ctx) => { // получаем параметр из URL
  const { id, message } = JSON.parse(ctx.request.body);
  console.log('+++++put', ctx.request.body, id, message);
  const obj = dataBase.addMessage(id, message);
  // const { user } = ctx.request.body;
  // const name = dataBase.listUsers.find((item) => item.name === user);
  // if (name) {
    ctx.response.body = { status: 'ok', result: obj};
  //   ctx.response.status = 200;
  //   return;
  // }
  // dataBase.add(user);
  // ctx.response.body = { 
  //   status: 'ok',
  //   array: dataBase.listUsers,
  // };
  ctx.response.status = 200;
  console.log('+++++message', dataBase);
});

module.exports = router;