module.exports = {
    name: 'skip',
    alias: [],
    usage: '',
    description: 'Saltar a la siguiente cancion',
    async run(bot, message, args) {
  const canalDeVoz = message.member.voice.channel;
  if (!canalDeVoz) {
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Debes unirte a un canal de voz');
    return message.channel.send(bot.mensajeAdvertencia)
  }
  if(canalDeVoz.id !== message.guild.me.voice.channel.id){
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No estas en el mismo canal de voz');
    return message.channel.send(bot.mensajeAdvertencia)
}
  if(!bot.cola) {
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No hay cola de musica'); 
    return message.channel.send(bot.mensajeAdvertencia)
  }
  await bot.cola.connection.dispatcher.destroy();
   message.channel.send(`Cancion saltada exitosamente, ahora: __${bot.cola.songs[1].title}__`);
    }

}