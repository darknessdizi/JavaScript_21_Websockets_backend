const combineRouters = require('koa-combine-routers');

// const index = require('./index/index.js');
// const subscriptions = require('./subscriptions');
const message = require('./message');
const addUser = require('./addUser');

const router = combineRouters(
  // index,
  message,
  // sse,
  addUser
);

module.exports = router;
