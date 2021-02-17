const fs = require('fs')
var eventos = async function (bot) {

    for(const file of fs.readdirSync('./eventos/')) { 

        if(file.endsWith(".js")){
    
        let fileName = file.substring(0, file.length - 3); 
      
        let fileContents = require(`./eventos/${file}`); 
        
        bot.on(fileName, fileContents.bind(null, bot)); 
              
        delete require.cache[require.resolve(`./eventos/${file}`)]; 
        }
      }
}
module.exports = { eventos }