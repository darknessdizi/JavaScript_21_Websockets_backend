const Koa = require('koa');
const koaBody = require('koa-body');
const WS = require('ws'); // сервер для WebSocket от клиентов
const cors = require('@koa/cors');
const http = require('http');
const uuid = require('uuid');
const router = require('./routes'); // импортируем набор роутеров по файлу index.js в папке
const dataBase = require('./db');

const app = new Koa();

app.use(koaBody({
  // чтобы обработать тело запроса (обязательно объявить до Middleware где работаем с body)
  urlencoded: true, // иначе тело будет undefined (тело будет строкой)
  multipart: true, // если тело запроса закодировано через FormData
}));

app.use(cors()); // задаем правила для политики CORS
app.use(router()); // подключаем маршрутизатор

const port = process.env.PORT || 9000;
const server = http.createServer(app.callback());
const wsServer = new WS.Server({
  server,
});

wsServer.on('connection', (ws) => {
  const newId = uuid.v4();
  const answer = { id: newId };
  ws.send(JSON.stringify({ status: 'connect', body: answer }));
  dataBase.add(newId);

  ws.on('message', (obj) => {
    const { id, message, name } = JSON.parse(obj);
    let result = null;
    if (message) {
      const data = dataBase.addMessage(id, message);
      result = JSON.stringify({ status: 'message', body: data });
    }
    if (name) {
      const data = { id, name };
      result = JSON.stringify({ status: 'addUser', body: data });
    }

    Array.from(wsServer.clients) // Список всех клиентов
      .filter((client) => client.readyState === WS.OPEN) // Отбираем только подключенных клиентов
      .forEach((client) => client.send(result)); // Всем подключенным отправляем сообщение
  });

  ws.on('close', () => {
    const data = dataBase.delete(newId);
    const result = JSON.stringify({ status: 'delete', body: data });
    Array.from(wsServer.clients) // Список всех клиентов
      .filter((client) => client.readyState === WS.OPEN) // Отбираем только подключенных клиентов
      .forEach((client) => client.send(result)); // Всем подключенным отправляем сообщение
  });
});

server.listen(port, (err) => {
  // два аргумента (1-й это порт, 2-й это callback по результатам запуска сервера)
  if (err) { // в callback может быть передана ошибка
    // (выводим её в консоль для примера, если она появится)
    console.log(err);
    return;
  }
  console.log('Server is listening to 9000 port');
});
