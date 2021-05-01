const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const auth = require("./middleware/authorize.js");

const app = express();

var corsOptions = {
  // origin: "http://localhost:8081",
  // origin: "https://cs411upskillguru.web.illinois.edu",
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  console.log('welcome');
  res.json({ message: "Welcome to UpSkill-Guru." });
});

// app.use('/api/account', (req, res) => {
//   console.log('your account');
//   res.json({ message: 'Your account '});
// })

require("./app/routes/skill.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/favorite.routes")(app);
require("./app/routes/search.routes")(app);
require("./app/routes/location.routes")(app);

// app.use(auth);
// app.get('/api/account', auth, (req, res) => {
//   // console.log(req.token)
//   jwt.verify(req.token, 'secret', (err, authData) => {
//     if (err) {
//       console.log('access denied');
//       res.sendStatus(403)
//     }
//     else {
//       res.status(200).json({ message: 'successfully accessed account page'});
//       console.log('successfully accessed account page');
//       // console.log(authData);
//     }
//   })
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.listen();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});