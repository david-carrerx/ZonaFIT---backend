const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    package: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Client', ClientSchema);