module.exports = app => {
  const locations = require('../controllers/location.controller.js');

  const router = require('express').Router();

  router.get('/', locations.find);
  app.use('/api/locations', router);
}