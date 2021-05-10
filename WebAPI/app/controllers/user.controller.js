const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// log the user in
exports.login = async (req, res) => {
  const { username, password } = req.query;

  const user = await db.users.findOne({ where: { username } });

  if (!user) {
    throw new Error(username + ' not found in the database');
  }

  if (await comparePassword(password, user.dataValues.Password)) {
    const token = jwt.sign({ sub: user.userId }, 'secret', { expiresIn: '7d' });
    res.status(200).send({ 'uid': user.get().UserId, token });
  }
  else {
    throw new Error('invalid password');
  }
};

exports.updateUser = async (req, res) => {
  const {Username, FirstName, LastName, City, State} = req.body;
  // console.log(req.body)

  try {
    const user = await db.users.findOne({ where: {Username} });
    if (user) {
      await user.update({ FirstName, LastName, Username });
      
      const location = await db.locations.findOne({
        where:  {
          city: City,
          state: State
        }
      });
      console.log(City)
      console.log(State)

      if (location) {
        const userlocation = await db.userlocation.findOne({ where: user.get().UserId });
        await userlocation.update({
          LocationId: location.LocationId
        });
      }
    }
  }
  catch (error) {
    console.log('error while updating database: ' + error);
    res.status(204).send({ message: 'error while updating database: ' + error});
  }

  res.sendStatus(200);
}

exports.register = async (req, res) => {
  console.log('user.controller register');
  const {username, firstName, lastName, password, confirmPassword, city, state} = req.body;
  if (!username) {
    res.status(449).send({ message: 'username cannot be blank'});
    // throw new Error('username cannot be blank');
  }
  if (!firstName) {
    // throw new Error('first name cannot be blank');
    res.status(449).send({ message: 'first name cannot be blank'});
  }
  if (!password) {
    // throw new Error('password cannot be blank');
    res.status(449).send({ message: 'password cannot be blank'});
  }
  if (password !== confirmPassword) {
    // throw new Error('password does not match confirm password field');
    res.status(449).send({ message: 'password does not match confirm password field'});
  }

  let user = await db.users.findOne({ where: { username } });
  if (user) {
    res.status(449).send({ message: 'username taken, pick another one'});
  }

  // create user
  user = await db.users.create({
    UserName: username,
    FirstName: firstName,
    LastName: lastName,
    Password: await hashPassword(password),
    RoleId: 1
  });

  // determine location id
  if (city != '' && state != '') {
    const location = await db.locations.findOne({
      where:  {
        city: city,
        state: state
      }
    });
    // console.log(location);

    // add entry to userlocation
    if (location) {
      const userLocation = await db.userlocation.create({
        UserId: user.get().UserId,
        LocationId: location.LocationId
      });
    }
    else {
      res.status(449).send({ message: 'unknown city and state'});
    }
  }


  const token = jwt.sign({ sub: user.get().UserId }, 'secret', { expiresIn: '7d' });
  res.status(200).send({ 'uid': user.get().UserId, token });
}

exports.changePassword = async (req, res) => {
  console.log('user.controller changePassword');
  const { uid, password } = req.body;
  console.log(uid);
  console.log(password);
  const user = await db.users.findOne({ where: { UserId: uid } });

  if (user) {
    await user.update({ Password: await hashPassword(password) });
    res.sendStatus(200);
  }
}

exports.authenticate = async (req, res) => {
  console.log('user.controller authenticate')
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      console.log('access denied');
      res.sendStatus(403)
    }
    else {
      res.status(200).json({ message: 'successfully accessed account page'});
      console.log('successfully accessed account page');
      // console.log(authData);
    }
  });
}

exports.getUserById = async (req, res) => {
  console.log('getUserById');
  const { uid } = req.query;
  const user = await db.users.findOne({ where: { UserId: uid } });

  let userData = {
    FirstName: '',
    LastName: '',
    Username: '',
    City: '',
    State: '',
    LocationId: ''
  }

  if (user) {
    userData = {
      ...userData, 
      FirstName: user.get().FirstName,
      LastName: user.get().LastName,
      Username: user.get().UserName,
    }

    // find user's location
    const userlocation = await db.userlocation.findOne({
      where:  {
        UserId: user.get().UserId
      }
    });

    if (userlocation) {
      location = await db.locations.findOne({
        where: {
          LocationId: userlocation.get().LocationId
        }
      });

      userData = {
        ...userData, 
        City: location.get().City,
        State: location.get().State,
        LocationId: userlocation.get().LocationId,
      }
    }
    
    res.status(200).send({ userData });
  }
  else {
    res.status(449).send({ message: 'unknown user'});
  }
}


const hashPassword = async(password, saltRounds=10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err);
  }
  return null;
}

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.log(err);
  }
  return false;
}