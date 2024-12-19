const express = require('express');
const router = express.Router();
const multer = require('multer');
const eventController = require('../controllers/eventController');
const {generateRandomFileName} = require("../helpers/getRandomFileName");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, generateRandomFileName(file.originalname));
    }
})
const upload = multer({ storage });

// Маршрут для создания события
router.post('/create', upload.single('image'), eventController.createEvent);

// Маршрут для получения событий с фильтрацией
router.get('/', eventController.getEvents);

router.get('/external-events', eventController.getExternalEvents)

router.get('/clear-events', eventController.clearEvents);

module.exports = router;
