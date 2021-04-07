module.exports = app => {
  const users = require('../controllers/user.controller.js');

  const router = require('express').Router();

  // login
  router.get('/', users.login);
  app.use('/api/login', router);

  // registration
  router.post('/', users.register);
  app.use('/api/register', router);
}