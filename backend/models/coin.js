const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String},
    symbol: {type: String},
    fullname: {type: String},
    hot_index: {type: Number},
    trending_index: {type: Number},
    significant_index: {type: Number},
    upcoming: {type: Number},
})

module.exports = mongoose.model('Coin', coinSchema);