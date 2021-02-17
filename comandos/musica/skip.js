module.exports = {
    name: 'skip',
    alias: [],
    usage: '',
    description: 'Saltar a la siguiente cancion',
    async run(bot, message, args) {
  const canalDeVoz = message.member.voice.channel;
  if (!canalDeVoz) return message.channel.send('<:not:786381128260911155> | Debes unirte a un canal de voz');
  if(canalDeVoz.id !== message.guild.me.voice.channel.id){
    return message.channel.send('<:not:786381128260911155> | No estas en el mismo canal de voz');
}
  if(!bot.cola)  return message.channel.send('<:not:786381128260911155> | No hay cola de musica'); 

  await bot.cola.connection.dispatcher.destroy();
   message.channel.send(`Cancion saltada exitosamente, ahora: __${bot.cola.songs[1].title}__`);
    }

}