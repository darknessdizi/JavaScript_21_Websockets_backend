const dataBase = {
  listUsers: [],
  listMessages: [],

  add(id) { // функция в объекте (для добавления пользователей)
    const user = {
      id,
      name: null,
    };
    this.listUsers.push(user);
  },

  addName(id, name) {
    const index = this.listUsers.findIndex((item) => item.id === id);
    this.listUsers[index].name = name;
  },

  addMessage(id, message) {
    const index = this.listUsers.findIndex((item) => item.id === id);
    const obj = {
      id,
      name: this.listUsers[index].name,
      create: Date.now(),
      message,
    };
    this.listMessages.push(obj);
    return obj;
  },

  delete(id) {
    const index = this.listUsers.findIndex((item) => item.id === id);
    const result = this.listUsers[index];
    this.listUsers.splice(index, 1);
    return result;
  },
};

module.exports = dataBase;
