const express = require('express');
const feedController = require('../../controllers/feedController/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.post('/createPost', feedController.createPost);

module.exports = router;
