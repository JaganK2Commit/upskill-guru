module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    UserName: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    FirstName: {
      type: Sequelize.STRING
    },
    LastName: {
      type: Sequelize.STRING
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    RoleId: {
      type: Sequelize.INTEGER
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
}