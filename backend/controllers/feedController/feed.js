const { create } = require('../../db_services/post_services/post.service');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post' }],
  });
};

exports.createPost = (req, res, next) => {
  const body = req.body;
  // Create post in db
  create(body, (error, results) => {
    if (error) {
      return res.status(400).json('unknown error');
    }
    return res.status(200).json('successfully created post');
  });
};
