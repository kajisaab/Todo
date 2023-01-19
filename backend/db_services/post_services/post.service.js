const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into post_tbl(postName, postAddress, postType) values(?,?,?)`,
      [data.postName || null, data.postAddress || null, data.postType || null],

      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, results);
      }
    );
  },
};
