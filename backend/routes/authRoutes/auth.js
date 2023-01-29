const express = require('express');
const authController = require('../../controllers/authController/auth');
const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/signin', authController.loginUser);
router.patch('/update-user/:id', authController.updateUserDetails);
router.post('/find-account', authController.findAccount);
router.patch('/forgotPassword', authController.forgotPassword);
router.post('/resend-otp', authController.resendOtp);
router.post('/verify-OTP', authController.verifyOtp);
module.exports = router;
