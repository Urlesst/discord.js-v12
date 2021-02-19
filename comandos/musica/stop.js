module.exports = {
    name: 'stop',
    alias: ['stp'],
    usage: '',
    description: 'Detiene la reproduccion de musica actual',
    async run(bot, message, args) {
  const canalDeVoz = await message.member.voice.channel;
   if(!canalDeVoz){
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • Debes unirte a un canal de voz para detener la reproduccion');
    return message.channel.send(bot.mensajeAdvertencia)
   }
   if(canalDeVoz.id !== message.guild.me.voice.channel.id){
  bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • No estas en el mismo canal de voz');
   return message.channel.send(bot.mensajeAdvertencia)
}

  if(!bot.cola){
    bot.mensajeAdvertencia.setDescription('<:not:786381128260911155> • La cola esta vacía');
    return message.channel.send(bot.mensajeAdvertencia)
  }

  bot.cola.songs = []

  await bot.cola.connection.dispatcher.end();
  message.channel.send('La cola fue detenida')
    }

}