const express = require('express');
const authController = require('../../controllers/authController/auth');
const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/signin', authController.loginUser);
router.patch('/update-user/:id', authController.updateUserDetails);
module.exports = router;
