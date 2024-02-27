const combineRouters = require('koa-combine-routers');

// const index = require('./index/index.js');
// const subscriptions = require('./subscriptions');
// const sse = require('./sse');
const addUser = require('./addUser');

const router = combineRouters(
  // index,
  // subscriptions,
  // sse,
  addUser
);

module.exports = router;
