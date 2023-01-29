const {
  create,
  getUsersByUserId,
  getUsersByUserEmail,
  updateIndividual,
  addOtp,
  getOtpByEmail,
  updateOtp,
} = require('../../db_services/auth_services/auth.service');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const mailConfig = require('../../config/mail');
const jwtDecode = require('jwt-decode');

// signup user

exports.createUser = async (req, res, next) => {
  const body = req.body;
  const email = req.body.email;
  const password = req.body.password;
  if (password.length < 8) {
    return res.status(400).json('Password must have minimum 8 character');
  }
  getUsersByUserEmail(email, (err, results) => {
    if (results) {
      res.status(400).json('User with this email already exists');
    }
  });
  body.password = await bcrypt.hash(body.password, 10);
  create(body, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: error.sqlMessage,
      });
    }
    let otpCode = Math.floor(Math.random() * 10000 + 1);
    const hashedOtpCode = sign(
      { otpCode, expiryTime: new Date().getTime() + 5 * 60 * 1000 },
      process.env.JSON_SECRET_KEY,
      {
        expiresIn: new Date().getTime() + 5 * 60 * 1000,
      }
    );
    const data = {
      otpCode: hashedOtpCode,
      email: results.email,
      user_id: results.user_id,
    };
    addOtp(data, async (error, result) => {
      if (error) {
        return res.status(500).json('Could not create user');
      }
      await mailConfig.sendMail({
        from: `Aman Khadka <amankhadka0115@gmail.com>`,
        to: results.email,
        subject: 'OTP Verification<noreply>',
        html: `
      <table align="center" border = "0" cellpadding = "0" cellspacing = "0" width = "350" bgcolor = "white">
    <tbody>
    <tr style = 'height: 40px'>
    </tr>
     <tr >
       <td style = 'padding-left: 10px; font-size: 25px; font-weight: bold'>
    Verify your Sign Up!
    </td>
    </tr>
     <tr>
    <td style = 'padding-left: 10px; padding-top:30px'>
    Below is your one time passcode: 
    </td>
    </tr>
     <tr>
    <td style = 'padding-left: 10px; padding-top:30px'>
      <div style = 'padding: 10px; border-radius:10px;width:100px; height: 30px; display:flex ; align-items: center; justify-content: center; letter-spacing: 2px; font-size: 25px; background-color: lightgray'>${otpCode} </div> 
    </td>
    </tr>
       <tr>
         <td style = 'padding-left: 10px; padding-top:30px; line-height: 25px '>
    We're here to help if you need it. Contact Aman Khadka for further assessment. 
    </td>
    </tr>
        <tr>
         <td style = 'padding-left: 10px; padding-top:30px; line-height: 25px '>
           <strong>Note:</strong> Passcode is only valid up to 5 minutes.
    </td>
    </tr>
      `,
      });
      return res.status(200).json('Please check your email for verification');
    });
  });
};

exports.resendOtp = (req, res, next) => {
  const email = req.body.email;
  getOtpByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json('Sql Error');
    }
    let otp_code = Math.floor(Math.random() * 1000000 + 1);
    const hashedOtpCode = sign(
      { otp_code, expiryTime: new Date().getTime() + 5 * 60 * 1000 },
      process.env.JSON_SECRET_KEY
    );
    updateOtp(
      results.otp_id,
      { otpCode: hashedOtpCode },
      async (err, results) => {
        if (err) {
          return res.status(500).json('Sql Error');
        }
        await mailConfig.sendMail({
          from: `Aman Khadka <amankhadka0115@gmail.com>`,
          to: email,
          subject: 'OTP Verification<noreply>',
          html: `
      <table align="center" border = "0" cellpadding = "0" cellspacing = "0" width = "350" bgcolor = "white">
    <tbody>
    <tr style = 'height: 40px'>
    </tr>
     <tr >
       <td style = 'padding-left: 10px; font-size: 25px; font-weight: bold'>
    Verify your Sign Up!
    </td>
    </tr>
     <tr>
    <td style = 'padding-left: 10px; padding-top:30px'>
    Below is your one time passcode: 
    </td>
    </tr>
     <tr>
    <td style = 'padding-left: 10px; padding-top:30px'>
      <div style = 'padding: 10px; border-radius:10px;width:100px; height: 30px; display:flex ; align-items: center; justify-content: center; letter-spacing: 2px; font-size: 25px; background-color: lightgray'>${otp_code} </div> 
    </td>
    </tr>
       <tr>
         <td style = 'padding-left: 10px; padding-top:30px; line-height: 25px '>
    We're here to help if you need it. Contact Aman Khadka for further assessment. 
    </td>
    </tr>
        <tr>
         <td style = 'padding-left: 10px; padding-top:30px; line-height: 25px '>
           <strong>Note:</strong> Passcode is only valid up to 5 minutes.
    </td>
    </tr>
      `,
        });
        return res.status(200).json('Please check your email for verification');
      }
    );
  });
};

exports.verifyOtp = (req, res, next) => {
  const otp = req.body.otp;
  const email = req.body.email;
  getOtpByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json('Sql error');
    }
    const { otpCode } = results;
    const data = jwtDecode(otpCode);
    const { expiryTime, otp_code } = data;
    if (otp_code !== otp || expiryTime - new Date().getTime() < 0) {
      return res.status(400).json('OTP expired');
    }
    updateIndividual(
      results.user_id,
      { isVerified: 'true' },
      (err, results) => {
        if (err) {
          return res.status(500).json('SQL error');
        }
        return res.status(200).json('Successfully Verfied User');
      }
    );
  });
};

// login user api

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  getUsersByUserEmail(email, async (err, results) => {
    if (err) {
      return res.status(400).json('Something went wrong');
    }
    if (!results) {
      return res.status(400).json('Invalid email or password');
    }

    if (!results.isVerified) {
      return res.status(400).json('User is not verified');
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
          user_id: results.user_id,
          firstName: results.firstName,
          lastName: results.lastName,
          email: results.email,
          gender: results.gender,
          darkMode: results.darkMode ? true : false,
        },
      });
    } else {
      return res.status(400).json('Invalid email or password');
    }
  });
};

exports.updateUserDetails = (req, res, next) => {
  const token = req.body?.token;
  const id = Number(req.params.id);

  if (token) {
    return res.status(400).json('Token cannot be updated');
  }
  updateIndividual(id, req.body, (err, results) => {
    if (err) {
      return res.status(500).json('Sql error');
    }
    getUsersByUserId(id, (err, results) => {
      if (err) {
        return res.status(500).json('Sql error');
      }
      const { password, token, ...restData } = results;
      return res.status(200).json({
        firstName: restData.firstName,
        lastName: restData.lastName,
        user_id: restData.user_id,
        email: restData.email,
        gender: restData.gender,
        darkMode: restData.darkMode ? true : false,
      });
    });
  });
};

exports.findAccount = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  getUsersByUserEmail(email, async (err, results) => {
    if (err) return res.status(400).json(`DB error`);
    if (!results) return res.status(400).json(`No User found with ${email}`);

    const hashedToken = sign(
      { result: results.email },
      process.env.JSON_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    const link = `http://localhost:3000/reset-password/${results.user_id}/${hashedToken}`;

    await mailConfig.sendMail({
      from: `Aman Khadka <amankhadka0115@gmail.com>`,
      to: email,
      subject: 'Reset Password<noreply>',
      html: `
      <p>Please click the following link to reset your password <a href = ${link}>Reset Password </a></p>
      <br></br>
      <p>Aman Khadka</p>
      `,
    });

    return res.status(200).json('Successfully sent reset link to mail');
  });
};

exports.forgotPassword = (req, res, next) => {
  const body = req.body;
  const token = req.headers['x-auth-token'];
  const data = jwtDecode(token);
  const { result: email } = data;

  getUsersByUserEmail(email, async (err, results) => {
    if (err) return res.status(400).json(`DB error`);

    if (!results) return res.status(400).json(`No User found with ${email}`);

    if (body.password) {
      if (body.password == results.password) {
        return res.status(400).json('Cannot update with same password');
      }
      if (body.password.length < 8) {
        return res.status(400).json('Password must have minimum 8 character');
      }
      body.password = await bcrypt.hash(body.password, 10);
      updateIndividual(results.user_id, body, (err, results) => {
        if (err) {
          return res.status(400).json('Sql error');
        }
        return res.status(200).json('Successfully updated password');
      });
    }
  });
};
