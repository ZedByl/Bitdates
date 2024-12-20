const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email'],
	successRedirect: `${process.env.WEB_URL}/api/auth/google/callback`
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.login);

router.get('/logout', authController.logout);

module.exports = router;
