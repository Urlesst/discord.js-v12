const { inspect } = require('util')
module.exports = {
    name: 'eval',
    alias: ['e', 'ev'],
    usage: '<Evaluacion>',
    description: 'Evaluar codigo en discord',
    async run(bot, message, args) {
      const contenidoAEvaluar = args.join(' ') 
      let usuariosPermitidosAusarElEval = ['777903463828815894', '753381968418308167']
      if(!usuariosPermitidosAusarElEval.includes(message.author.id)) return;

       try {
        const salidaDeLoEvaluado = eval(contenidoAEvaluar || undefined) 
        message.channel.send(`${await Date.now() - message.createdTimestamp}ms\n(${typeof(salidaDeLoEvaluado) || 'Nada que mostrar'}) ${inspect(salidaDeLoEvaluado, { depth: 0}).replace(bot.token, 'No dejare que veas esto')}`, {split:  {char: '', maxLength: 1950}, code: 'js'})
          console.log(`${inspect(salidaDeLoEvaluado, {depth: 0 })}`)
          if(message.author.id !== '777903463828815894'){
          return bot.users.cache.get(usuariosPermitidosAusarElEval[0]).send(`@ ${message.author.tag} Evaluo # ${contenidoAEvaluar}`, {split:  {char: '', maxLength: 1950}, code: 'py'})
          }
       } catch (err) {
  return message.channel.send(err, { split: { char:'', maxLength: 1950}, code: 'js'})
       }


    }

}