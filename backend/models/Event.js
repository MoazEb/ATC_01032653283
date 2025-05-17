const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    date: { type: Date, required: true },
    venue: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);