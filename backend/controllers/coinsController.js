const {get} = require("axios");
const Coin = require('../models/coin');


exports.getCoins = async (req, res) => {
    try {
        const response = await get('https://developers.coinmarketcal.com/v1/coins', {
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'deflate, gzip',
                'x-api-key': 'ikb0u7ihz65kAtGmJF3FD62vQniaUORo8xNos5cd'
            }
        });

        const data = response.data.body;

        const createResult = await Coin.insertMany(data);

        res.json(createResult);
    } catch (error) {
        console.error('Ошибка при запросе к стороннему API:', error);
        res.status(500).json({error: 'Ошибка при запросе к стороннему API'});
    }
}
