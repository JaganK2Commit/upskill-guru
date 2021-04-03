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