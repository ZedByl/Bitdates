const express = require('express');
const authenticateUser = require('../middlewares/validateToken');
const {createSubscription} = require("../controllers/userController");

const router = express.Router();

router.get('/me', authenticateUser, (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        message: 'OK!'
    });
});

router.post('/subscribe', authenticateUser, createSubscription)

module.exports = router;