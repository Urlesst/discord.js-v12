module.exports = {
    name: 'leave',
    alias: [],
    usage: '',
    description: 'Haga que la bot salga del canal de voz sin necesidad de que haya una cola de musica.',
    async run(bot, message, args) {
        const canalDeVoz = await message.member.voice.channel; 
        if(!canalDeVoz){
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Debes unirte a un canal de voz para ajustar el volumen de la musica');
         return message.channel.send(bot.mensajeAdvertencia)
        }
        if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No estas en el mismo canal de voz');
           return message.channel.send(bot.mensajeAdvertencia)
        }

        if(bot.cola){
    bot.cola.songs = []
     await bot.cola.connection.dispatcher.end();
     return message.channel.send('Listo')
     
        } else {
        await canalDeVoz.leave()
        message.channel.send('Listo')
        }
    }

}