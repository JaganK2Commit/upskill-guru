const jwt = require('jsonwebtoken');
const db = require('../app/models');

module.exports = authorize;

function authorize(req, res, next) {
  // req.headers.authorization
  const bearerHeader = req.headers.authorization;
  // console.log(bearerHeader)
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    // console.log(bearerToken);
    req.token = bearerToken;
    // console.log('access granted');
    next();    
  }
  else {
    console.log('access forbidden for ' + req.uid);
    res.sendStatus(403);
  }
}