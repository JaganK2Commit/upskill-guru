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
    console.log('success!');
    // exclude password
    // const { Password, ...userData } = user.get();
    // console.log({ ...userData, token })
    // res.status(200).send({ ...userData, token });
    // console.log(userData);
    res.status(200).send({ 'uid': user.get().UserId, token });
    // res.send({ token });
  }
  else {
    throw new Error('invalid password');
  }
};

exports.register = async (req, res) => {
  const {username, firstName, lastName, password, confirmPassword} = req.body;
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
  const locationId = await db.userlocations.findOne({ 
    where: city 
  });

  // add entry to userlocation

  const token = jwt.sign({ sub: user.userId }, 'secret', { expiresIn: '7d' });
  res.status(200).send({ 'uid': user.get().UserId, token });
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