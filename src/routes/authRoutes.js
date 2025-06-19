const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.post('/verify-otp', authController.verifyOtp);
router.get('/otps', authController.getOtps);
router.post('/content-with-sports-events', authController.getContentWithSportsEvents);
module.exports = router;
