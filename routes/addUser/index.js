const Router = require('koa-router');
const dataBase = require('../../db');

const router = new Router(); // создали роутер

// определяем для какого метода идет обработка запроса (post)
router.post('/addUser', async (ctx) => {
  const { id, user } = ctx.request.body;
  const name = dataBase.listUsers.find((item) => item.name === user);
  if (name) {
    ctx.response.body = { status: 'имя занято'};
    ctx.response.status = 200;
    return;
  }
  dataBase.addName(id, user);
  ctx.response.body = { 
    status: 'ok',
    array: dataBase.listUsers,
    meassages: dataBase.listMessages,
  };
  ctx.response.status = 201;
});

module.exports = router;
