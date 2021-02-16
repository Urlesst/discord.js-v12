const MuteDB = require('../database/models/mute.js')
const mongo = require('mongoose')

var eventoReady = function (client) {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(`Fecha: ${date} - Hora: ${time}`)
  setInterval(async () => {
    let mensajePresencia = ['p?help', `${client.users.cache.size} usuarios`, '@Pecorine']
    let presenciaRandom = mensajePresencia[Math.floor(Math.random() * mensajePresencia.length)]
    await client.user.setActivity(presenciaRandom, {
        type: 'WATCHING'
    })
}, 30000)
mongo.connect(client.config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("✔ Conectado a MongoDB")
})

setInterval(async function () { 
    let allData = await MuteDB.find() 
    allData.map(async a => {
        if (a.time < Date.now()) { 
            let member = client.guilds.resolve(a.guildID).member(a.userID) 
            member.roles.remove(a.rolID) 
            await MuteDB.deleteOne({ userID: a.userID }) 
            member.send(`<:yes:786381086002380811> listo, ya puedes volver a hablar en \`${client.guilds.resolve(a.guildID).name}\`.`)
        }
    })
}, 10000)
console.log('logeado exitosamente')
}
module.exports = { eventoReady }