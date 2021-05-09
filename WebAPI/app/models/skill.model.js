module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("skills", {
    SkillId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    SkillName: {
      type: Sequelize.STRING
    },
  },
  {
    tableName: 'skills',
    timestamps: false
  });

  return Skill;
};
