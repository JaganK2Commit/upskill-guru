module.exports = (sequelize, Sequelize) => {
  const JobLocation = sequelize.define(
    "jobskills",
    {
      JobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      SkillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "jobskills",
      timestamps: false,
    }
  );

  return JobLocation;
};
