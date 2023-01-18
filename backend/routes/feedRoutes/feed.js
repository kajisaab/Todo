const express = require('express');
const feedController = require('../../controllers/feedController/feed');
const { checkToken } = require('../../utils/validate_token');

const router = express.Router();

router.get('/posts', checkToken, feedController.getPosts);
router.post('/createPost', feedController.createPost);

module.exports = router;
