module.exports = (sequelize, Sequelize) => {
  const UserSkills = sequelize.define("userskills", {
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    SkillId: {
      type: Sequelize.INTEGER
    }
  }, {
    tableName: 'userskills',
    timestamps: false
  });

  return UserSkills;
};