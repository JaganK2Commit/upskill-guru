module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("skill", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Skill;
};
