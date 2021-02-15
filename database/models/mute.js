const mongoose = require('mongoose');
const ms = require('ms')

const SystemMute = new mongoose.Schema({
    guildID: { type: String },
    userID: { type: String },
    rolID: { type: String },
    time: { type: Number },
    reason: { type: String }
});
module.exports = mongoose.model('SystemMute', SystemMute);
