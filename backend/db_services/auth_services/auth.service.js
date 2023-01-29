const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users_tbl(firstName, lastName, gender, email, password, darkMode, isVerified) values(?,?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.darkMode || false,
        data.isVerified || false,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, {
          email: data.email,
          user_id: results.insertId,
        });
      }
    );
  },

  addOtp: (data, callBack) => {
    pool.query(
      `insert into otp_tbl(otpCode, user_id, email) values(?,?,?)`,
      [data.otpCode, data.user_id, data.email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getOtpByEmail: (email, callBack) => {
    pool.query(
      `select * from otp_tbl where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateOtp: (id, data, callBack) => {
    pool.query(
      `update otp_tbl set otpCode = ${JSON.stringify(
        data.otpCode
      )} where otp_id = ${id}`,
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results);
      }
    );
  },

  getUsersByUserId: (id, callBack) => {
    pool.query(
      `select * from users_tbl where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUsersByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users_tbl where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateIndividual: (id, data, callBack) => {
    const updates = [];
    if (data.firstName)
      updates.push(`firstName = ${JSON.stringify(data.firstName)}`);
    if (data.lastName)
      updates.push(`lastName = ${JSON.stringify(data.lastName)}`);
    if (data.darkMode)
      updates.push(`darkMode = ${data.darkMode === 'true' ? true : false}`);
    if (data.email) updates.push(`email = ${JSON.stringify(data.email)}`);
    if (data.gender) updates.push(`gender = ${JSON.stringify(data.gender)}`);
    if (data.password)
      updates.push(`password = ${JSON.stringify(data.password)}`);
    if (data.isVerified)
      updates.push(`isVerified = ${data.isVerified === 'true' ? true : false}`);

    pool.query(
      `update users_tbl set ${updates.join(', ')} where user_id = ${id}`,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
