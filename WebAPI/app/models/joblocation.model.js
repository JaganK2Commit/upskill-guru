module.exports = (sequelize, Sequelize) => {
  const JobLocation = sequelize.define("joblocation", {
    JobId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    LocationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },{
    tableName: 'joblocation',
    timestamps: false
  });

  return JobLocation;
};
