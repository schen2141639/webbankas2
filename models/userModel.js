const fs = require('fs');
const {accountModel} = require('./accountModel.js');
const users = JSON.parse(fs.readFileSync('models/users.json', {encoding:'utf8', flag:'r'})).users;

const userModel = {
  findOne: (username) => {
    const user = users.find((user) => user.username === username);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${username}`);
  },
  findByUsername: (username) => {
    const user = users.find((user) => user.username == username);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with username: ${username}`);
  },
  findById: (id) => {
    const user =  users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  getUserAccount: (username) => {
    const user = users.find((user) => user.username === username);
    const account = accountModel.findOne(user.accountNumber);
    return account
  }
};

module.exports = { userModel };
