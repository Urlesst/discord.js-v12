const GuildModel = require("../database/models/prefix_db.js");
var message = async function (bot, message) {
   
    const { MessageEmbed } = require("discord.js")
    let guild_config = await bot.db.findOne({ guild: message.guild.id }), 
    users_afk = guild_config ? guild_config.users_afk : [] 

    function humanize(user_afk) { 
      let humanizeDuration = require('humanize-duration'); 
      let time_elapsed = humanizeDuration(Date.now() - user_afk.date, {  

        language: 'es',
        maxDecimalPoints: 1, 
        largest: 2,
        conjunction: ' y ', 
        serialComma: false 
      }); 
      
      return time_elapsed; 
    }; 

    let user_afk = users_afk.find(u => u.user === message.author.id); 

    if(user_afk){ 

      await guild_config.updateOne({ 
        $pull: { 
          users_afk: { 
            user: message.author.id 
          }
        }
      }); 

      const volvio = new MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${message.author} Bienvenido de vuelta, has sido removido de la lista de usuarios afk\n> \`Tiempo que estuviste muerto en el chat\`: ${humanize(user_afk)}`)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter("afk", message.author.displayAvatarURL({dynamic: true}))
     return message.channel.send(volvio) 


    };
    let mentions = message.mentions.users.array(); 
    let users_afk_mentioned = []; 
    for(user of mentions){
        if(users_afk.find(u => u.user === user.id)){ 
          users_afk_mentioned.push([user, users_afk.find(u => u.user === user.id)]); 
        }; 
      };
  
      if(users_afk_mentioned[0]){ 
          if(message.author.bot) return;
          let a = users_afk_mentioned.map(data => data[0])
          let time = users_afk_mentioned.map(data => humanize(data[1]))

       const nop = new MessageEmbed()
       .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${a} esta afk, evita mencionarlo`)
       .addField("**`Tiempo afk`**", `${time}`)
       .setTimestamp()
       .setColor("RANDOM")
       .setFooter("afk", message.author.displayAvatarURL({dynamic: true}))

        return message.channel.send(nop); 
      };

    const modelo = await GuildModel.findOne({ id: message.guild.id });

   bot.prefix = modelo ? modelo.prefix : "p?";

	if (!message.content.startsWith(bot.prefix) || message.author.bot) return;

    function humanize(user_afk) { 
        let humanizeDuration = require('humanize-duration'); 
        let time_elapsed = humanizeDuration(Date.now() - user_afk.date, {
          language: 'es', 
          maxDecimalPoints: 1, 
          largest: 2, 
          conjunction: ' y ',
          serialComma: false 
        }); 
        return time_elapsed; 
      }; 

    let blacklist = await bot.testing.findOne({ user_id: message.author.id }); 
if(blacklist){
return message.author.send(`<:not:786381128260911155> vaya, \`estas en la lista negra.\` \n\`Razon:\` ${blacklist.reason} \n\`Hace\` ${humanize(blacklist)}\n si crees que esto es un error puedes ir a mi servidor de soporte. \n https://discord.com/invite/vzzmWWFk65`);
            };
    
	const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    let cmd = bot.comandos.get(command)  || bot.comandos.find(c => c.alias && c.alias.includes(command))
    if(cmd) {
        return cmd.run(bot, message, args)
    }

}
module.exports = { message }