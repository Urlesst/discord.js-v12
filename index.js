const Discord = require('discord.js')
const bot = new Discord.Client({ partials: ['USER', 'CHANNEL', 'REACTION', 'MESSAGE'], ws: { intents: 32767, properties: { $browser: 'Discord Android'}}})

bot.config = require('./config.js')
var Ready = require('./eventosFunciotnsBot/ready.js')

bot.on('ready', () => {
Ready.eventoReady(bot)
})

bot.on('message', async (message) => {

});


bot.login(bot.config.token)