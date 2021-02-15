const mongoose = require('mongoose');
const Guild = mongoose.Schema({
    id: String,
    prefix: String
});

module.exports = mongoose.model('Guild', Guild)