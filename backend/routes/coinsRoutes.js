const express = require("express");
const coinsController = require("../controllers/coinsController");
const router = express.Router();


router.get('/get-coins', coinsController.getCoins);


module.exports = router;