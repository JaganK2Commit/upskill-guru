// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('../app/models');

module.exports = authorize;

function authorize(req, res, next) {
  // req.headers.authorization
  const bearerHeader = req.headers.authorization;
  // console.log(req.headers)
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    // console.log(bearerToken);
    req.token = bearerToken;
    next();    
  }
  else {
    res.sendStatus(403);
  }
}