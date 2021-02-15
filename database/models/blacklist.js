let mongoose = require("mongoose"), 
schema = new mongoose.Schema({ 
    user_id: { type: String },
    reason: { type: String }, 
    date: { type: Number } 
});

module.exports = mongoose.model('blacklist', schema); 