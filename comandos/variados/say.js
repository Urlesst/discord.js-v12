const sayEnviar = require('../../FuncionesBot/say.js')
module.exports = {
    name: 'say',
    alias: ['decir'],
    cooldown: 3,
    usage: '<contenido>',
    description: 'Puedes mandar mensajes con la bot.',
    async run(bot, message, args) {
     let contenido = args.join(' ')

     if(!contenido){
         bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Te faltaron argumentos.\n__Deberias poner el contenido a enviar.__')
         return message.channel.send(bot.mensajeAdvertencia)
     }

if(!message.member.permissions.has('MENTION_EVERYONE') || !message.member.permissions.has('MANAGE_ROLES')){
 if(contenido.match(/@(everyone|here)/g)){
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No tienes los suficientes permisos para mencionar everyone/here.\n__Permiso requerido:__ \`MENTION_EVERYONE\`')
    return message.channel.send(bot.mensajeAdvertencia)
 } 
if(contenido.match(/<@&(\d{17,19})>/g)){
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No tienes los suficientes permisos para mencionar roles.\n__Permiso requerido:__ \`MANAGE_ROLES\`')
    return message.channel.send(bot.mensajeAdvertencia)
}

return sayEnviar.mensaje(contenido, message)

} else {
 return sayEnviar.mensaje(contenido, message) 
}

    }
}