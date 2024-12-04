const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Маршрут для создания события
router.post('/create', eventController.createEvent);

// Маршрут для получения событий с фильтрацией
router.get('/', eventController.getEvents);

router.get('/external-events', eventController.getExternalEvents)

router.get('/clear-events', eventController.clearEvents);

module.exports = router;
