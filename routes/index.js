const combineRouters = require('koa-combine-routers');
const addUser = require('./addUser');

const router = combineRouters(
  addUser
);

module.exports = router;
