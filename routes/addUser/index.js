const Router = require('koa-router');
const dataBase = require('../../db');

const router = new Router(); // создали роутер

// определяем для какого метода идет обработка запроса (post)
router.post('/addUser', async (ctx) => {
  console.log('+++++body', ctx.request.body);
  const { user } = ctx.request.body;
  const name = dataBase.listUsers.find((item) => item.name === user);
  if (name) {
    ctx.response.body = { status: 'имя занято'};
    ctx.response.status = 200;
    return;
  }
  dataBase.add(user);
  ctx.response.body = { 
    status: 'ok',
    array: dataBase.listUsers,
  };
  ctx.response.status = 201;
  console.log('+++++dataBase', dataBase);
});

module.exports = router;