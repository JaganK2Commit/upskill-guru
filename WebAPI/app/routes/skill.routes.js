module.exports = app => {
  const skills = require("../controllers/skill.controller.js");

  var router = require("express").Router();

  // Create a new Skill
  router.post("/", skills.create);

  // Retrieve all Skills
  router.get("/", skills.findAll);

  // Retrieve all published Skills
  router.get("/published", skills.findAllPublished);

  // Retrieve a single Skill with id
  // router.get("/:id", skills.findOne);

  router.get("/getSuggested", skills.findSuggestions);

  // Update a Skill with id
  router.put("/:id", skills.update);


  // Delete a Skill with id
  router.delete("/:id", skills.delete);

  // Create a new Skill
  router.delete("/", skills.deleteAll);

  app.use('/api/skills', router);
};
