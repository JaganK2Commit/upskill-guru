const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cs411upskillguru_admin:admin123admin@mongodbcluster.jjvj7.mongodb.net/cs411upskillguru_mongodb?retryWrites=true&w=majority";

let client;
let db;
const dbName = 'cs411upskillguru_mongodb';
const collectionName = 'favorites';
const connect = async () => {
  const client = new MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(dbName);
}

const disconnect = async () => {
  client.close();
}


const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: skills } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, skills, totalPages, currentPage };
};

// Create and Save a new Favorite
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Favorite
  const favorite = {
    title: req.body.title,
    location: req.body.location
  };

  // Save Skill in the database
  db.collection(collectionName).insertOne(favorite)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Favoite."
      });
    });
};

// Retrieve all Skills from the database.
exports.findAll = async (req, res) => {
  try {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  const favorites = await db.collection(collectionName).find(condition).skip(parseInt(offset, 10))
  .limit(parseInt(count, 10))
  .toArray();

  const favorites = getPagingData(data, page, limit);
  res.send(favorites);
  }
  catch(err)
  {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving skills."
    });
  }
};

// Find a single Skill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  dbSkill.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Skill with id=" + id
      });
    });
};

// Update a Skill by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  dbSkill.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Skill was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Skill with id=${id}. Maybe Skill was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Skill with id=" + id
      });
    });
};

// Delete a Skill with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  dbSkill.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Skill was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Skill with id=${id}. Maybe Skill was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Skill with id=" + id
      });
    });
};

// Delete all Skills from the database.
exports.deleteAll = (req, res) => {
  dbSkill.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Skills were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all skills."
      });
    });
};

// find all published Skill
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  dbSkill.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skills."
      });
    });
};
