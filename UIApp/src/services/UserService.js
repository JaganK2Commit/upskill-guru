const http = require('../http-common')
// const db = require("../../../WebAPI/app/models");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

module.exports = {
  authenticate
};

async function authenticate({ username, password }) {
  // http.get(`/api/login?username=${username}&password=${password}`);

  // const user = await db.users.findOne({ where: {username} });
  // if (!user) {
  //   throw 'username not found';
  // }

  // const token = jwt.sign({ sub: user.userId }, 'secret', { expiresIn: '7d' });
  // return { ...omitHash(user.get()), token };
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}