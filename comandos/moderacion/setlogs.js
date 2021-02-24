module.exports = {
    name: 'setlogs',
    alias: [],
    cooldown: 4,
    usage: '<canal>',
    permissions: 'MANAGE_GUILD',
    permissionsBot: 'SEND_MESSAGES',
    description: 'Establecer un canal de logs en su servidor.',
    async run (bot, message, args) {
      const dbLogs = require('../../database/models/logs.js')
      let verificacionDeInfo = await dbLogs.findOne({guild: message.guild.id})
      let canal = message.mentions.channels.first() || message.guild.channels.resolve(args[0]) 
 
      if(!canal) {
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Te faltaron argumentos.\n__Debes mencionar o poner la ID de un canal.__')
        return message.channel.send(bot.mensajeAdvertencia)
      }

     if(canal.guild.id !== message.guild.id){
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • El canal no pertenece a este servidor.\n__El canal debe ser de este servidor.__')
        return message.channel.send(bot.mensajeAdvertencia)
     }

     if(!canal.permissionsFor(bot.user).has('VIEW_CHANNEL') || !canal.permissionsFor(bot.user).has('SEND_MESSAGES')){
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No tengo los suficientes permisos para mandar mensajes en ese canal o simplememente no lo puedo ver.\n__Solo canales en los cuales tenga los suficientes permisos__')
        return message.channel.send(bot.mensajeAdvertencia) 
     }

     let crearDatos = new dbLogs({ guild: message.guild.id, ChannelID: canal.id })
      verificacionDeInfo ? dbLogs.updateOne({guild: message.guild.id}, { ChannelID: canal.id}) : await crearDatos.save()

      bot.mensajeExito.setDescription(`<:yes:786381086002380811> • Todo salio bien, ${canal} ha sido establecido como canal de logs.\n__Para desactivarlo usa ${bot.prefix}deletelogs__`)
      return message.channel.send(bot.mensajeExito)
    }
}