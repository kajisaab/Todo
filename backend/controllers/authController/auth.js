const { create } = require('../../db_services/auth_services/auth.service');
const { genSaltSync, hashSync } = require('bcrypt');

exports.createUser = (req, res, next) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  create(body, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: 'Database connection error',
      });
    }
    return res.status(200).json('successfully created user');
  });
};
