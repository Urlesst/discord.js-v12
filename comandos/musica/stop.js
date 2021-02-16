module.exports = {
    name: 'stop',
    alias: ['stp'],
    usage: '',
    description: 'Detiene la reproduccion de musica actual',
    async run(bot, message, args) {
  const canalDeVoz = await message.member.voice.channel;
   if(!canalDeVoz){
    return message.channel.send('Debes unirte a un canal de voz para detener la reproduccion');
   }
   if(canalDeVoz.id !== message.guild.me.voice.channel.id){
    return message.channel.send('No estas en el mismo canal de voz');
}

  if(!bot.cola){
    return message.channel.send('La cola esta vacía');
  }

  bot.cola.songs = []

  await bot.cola.connection.dispatcher.end();
  message.channel.send('La cola fue detenida')
    }

}