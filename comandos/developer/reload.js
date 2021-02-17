const fs = require('fs')

module.exports = {
    name: 'reload',
    alias: ['rld', 'recargar'],
    usage: '<Evaluacion>',
    description: 'Recargar comandos.',
    async run(bot, message, args) {
    const nombreCarpeta = args[0]
      const nombreComando = args[1] 
      let usuariosPermitidosAusarElReload = ['777903463828815894', '753381968418308167']
      if(!usuariosPermitidosAusarElReload.includes(message.author.id)) return;
      const command = bot.comandos.get(nombreComando) || bot.comandos.find(cmd => cmd.alias && cmd.alias.includes(nombreComando));
       if(!nombreCarpeta){
      return message.channel.send('<:not:786381128260911155> | Ingresa la categoria del comando')
      }

      if(!nombreComando){
        return message.channel.send('<:not:786381128260911155> | Ingresa el comando a recargar')
        }
     

     if(!command){
        return message.channel.send('<:not:786381128260911155> | No se encontro el comando')  
     }  
     try {
    
     delete require.cache[require.resolve(`../${nombreCarpeta}/${command.name}.js`)];
   
        const newCommand = require(`../${nombreCarpeta}/${command.name}.js`);
        bot.comandos.set(newCommand.name, newCommand);
    } catch (error) {
        console.error(error);
        return message.channel.send(`<:not:786381128260911155> | Hubo un error al recargar \`${command.name}\`\n\`${error.message}\``);
    }
    message.channel.send(`El comando \`${command.name}\` ha sido recargado exitosamente`);
    }
}