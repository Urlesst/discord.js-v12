var command = function(client) {
    const fs = require('fs')
fs.readdirSync("./comandos").forEach(carpeta => {
        const commands = fs.readdirSync(`./comandos/${carpeta}/`).filter(f => f.endsWith(".js"));
        for(file of commands) {
          const comando = require(`./comandos/${carpeta}/${file}`);
          client.comandos.set(comando.name, comando);
        };
      });
}
module.exports = { command }

