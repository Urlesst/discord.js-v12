const mongoose = require('mongoose');

const Logs = new mongoose.Schema({
    guild: { type: String },
    ChannelID: { type: String }
});
module.exports = mongoose.model('Logs', Logs);