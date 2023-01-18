const { verify } = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (token) {
    verify(token, process.env.JSON_SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(400).json('Invalid token');
      } else {
        next();
      }
    });
  } else {
    res.status(403).json('Unauthorized user');
  }
};
