const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users_tbl(firstName, lastName, gender, email, password, darkMode) values(?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.darkMode || false,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsersByUserId: (email, callBack) => {
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
    if (data.firstName) updates.push(`firstName = ${data.firstName}`);
    if (data.lastName) updates.push(`lastName = ${data.lastName}`);
    if (data.darkMode) updates.push(`darkMode = ${data.darkMode}`);
    if (data.email) updates.push(`email = ${data.email}`);
    if (data.gender) updates.push(`gender = ${data.gender}`);

    pool.query(
      `update users_tbl set ${updates.join(', ')} where user_id=${id}`,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
