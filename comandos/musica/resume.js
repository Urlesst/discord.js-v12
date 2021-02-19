module.exports = {
    name: 'resume',
    alias: [],
    usage: '',
    description: 'Reanudar la cancion actual en la cola de musica',
    async run(bot, message, args) {
        const canalDeVoz = await message.member.voice.channel;
        if (!canalDeVoz){
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  Debes unirte a un canal de voz');
        return message.channel.send(bot.mensajeAdvertencia)
        }
        if (!bot.cola){
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  No hay cola de musica')
            return message.channel.send(bot.mensajeAdvertencia)

        }
        if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> •  No estas en el mismo canal de voz');
            return message.channel.send(bot.mensajeAdvertencia)
        }
        

        await bot.cola.connection.dispatcher.resume();

        message.channel.send(`La cancion actual ha sido reanudada`)
    }

}