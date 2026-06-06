const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/force-reset-password', authController.forceResetPassword);

module.exports = router;
