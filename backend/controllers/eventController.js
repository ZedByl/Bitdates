const Event = require('../models/event');
const Coin = require('../models/coin');
const axios = require('axios');
const helper = require('../helpers/getQuery');

// Создание события
exports.createEvent = async (req, res) => {
    try {
        const {title, category, eventDate, description, eventLink, imageUrl} = req.body;

        if (!title || !category || !eventDate) {
            return res.status(400).json({message: 'Поля title, category и eventDate обязательны'});
        }

        const newEvent = new Event({
            title,
            category,
            eventDate,
            description,
            eventLink,
            imageUrl
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Ошибка при создании события:', error);  // Выводим ошибку в консоль
        res.status(500).json({message: 'Ошибка при создании события', error: error.message});
    }
};

exports.getEvents = async (req, res) => {
    try {
        const {eventDate, startDate, endDate, category, q} = req.query;

        // Построение фильтров
        let filter = {};

        // Фильтр по категории
        if (category) {
            filter.category = {
                $elemMatch: { id: Number(category) } // или { id: Number(category) } если фильтр по id
            };
        }

        // Фильтр по конкретной дате
        if (eventDate) {
            filter.eventDate = new Date(eventDate);
        }

        // Фильтр по диапазону дат
        if (startDate && endDate) {
            filter.eventDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (q) {
            filter.title = { $regex: q, $options: 'i' };
        }


        const events = await Event.find(filter).populate("coins").sort({eventDate: 1});
        res.status(200).json(events);
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
