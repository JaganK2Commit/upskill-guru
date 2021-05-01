module.exports = app => {
  const users = require('../controllers/user.controller.js');

  let router = require('express').Router();

  router.post('/login', users.login);
  router.post('/register', users.register);
  router.post('/update', users.updateUser);
  router.post('/changePassword', users.changePassword);
  
  // router.get('/account', users.authenticate);
  router.get('/', users.getUserById);
  app.use('/api/account', router);
}