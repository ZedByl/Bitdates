const Event = require('../models/event');
const Coin = require('../models/coin');
const axios = require('axios');
const helper = require('../helpers/getQuery');

// Создание события
exports.createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            proof,
            date_event,
            categories,
        } = req.body;

        // Validate required fields
        if (!title || !categories || !date_event) {
            return res.status(400).json({ message: 'Поля title, category и eventDate обязательны' });
        }

        // Handle `image` file
        const imageUrl = req.file ? req.file.path : null;

        let parsedCategories;
        try {
            parsedCategories = JSON.parse(categories); // Convert stringified JSON to array
            if (!Array.isArray(parsedCategories)) {
                throw new Error('Categories must be an array');
            }
        } catch (err) {
            return res.status(400).json({ message: 'Invalid categories format', error: err.message });
        }

        // Create new event
        const newEvent = new Event({
            title: { en: title },
            description: { en: description },
            categories: parsedCategories,
            date_event,
            proof,
            image_url: imageUrl,
        });

        // Save to database
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Ошибка при создании события:', error);
        res.status(500).json({ message: 'Ошибка при создании события', error: error.message });
    }
};


exports.getEvents = async (req, res) => {
    try {
        const query = helper.queryHelper(req.query);
        const { q, categories, coins, dateEvent, dateRangeStart, dateRangeEnd } = req.query

        // Построение фильтров
        let filter = {};

        if (categories) {
            filter.categories = {
                $elemMatch: { id: categories }
            }
        }

        if (coins) {
            filter.coins = {
                $elemMatch: { id: coins }
            }
        }

        if (dateEvent) {
            filter.date_event = dateEvent;
        }

        if (dateRangeStart && dateRangeEnd) {
            filter.date_event = {
                $gte: dateRangeStart,
                $lte: dateRangeEnd
            };
        }

        // if (q) {
        //     filter.title = { $regex: q, $options: 'i' };
        // }

        const response = await axios.get(`https://developers.coinmarketcal.com/v1/events${query}`, {
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'deflate, gzip',
                'x-api-key': 'kJY4DZVcgH9vEmgyBIFAT8RICqPHDr9z8R34Cbo3'
            },
        });

        const eventsApi = response.data.body || []
        const eventsDb = await Event.find(filter).sort({ date_event: 1 });

        const combinedEvents = [...eventsApi, ...eventsDb];

        const sortedEvents = combinedEvents.sort((a, b) => {
            return new Date(a.date_event) - new Date(b.date_event);
        });

        res.status(200).json({ body: sortedEvents });
    } catch (error) {
        res.status(500).json({message: 'Ошибка при получении событий', error});
    }
};


exports.getExternalEvents = async (req, res) => {
    try {
        const query = helper.queryHelper(req.query);
        const response = await axios.get(`https://developers.coinmarketcal.com/v1/events${query}`, {
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'deflate, gzip',
                'x-api-key': 'kJY4DZVcgH9vEmgyBIFAT8RICqPHDr9z8R34Cbo3'
            },
        });

        //res.status(200).json(response.data);

        //const result = await transformAndSaveData(response.data.body)
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе к стороннему API:', error);
        res.status(error.status).json({error: error.statusText || 'Ошибка при запросе к стороннему API'});
    }
}


exports.clearEvents = async (req, res) => {
    const result = await Event.deleteMany({});
    res.status(200).json(result);
}


const transformAndSaveData = async (data) => {
    try {
        for (const eventData of data) {

            const coinIds = await Promise.all(eventData.coins.map(async (coinData) => {
                let coin = await Coin.findOne({id: coinData.id});

                if (!coin) {
                    coin = new Coin({
                        name: coinData.name,
                        symbol: coinData.symbol,
                        rank: coinData.rank,
                        fullname: coinData.fullname
                    });
                    await coin.save();
                }

                return coin._id;
            }));

            const newEvent = new Event({
                title: eventData.title.en,
                category: eventData.categories,
                eventDate: new Date(eventData.date_event),
                description: eventData.description?.en??"",
                eventLink: eventData.source,
                imageUrl: eventData.proof,
                coins: coinIds
            });

            await newEvent.save();

            console.log(`Event "${newEvent.title}" saved successfully.`);
        }
        return true;
    } catch (error) {
        console.error('Error transforming and saving data:', error);
    }
}
