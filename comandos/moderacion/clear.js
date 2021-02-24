module.exports = {
    name: 'clear',
    alias: ['purge', 'clean', 'barrer'],
    cooldown: 7,
    usage: '<canal/usuario> <cantidad>',
    permissions: 'MANAGE_MESSAGES',
    permissionsBot: 'MANAGE_MESSAGES',
    description: 'Borrar una cantidad de mensajes de un canal',
    async run(bot, message, args) {
       let cantidad;
       if(args[0].includes('<#' && '>')){
        cantidad = args[1]
       } else {
        cantidad = args[0]
       }

       if(!cantidad){
           bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Te faltaron argumentos.\n__Debes poner la cantidad de mensajes a borrar.__')
      return message.channel.send(bot.mensajeAdvertencia)
        }
       let canal = message.mentions.channels.first() || message.channel;
      
       if(canal.guild.id !== message.guild.id) {
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  El canal mencionado no es de este servidor.')
        return message.channel.send(bot.mensajeAdvertencia)
       }

       if(cantidad > 100){
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  No puedes borrar mas de 100 mensajes.')
        return message.channel.send(bot.mensajeAdvertencia)
       }

       if(cantidad < 1){
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  La cantidad de mensajes a borrar no puede ser menor a 1')
        return message.channel.send(bot.mensajeAdvertencia)
       }
       canal.bulkDelete(cantidad).then(mensajes => {
           bot.mensajeExito.setDescription(`<:yes:786381086002380811> • Todo salio bien, se eliminaron \`${mensajes.size}\` mensajes en ${canal}`)
           message.channel.send(bot.mensajeExito)
       }).catch((reject) => {
        if(reject.message == 'You can only bulk delete messages that are under 14 days old.'){
         bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  No puedo borrar mensajes con 2 semanas de antiguedad o mas.')
        return message.channel.send(bot.mensajeAdvertencia)
        }
     console.log(reject)
       })

    } 
}