const {
  create,
  getUsersByUserId,
} = require('../../db_services/auth_services/auth.service');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

// signup user

exports.createUser = async (req, res, next) => {
  const body = req.body;
  const email = req.body.email;
  const password = req.body.password;
  if (password.length < 8) {
    return res.status(400).json('Password must have minimum 8 character');
  }
  getUsersByUserId(email, (err, results) => {
    if (results) {
      res.status(400).json('User with this email already exists');
    }
  });
  body.password = await bcrypt.hash(body.password, 10);
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

// login user api

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  getUsersByUserId(email, async (err, results) => {
    if (err) {
      return res.status(400).json('Something went wrong');
    }
    if (!results) {
      return res.status(400).json('Invalid email or password');
    }

    const result = await bcrypt.compare(password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.JSON_SECRET_KEY, {
        expiresIn: '1h',
      });
      return res.status(200).json({
        token: jsontoken,
        userDetails: {
          firstName: results.firstName,
          lastName: results.lastName,
          email: results.email,
          gender: results.gender,
        },
      });
    } else {
      return res.status(400).json('Invalid email or password');
    }
  });
};
