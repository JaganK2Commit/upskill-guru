module.exports = app => {
  const favorites = require("../controllers/favorite.controller.js");

  var router = require("express").Router();

  // Create a new Favorite
  router.post("/", favorites.create);

  // Retrieve all favorites
  router.get("/", favorites.findAll);

  // Retrieve a single Favorite with id
  router.get("/:id", favorites.findOne);

  // Update a Favotire with id
  router.put("/:id", favorites.update);

  // Delete a Favorite with id
  router.delete("/:id", favorites.delete);

  // Delete all Favoties
  router.delete("/", favorites.deleteAll);

  app.use('/api/favorites', router);
};
