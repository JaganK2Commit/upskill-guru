const jwt = require('express-jwt');
const db = require('../app/models');

module.exports = authorize;

function authorize() {
  return [
    jwt({ secret: 'secret', algorithms: ['HS256'] }),
    async (req, res, next) => {
      const user = await db.users.findByPk(req.user.sub);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user.get();
      next();
    }
  ]
}