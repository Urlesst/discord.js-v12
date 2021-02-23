module.exports = {
    name: 'avatar',
    alias: ['av'],
    cooldown: 3,
    usage: '',
    description: 'Ver el avatar de un usuario',
    async run(bot, message, args) {
        let busqueda = message.mentions.users.first() || bot.users.cache.get(args[0]) || await bot.users.fetch(args[0]).catch((error) =>   { console.log(error) }) || message.author
        let usuario = args[0] ? busqueda : message.mentions.users.first() || message.author;
        
        let png = await usuario.displayAvatarURL({dynamic: true, size: 4096, format: 'png'})
        let jpg = await usuario.displayAvatarURL({dynamic: true, size: 4096, format: 'jpg'})
        let jpeg = await usuario.displayAvatarURL({dynamic: true, size: 4096, format: 'jpeg'})
        let wepb = await usuario.displayAvatarURL({dynamic: true, size: 4096, format: 'webp'})
        let gif = await usuario.displayAvatarURL({dynamic: true, size: 4096, format: 'gif'})

        const formatos = await usuario.displayAvatarURL({dynamic: true}).endsWith('.gif') ?  '\n' + `> [Png](${png})` + '\n' + `> [Jpg](${jpg})` + '\n' + `> [Jpeg](${jpeg})` + '\n' + `> [Webp](${wepb})` + '\n' +  `> [Gif](${gif})` :  '\n' + `> [Png](${png})` + '\n' + `> [Jpg](${jpg})` + '\n' + `> [Jpeg](${jpeg})` + '\n' + `> [Webp](${wepb})` 
      
        let usuarioTag = await usuario.id === message.author.id ? 'Ti mismo' : await usuario.tag
         let verificacionFooter = await usuario.id === message.author.id ? 'Ti mismo' : await message.author.tag

       let verificacionAvatarAutor =  await usuario.id === message.author.id ?  'https://w7.pngwing.com/pngs/945/310/png-transparent-computer-icons-email-message-yes-miscellaneous-angle-logo.png' : await usuario.displayAvatarURL({ dynamic: true, size: 4096})
        let hyper = usuario.id === message.author.id ? `__[Tu avatar](${await message.author.displayAvatarURL({dynamic: true, size: 4096})})__` : `Avatar de: __[${await usuario.tag}](${await usuario.displayAvatarURL({dynamic: true, size: 4096})})__`
        const mensajeEmbedAvatar = new bot.discord.MessageEmbed()
        .setAuthor(`${usuarioTag.replace('Ti mismo', 'Tu')}`, verificacionAvatarAutor)
        .setDescription(`${hyper}\n> __Formatos__` + `${formatos}`)
        .setImage(await usuario.displayAvatarURL({ dynamic: true, size: 4096}))
        .setFooter(`Solicitado por: ${verificacionFooter}`)
        .setColor('RANDOM')
        return message.channel.send(mensajeEmbedAvatar)

    }
}