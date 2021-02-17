module.exports = async (bot, message) => {

    bot.snipes.set({ 
        canal: message.channel.id, 
        mensaje: message.content,  	
        autorEliminado: message.author,
      });
        const Logs = require("../database/models/logs.js")
        let ok = await Logs.findOne({ guild: message.guild.id })
           if(!ok) return;
          let si = await message.guild.channels.resolve(ok.ChannelID);
       if(!si) return;
        
      if(message.content)  {
          let logEmbed = new bot.discord.MessageEmbed()
          .setTitle("<:yes:786381086002380811> Mensaje Borrado")
          .setDescription("`MessageDelete`")
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
          .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
          .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL({dynamic:true}))
          .addField("Autor del mensaje", `${"`" +message.author.tag+ "`"} | ${message.author.toString()}`) .setTimestamp()
          .setColor("RANDOM")
          .addField("En el canal", message.channel, true)
          .addField("Contenido", message.content, true);
           si.send(logEmbed);
      }
      if(message.attachments.size > 0){
        let Attachs = (message.attachments).array()
        Attachs.forEach(async m => {
          const embed = new bot.discord.MessageEmbed()
          .setTitle("<:yes:786381086002380811> Imagen Borrada")
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
          .setThumbnail(message.author.avatarURL)
          .addField("Autor del message: ", `${"`" +message.author.tag+ "`"} | ${message.author.toString()}`)
          .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL({dynamic:true}))
          .setColor("RANDOM")
          .addField("En el canal", message.channel, true)
          .setImage(m.proxyURL)
         si.send(embed) 
        }) 
      }
         
      }