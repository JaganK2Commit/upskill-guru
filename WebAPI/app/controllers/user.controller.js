const db = require("../models");
const dbUsers = db.users;
const Op = db.Sequelize.Op;

// log the user in
exports.login = (req, res) => {
  const { username, password } = req.query;
  
  // console.log(req.query);

  dbUsers.authenticate(username, password)
    .then(data => { res.send(data)})
    .catch(err => {
      console.log("err:" + err);
      res.status(400).send({
        message: "Error authenticating user"
      });
    });
};