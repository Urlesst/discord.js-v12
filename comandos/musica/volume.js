module.exports = {
    name: 'volume',
    alias: ['vle'],
    usage: '<Volumen>',
    description: 'Ajustar el volumen de la musica.',
    async run (bot, message, args) {
        const canalDeVoz = await message.member.voice.channel; 
        let volumen = args[0]
        if(!canalDeVoz){
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Debes unirte a un canal de voz para ajustar el volumen de la musica');
         return message.channel.send(bot.mensajeAdvertencia)
        }
        if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No estas en el mismo canal de voz');
           return message.channel.send(bot.mensajeAdvertencia)
        }
        
       if(!bot.cola){
        bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • La cola esta vacía');
         return message.channel.send(bot.mensajeAdvertencia)
       }
        if(!volumen){
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Agrega el volumen')
            return message.channel.send(bot.mensajeAdvertencia)
        }
        let numeroVolumen = parseInt(volumen);

        if(!Number.isInteger(Number(volumen))) {
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Solo numeros, no letras')
             return message.channel.send(bot.mensajeAdvertencia)
        }

  if(numeroVolumen < 1) {
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • El volumen no puede ser menor que 1')
    return message.channel.send(bot.mensajeAdvertencia)
  }

 if(numeroVolumen > 100){
 bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • El volumen no puede ser mayor que 100')
 return message.channel.send(bot.mensajeAdvertencia)
 }
 let dispatcher = bot.cola.connection.dispatcher;
 await dispatcher.setVolume(Math.min((dispatcher.volume = numeroVolumen / 50)))

 message.channel.send(`Volumen actualizado: \`${Math.round(dispatcher.volume*50)}%\``)
    }

   
}