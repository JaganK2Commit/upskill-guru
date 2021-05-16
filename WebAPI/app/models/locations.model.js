module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define(
    "locations",
    {
      LocationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      City: {
        type: Sequelize.STRING,
      },
      State: {
        type: Sequelize.STRING,
      },
      Latitude: {
        type: Sequelize.STRING,
      },
      Longitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "locations",
      timestamps: false,
    }
  );

  return Location;
};
