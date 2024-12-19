const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.post('/', subscriptionController.setEmail);

module.exports = router;
