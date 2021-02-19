module.exports = {
    name: 'afk',
    alias: [],
    cooldown: 2,
    description: 'Away From Keyboard (lejos del teclado)',
    async run(bot, message, args) {
        let data = await bot.db.findOne({ guild: message.guild.id });
        let new_data = new bot.db({ guild: message.guild.id }); 

        if(!data){ 
            await new_data.save(); 
            data = await bot.db.findOne({ guild: message.guild.id }); 
        }; 

        let reason = args.join(' ') || 'No especificada'; 

        await data.updateOne({ 
            $push: {
                users_afk: { 
                    user: message.author.id, 
                    reason: reason, 
                    date: Date.now() 
                }
            }
        });

        const sefue = new bot.discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${message.author} ahora estas en la lista de usuarios afk\n> \`Datazo\`: una vez vuelvas a hablar seras retirado de la lista.\n> __Razon:__ ${reason}`)
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send(sefue).then(x => x.delete({timeout: 5000}))

    }
}