const express = require('express');
const { register, login, logout, forgotpassword, resetpassword, userDetail } = require('../controllers/user.js');
const { authenticationMid } = require('../middleware/auth.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotpassword);
router.post('/reset/:token', resetpassword);
router.get('/me',authenticationMid, userDetail);

module.exports = router;
