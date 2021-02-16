module.exports = {
    name: 'resume',
    alias: [],
    usage: '',
    description: 'Reanudar la cancion actual en la cola de musica',
    async run(bot, message, args) {
        const canalDeVoz = await message.member.voice.channel;
        if (!canalDeVoz) return message.channel.send('Debes unirte a un canal de voz');
        if (!bot.cola) return message.channel.send('No hay cola de musica');
        if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            return message.channel.send('No estas en el mismo canal de voz');
        }
        

        await bot.cola.connection.dispatcher.resume();

        message.channel.send(`La cancion actual ha sido reanudada`)
    }

}