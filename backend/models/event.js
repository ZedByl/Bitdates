const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: [{id: Number, name: String}],
    eventDate: {type: Date, required: true},
    description: {type: String},
    eventLink: {type: String},
    imageUrl: {type: String},
    coins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);