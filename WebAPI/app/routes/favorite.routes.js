module.exports = app => {
  const favorites = require("../controllers/favorite.controller.js");

  var router = require("express").Router();

  // Create a new Favorite
  router.post("/", favorites.create);

  // Retrieve all favorites
  router.get("/", favorites.findAll);

  // Update a Favotire with id
  router.put("/:id", favorites.update);

  // Delete a Favorite with id
  router.delete("/:id", favorites.delete);

  app.use('/api/favorites', router);
};
