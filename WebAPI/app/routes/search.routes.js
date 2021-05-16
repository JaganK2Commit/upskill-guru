module.exports = (app) => {
  const search = require("../controllers/search.controller.js");

  var router = require("express").Router();

  // Retrieve search results hotskillsbylocation
  router.get("/", search.get);

  router.get("/getRelevantSkillSet", search.getRelevantSkillSet);

  app.use("/api/search", router);
};
