const cooldown = new Set()

const GuildModel = require("../database/models/prefix_db.js");

var message = async function (bot, message) {
  // AKK

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

  let user_afk = await users_afk.find(u => u.user === message.author.id); 

  if(user_afk){ 

    await guild_config.deleteOne({ 
      $push: { 
        users_afk: { 
          user: message.author.id 
        }
      }
    }); 

  

    const volvio = new bot.discord.MessageEmbed()
    .setDescription(`${message.author} Bienvenido de vuelta, has sido removido de la lista de usuarios afk\n> __\`Tiempo afk\`__: ${humanize(user_afk)}`)
    .setTimestamp()
    .setColor("RANDOM")
   return message.channel.send(volvio).then(m => m.delete({timeout: 5000}));

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
        let razon = users_afk_mentioned.map(data => data[1].reason)

     const nop = new bot.discord.MessageEmbed()
     .setDescription(`${a} esta afk, evita mencionarlo.\n> **__Razon__**: ${razon}`)
     .setTimestamp()
     .setColor("RANDOM")
      return message.channel.send(nop).then(xd => xd.delete({timeout: 5000}));
    }

// DELCLARACION PREFIX

    const modelo = await GuildModel.findOne({ id: message.guild.id });

   bot.prefix = modelo ? modelo.prefix : "p?";
// CONDICION PREFIX-BOT

	if (!message.content.toLowerCase().startsWith(bot.prefix) || message.author.bot) return;

// BLACK-LIST
  function humanize(usuario) { 
    let humanizeDuration = require('humanize-duration'); 
    let time_elapsed = humanizeDuration(Date.now() - usuario.date, {
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

  // ARGS && COMMAND

	const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

   // COMMANDS

    let cmd = bot.comandos.get(command)  || bot.comandos.find(c => c.alias && c.alias.includes(command))
    if(!cmd) return;
    var id = message.author.id + cmd.name + cmd.alias.join('');
    const tiempo = cmd.cooldown;
    let embedCooldown = new bot.discord.MessageEmbed()
    embedCooldown.setDescription(`<:not:786381128260911155> • No seas tan rapido ${message.author}, espera \`${tiempo}\` segundos para volver a usar el comando`)
    embedCooldown.setTimestamp()
    embedCooldown.setColor('RANDOM')

//COOLDOWN

    if(cooldown.has(id)) return message.channel.send(embedCooldown)
    cooldown.add(id)
    if(cmd){
 setTimeout(() => {
         cooldown.delete(id)
        }, tiempo + '000')

// EMBED-ADVERTENCIA
        let objecto = {
          autorAvatar: message.author.displayAvatarURL({dynamic: true}),
          autorTag: message.author.tag,
          color: 'RANDOM'
        }
    
        bot.mensajeAdvertencia = new bot.discord.MessageEmbed().setColor(objecto.color).setFooter(objecto.autorTag, objecto.autorAvatar).setTimestamp()
// EMBED-EXITO 

bot.mensajeExito = new bot.discord.MessageEmbed().setColor(objecto.color).setTimestamp().setAuthor(objecto.autorTag, objecto.autorAvatar)

//EMBED-PERMISOS

    if(cmd.permissions){
            const authorPerms = message.channel.permissionsFor(message.author);
                 if (!authorPerms || !authorPerms.has(cmd.permissions)) {
                 let embedNoPermisos = new bot.discord.MessageEmbed()
     .setDescription(`<:not:786381128260911155> • No tienes los suficientes permisos.\n__Permiso requerido:__ \`${cmd.permissions}\``)
     .setTimestamp()
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setColor('RANDOM')
         return message.channel.send(embedNoPermisos)
        }
        }
    cmd.run(bot, message, args)
    }

}
module.exports = { message }