module.exports = app => {
  const search = require("../controllers/search.controller.js");

  var router = require("express").Router();

  // Retrieve search results hotskillsbylocation
  router.get("/", search.get);

  app.use('/api/search', router);
};
