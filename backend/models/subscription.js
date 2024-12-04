const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);