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

  sequelize.models.users;

  User.authenticate = async function(username, password) {
    // console.log('username', username, 'password', password);
    const users = await User.findOne({ where: { username } });
    console.log(users.dataValues);
    console.log("user: ", users.dataValues.UserName, " pass:", users.dataValues.Password);
    if (password === users.dataValues.Password) {
      return users.authorize();
    }

    throw new Error('invalid password');
  }

  return User;
}