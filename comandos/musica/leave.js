module.exports = {
    name: 'leave',
    alias: [],
    usage: '',
    description: 'Haga que la bot salga del canal de voz sin necesidad de que haya una cola de musica.',
    async run(bot, message, args) {
        const canalDeVoz = await message.member.voice.channel; 
        if(!canalDeVoz){
         return message.channel.send('<:not:786381128260911155> | Debes unirte a un canal de voz para ajustar el volumen de la musica');
        }
        if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            return message.channel.send('<:not:786381128260911155> | No estas en el mismo canal de voz');
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