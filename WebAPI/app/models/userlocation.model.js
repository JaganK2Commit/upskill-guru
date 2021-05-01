module.exports = (sequelize, Sequelize) => {
  const UserLocations = sequelize.define("userlocations", {
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    LocationId: {
      type: Sequelize.INTEGER
    }
  }, {
    tableName: 'userlocation',
    timestamps: false
  });

  return UserLocations;
};