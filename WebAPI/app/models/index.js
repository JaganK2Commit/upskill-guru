const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.skills = require("./skill.model.js")(sequelize, Sequelize);
db.jobs = require("./job.model.js")(sequelize, Sequelize);
db.joblocation = require("./joblocation.model.js")(sequelize, Sequelize);
db.jobskills = require("./jobskills.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.locations = require("./locations.model.js")(sequelize, Sequelize);
db.userlocation = require("./userlocation.model.js")(sequelize, Sequelize);
db.userskills = require("./userskills.model.js")(sequelize, Sequelize);

module.exports = db;
