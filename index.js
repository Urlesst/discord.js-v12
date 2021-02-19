const Discord = require('discord.js')
const bot = new Discord.Client({ partials: ['USER', 'CHANNEL', 'REACTION', 'MESSAGE'], ws: { intents: 32767, properties: { $browser: 'Discord Android'}}})
const fs = require('fs')



bot.config = require('./config.js')
bot.snipes = new Map()
bot.testing = require("./database/models/blacklist.js");
bot.db = require('./database/models/afk.js');
bot.discord = Discord;

///////////////////funciones /////////////////////////
    var Ready = require('./eventosFuncionesBot/ready.js')
    var comandos = require('./comandos.js')
    var mensaje = require('./eventosFuncionesBot/mensaje.js')
    var demasEventos = require('./events.js')  
/////////////////////////////////////

bot.mapcola = new Map()
bot.comandos = new Discord.Collection();

const { GiveawaysManager } = require('discord-giveaways');
bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 50000,
    default: {
        botsCanWin: false,
        embedColor: "RANDOM",
        reaction: "🎉"
    }
});


bot.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entro #${giveaway.messageID} (${reaction.emoji.name})`);
});

bot.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} quito la raccion #${giveaway.messageID} (${reaction.emoji.name})`);
});

comandos.command(bot)

bot.on('ready', () => {
Ready.eventoReady(bot)
})

bot.on('message', async (message) => {
mensaje.message(bot, message)
})

demasEventos.eventos(bot)

bot.login(bot.config.token)