module.exports = {
    name: 'queue',
    alias: ['cola'],
    usage: '',
    description: 'Muestra la cola de reproduccion actual del servidor.',
    async run(bot, message, args) {
        if(!bot.cola) {
            return message.channel.send('No hay cola de musica en este servidor');
        }
        let i = 1

        let lista = bot.cola.songs.slice(1).map((music) => {
            if(i > 16) return 
            i++;
            return `[${i}] - 🎵 ${music.title} 👤 por: \`${music.author}\``
        }).join('\n')
      
        let tiempo = Math.trunc(bot.cola.connection.dispatcher.streamTime / 1000)
        let nombre = `\n🔊 Ahora: __${bot.cola.songs[0].title}__\n🕐 Tiempo: __${tiempo} segundos__\n👤 Por: \`${bot.cola.songs[0].author}\`\n`
        let cantidadCanciones = `\n📒 __Lista ${bot.cola.songs.length}/15 canciones__`
        let embedDeInfoCola = new bot.discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
        .addField(`__Lista de canciones de ${message.guild.name}__`, `> ${nombre}` + '\n' + '**__Demas canciones__**' + '\n' + `> ${lista}` + '\n' + `> ${cantidadCanciones}\n`)
        .setTimestamp()
        .setFooter('music')
        .setColor(message.member.displayHexColor)
        return message.channel.send(embedDeInfoCola)
    }
}