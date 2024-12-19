const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: Map,
        of: String,
        required: true
    },
    description: {
        type: Map,
        of: String,
        required: true
    },
    categories: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
        },
    ],
    date_event: {type: Date, required: true},
    proof: {type: String},
    image_url: {type: String},
    coins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);