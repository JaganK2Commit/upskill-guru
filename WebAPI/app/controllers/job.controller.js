const db = require("../models");
const dbJob = db.jobs;
const dbJobLocation = db.joblocation;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: jobs } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, jobs, totalPages, currentPage };
};

// Create and Save a new Job
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Job
  const job = {
    title: req.body.title,
    employer: req.body.employer
  };

  // Save Job in the database
  dbJob.create(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  dbJob.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobs."
      });
    });
};

// Find a single Job with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  dbJob.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id
      });
    });
};

// Update a Job by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  dbJob.update(req.body, {
    where: { JobID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  dbJobLocation.destroy({
    where: { JobID: id }
  })
    .then(num => {
        db.jobskills.destroy({
          where: { JobID: id }
        })
          .then(num => {
              dbJob.destroy({
                where: { JobID: id }
              })
                .then(num => {
                  if (num == 1) {
                    res.send({
                      message: "Job was deleted successfully!"
                    });
                  } else {
                    res.send({
                      message: `Cannot delete job with id=${id}. Maybe job was not found!`
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).send({
                    message: "Could not delete job with id=" + id + " " + err
                  });
                });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              message: "Could not delete jobskills with id=" + id + " " + err
            });
          });

        
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete JobLocation with id=" + id + " " + err
      });
    });

  
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
  dbJob.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Jobs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all jobs."
      });
    });
};

