var command = function(client) {
    const fs = require('fs')

const variados = fs.readdirSync('./comandos/variados').filter(file => file.endsWith('.js')) 
const interaccion = fs.readdirSync('./comandos/interaccion&reaccion').filter(file => file.endsWith('.js')) 
const moderacion = fs.readdirSync('./comandos/moderacion').filter(file => file.endsWith('.js')) 
const sorteos = fs.readdirSync('./comandos/sorteos').filter(file => file.endsWith('.js'))  
const diversion = fs.readdirSync('./comandos/diversion').filter(file => file.endsWith('.js'))
const dev = fs.readdirSync('./comandos/developer').filter(file => file.endsWith('.js'))
const musica = fs.readdirSync('./comandos/musica').filter(file => file.endsWith('.js'))

for (const file of variados){
    const  obtenerComando = require(`./comandos/variados/${file}`)
    client.comandos.set(obtenerComando.name, obtenerComando)

}
for (const file of interaccion){
    const  obtenerComando = require(`./comandos/interaccion&reaccion/${file}`)
 client.comandos.set(obtenerComando.name, obtenerComando)
}

for (const file of moderacion){
    const  obtenerComando = require(`./comandos/moderacion/${file}`)
client.comandos.set(obtenerComando.name, obtenerComando)
}
for (const file of sorteos){
    const  obtenerComando = require(`./comandos/sorteos/${file}`)
 client.comandos.set(obtenerComando.name, obtenerComando)
}

for (const file of diversion){
    const  obtenerComando = require(`./comandos/diversion/${file}`)
 client.comandos.set(obtenerComando.name, obtenerComando)
}
for (const file of dev){
    const  obtenerComando = require(`./comandos/developer/${file}`)
 client.comandos.set(obtenerComando.name, obtenerComando)
}

for (const file of musica){
    const  obtenerComando = require(`./comandos/musica/${file}`)
 client.comandos.set(obtenerComando.name, obtenerComando)
}

}
module.exports = { command }

