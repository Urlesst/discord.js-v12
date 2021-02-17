module.exports = {
    name: 'pause',
    alias: ['pausar'],
    usage: '',
    description: 'Pausar la cancion actual en la cola de musica',
    async run(bot, message, args) {
        const canalDeVoz = await message.member.voice.channel;
          if (!canalDeVoz) return message.channel.send('<:not:786381128260911155> | Debes unirte a un canal de voz');
        if (!bot.cola) return message.channel.send('<:not:786381128260911155> | No hay cola de musica');
         if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            return message.channel.send('<:not:786381128260911155> | No estas en el mismo canal de voz');
        }
        await bot.cola.connection.dispatcher.pause();
        message.channel.send(`La cancion actual ha sido pausada`)
       
    }
}