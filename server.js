const Koa = require('koa');
const koaBody = require('koa-body');
const WS = require('ws');
const cors = require('@koa/cors');
const http = require('http');
const router = require('./routes'); // импортируем набор роутеров по файлу index.js в папке

const app = new Koa();

app.use(koaBody({ // чтобы обработать тело запроса (обязательно объявить до Middleware где работаем с body)
  urlencoded: true, // иначе тело будет undefined (тело будет строкой)
  multipart: true, // если тело запроса закодировано через FormData
}));

app.use(cors());
app.use(router());

// app.use((ctx) => {
//   console.log('+++++query', ctx.request.query);
//   console.log('+++++files', ctx.request.files);
//   console.log('+++++body', ctx.request.body);
//   ctx.response.body = 'ok'
// });

// const server = http.createServer(app.callback());
// const wsServer = new WS.Server({
//   server
// });

// wsServer.on('connection', (ws) => {
//   console.log('message ****', ws)
//   ws.on('message', (message) => {
//     console.log('message ****', message)
//   });
// });

const port = process.env.PORT || 9000;
app.listen(port, (err) => {
  // два аргумента (1-й это порт, 2-й это callback по результатам запуска сервера)
  if (err) { // в callback может быть передана ошибка
    // (выводим её в консоль для примера, если она появится)
    console.log(err);
    return;
  }
  console.log('Server is listening to 9000 port ************************');
});
