module.exports = (sequelize, Sequelize) => {
  const Jobs = sequelize.define("jobs", {
    JobID: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    JobTitle: {
      type: Sequelize.STRING
    },
    EmployerName: {
      type: Sequelize.STRING
    },
    CreatedBy: {
      type: Sequelize.INTEGER
    },
    CreatedDate: {
      type: Sequelize.DATE
    },
    UpdatedBy: {
      type: Sequelize.INTEGER
    },
    UpdatedDate: {
      type: Sequelize.DATE
    },
    JobDescription: {
      type: Sequelize.STRING
    },
  },{
    tableName: 'jobs',
    timestamps: false
  });

  return Jobs;
};