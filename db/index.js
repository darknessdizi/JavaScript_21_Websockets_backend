const uuid = require('uuid'); 

const dataBase = {
  listUsers: [],
  listMessages: [],

  add(text) { // функция в объекте (для добавления пользователей)
    const user = {
      id: uuid.v4(),
      name: text
    }
    this.listUsers.push(user);
  },

  addMessage(id, message) {
    const index = this.listUsers.findIndex((item) => item.id === id);
    const obj = {
      id: id,
      name: this.listUsers[index].name,
      create: Date.now(),
      message: message,
    };
    this.listMessages.push(obj);
  }
};

module.exports = dataBase;
