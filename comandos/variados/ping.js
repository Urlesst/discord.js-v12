module.exports = {
    name: 'ping',
    alias: ['pong'],
    cooldown: 4,
    usage: '',
    description: 'Latencia de mensajes y con la API de discord.',
    async run(bot, message, args) {
        let embed;
        message.react("786381086002380811");
      let ping = Math.floor(bot.ws.ping);
  embed = new bot.discord.MessageEmbed()
  .setDescription('<a:xD:786388320094781470> Obteniendo ping...')
  .setTimestamp()
  .setColor('RANDOM')
      message.channel.send(embed).then(async m => {
        let date = Date.now();
        let pingBase = new Promise((r, j) => {
            require('mongoose').connection.db.admin().ping((err, result) => (err || !result) ? j(err || result) : r(Date.now() - date))
          })
           embed = new bot.discord.MessageEmbed()
           .setDescription(`> <:Mensajes:805444999277707314> Ping Mensajes: \`${m.createdTimestamp - message.createdTimestamp} ms\`\n> <:api:805444907153358878> Ping API: \`${ping} ms\`\n> <:lista:786390223843098634> Ping de la base de datos: \`${await pingBase}ms\``)
           .setColor("RANDOM")
           .setFooter(`ping`, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXpYv0aSYhIFcoFbyaheQLu8gU0KfxO82Gg&usqp=CAU')
        .setTimestamp()        
           m.edit(embed)
      
      });
    }
}