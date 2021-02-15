const mongoose = require("mongoose"), 
    schema = new mongoose.Schema({ 
      guild: { type: String }, 
      users_afk: [{ 
           user: { type: String },
           reason: { type: String }, 
           date: { type: Number } 
      }],
});

module.exports = mongoose.model('Guilds', schema)