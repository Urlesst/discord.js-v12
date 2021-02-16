const Discord = require('discord.js')
const bot = new Discord.Client({ partials: ['USER', 'CHANNEL', 'REACTION', 'MESSAGE'], ws: { intents: 32767, properties: { $browser: 'Discord Android'}}})
const fs = require('fs')



bot.config = require('./config.js')
bot.testing = require("./database/models/blacklist.js");
bot.db = require('./database/models/afk.js');
bot.discord = Discord;

///////////////////funciones /////////////////////////
var Ready = require('./eventosFuncionesBot/ready.js')
var comandos = require('./comandos.js')
var mensaje = require('./eventosFuncionesBot/mensaje.js')
/////////////////////////////////////

bot.mapcola = new Map()
bot.comandos = new Discord.Collection();

comandos.command(bot)

bot.on('ready', () => {
Ready.eventoReady(bot)
})

bot.on('message', async (message) => {
mensaje.message(bot, message)
})


bot.login(bot.config.token)