module.exports = {
    name: 'volume',
    alias: ['vle'],
    usage: '<Volumen>',
    description: 'Ajustar el volumen de la musica.',
    async run (bot, message, args) {
        const canalDeVoz = await message.member.voice.channel; 
        let volumen = args[0]
        if(!canalDeVoz){
         return message.channel.send('Debes unirte a un canal de voz para ajustar el volumen de la musica');
        }
        if(canalDeVoz.id !== message.guild.me.voice.channel.id){
            return message.channel.send('No estas en el mismo canal de voz');
        }
        
       if(!bot.cola){
         return message.channel.send('La cola esta vacía');
       }
        if(!volumen){
            return message.channel.send('Agrega el volumen')
        }
        let numeroVolumen = parseInt(volumen);

        if(!Number.isInteger(Number(volumen))) {
            return message.channel.send('Solo numeros, no letras')
        }

  if(numeroVolumen < 1) {
    return message.channel.send('El volumen no puede ser menor que 1')
  }

 if(numeroVolumen > 100){
 return message.channel.send('El volumen no puede ser mayor que 100')
 }
 let dispatcher = bot.cola.connection.dispatcher;
 await dispatcher.setVolume(Math.min((dispatcher.volume = numeroVolumen / 50)))

 message.channel.send(`Volumen actualizado: \`${Math.round(dispatcher.volume*50)}%\``)
    }

   
}