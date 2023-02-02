const pool = require('../../config/database');

module.exports = {
  createTodo: (data, callBack) => {
    pool.query(
      `insert into todo_tbl(title, description, created_at, updated_at, user_id, email) values(?,?,?,?,?,?)`,
      [
        data.title,
        data.description,
        data.created_at || null,
        data.updated_at || null,
        data.user_id,
        data.email,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllTodo: (email, callBack) => {
    pool.query(
      `select * from todo_tbl where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
