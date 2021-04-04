const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://cs411upskillguru_admin:admin123admin@mongodbcluster.jjvj7.mongodb.net/cs411upskillguru_mongodb?retryWrites=true&w=majority";

let client;
let db;
const dbName = 'cs411upskillguru_mongodb';
const collectionName = 'favorites';
const connect = async () => {
  const client = await new MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(dbName);
}

const disconnect = () => {
  client.close();
}

connect();

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// const getPagingData = (data, page, limit) => {
//   const { count: totalItems, rows: skills } = data;
//   const currentPage = page ? +page : 0;
//   const totalPages = Math.ceil(totalItems / limit);

//   return { totalItems, skills, totalPages, currentPage };
// };


// Update a favorite by the id in the request
exports.create = async (req, res) => {
  try{
      // Create a Favorite
  const favorite = {
    name: req.body.name,
    jobTitle : req.body.jobTitle,
    location: req.body.location
  };

  const result = await db.collection(collectionName).insertOne(favorite);
  res.send({
    message: result.ops[0]
  });
  }
  catch(err){
    res.status(500).send({
      message: "Error inserting Favorite " + req.body
    });
  }
};

// Retrieve all Favorites from the database.
exports.findAll = async (req, res) => {

  try {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  const favorites = await db.collection(collectionName).find(condition)
  //.skip(parseInt(offset, 10))
  //.limit(parseInt(count, 10))
  .toArray();

  //const favorites = getPagingData(data, page, limit);
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

// Update a favorite by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try{
  await db.collection(collectionName).updateOne( {_id: ObjectId(req.body._id)},
  {$set: {
    name : req.body.name,
    jobTitle: req.body.jobTitle,
    location : req.body.location
  }});
  res.send({
    message: "Favorite was updated successfully."
  });
  }
  catch(err){
    res.status(500).send({
      message: "Error updating Favorite with id=" + id
    });
  }
};

// Delete a Favorite with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try{
    await db.collection(collectionName).deleteOne( {_id: ObjectId(id)});
    res.send({
      message: "Favorite was deleted successfully."
    });
    }
    catch(err){
      res.status(500).send({
        message: "Could not delete Skill with id=" + id
      });
    }
};
