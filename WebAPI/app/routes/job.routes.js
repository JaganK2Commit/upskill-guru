module.exports = app => {
  const jobs = require("../controllers/job.controller.js");

  var router = require("express").Router();

  // Create a new job
  router.post("/", jobs.create);

  // Retrieve all jobs
  router.get("/", jobs.findAll);

  // Update a jobs with id
  router.put("/:id", jobs.update);


  // Delete a jobs with id
  router.delete("/:id", jobs.delete);

  // Delete all jobs
  router.delete("/", jobs.deleteAll);

  app.use('/api/jobs', router);
};
