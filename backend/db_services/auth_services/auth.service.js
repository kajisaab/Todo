const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users_tbl(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.darkmode || false,
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
};
