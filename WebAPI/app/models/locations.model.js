module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    LocationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    City: {
      type: Sequelize.STRING
    },
    State: {
      type: Sequelize.STRING
    },
    Latitude: {
      type: Sequelize.STRING
    },
    Longitude: {
      type: Sequelize.STRING
    }
  });

  return Location;
};