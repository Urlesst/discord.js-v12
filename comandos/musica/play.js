const ytdl = require('ytdl-core');
const search = require('youtube-search');
const config = require('../../config.js')

module.exports = {
    name: 'play',
    alias: [],
    usage: '<Cancion>',
    description: 'Escucha musica buscando canciones sea por su link de youtube o nombre.',
    async run(bot, message, args)  {
        bot.cola = bot.mapcola.get(message.guild.id)
         const canalDeVoz = message.member.voice.channel;
         let busquedaCancion = args.join(' ')

         if (!canalDeVoz) return message.channel.send('Necesitas unirte a un canal de voz para reproducir música');

         const permisosBot = canalDeVoz.permissionsFor(bot.user);

         if (!permisosBot.has('CONNECT') || !permisosBot.has('SPEAK')) {
            return message.channel.send('No tengo los suficientes permisos');
          }

        

        if(!busquedaCancion) {
            return message.channel.send('Debes ingresar un link de youtube o el nombre de la musica a reproducir')
        }
  
          var opts = {
            maxResults: 1,
            key: config.youtube,  
            type: "video" 
          };

          const songArg = await search(busquedaCancion, opts);
          const songURL = songArg.results[0].link;
          const songInfo = await ytdl.getInfo(songURL);

          const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            author: message.author.tag
          };

          if (!bot.cola) {
            const queueObject = {
                textChannel: message.channel,
                voiceChannel: canalDeVoz, 
                connection: null, 
                songs: [], 
                volume: 5, 
                playing: true,
               };

       bot.mapcola.set(message.guild.id, queueObject);
       queueObject.songs.push(song);
         
       try {
       
        var connection = await canalDeVoz.join();
        queueObject.connection = connection;
       
        message.channel.send(`Reproduciendo ahora: __${song.title}__`);
       
        
        play(message.guild, queueObject.songs[0]);
       
       } catch (err) {
       
        console.log(err);
        bot.mapcola.delete(message.guild.id);
        return message.channel.send(err);
       
       }
       async function play(guild, song) {
        const serverQueue = bot.mapcola.get(guild.id);
        if (!song) {
         serverQueue.voiceChannel.leave();
         bot.mapcola.delete(guild.id);
         return;
        }

        const dispatcher = await serverQueue.connection.play(ytdl(song.url))
        .on('finish', () => {

          serverQueue.songs.shift();
       
          play(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
         console.error(error);
        });
       
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    }
        
          } else {
            bot.cola.songs.push(song);
            console.log(bot.cola.songs);
            return message.channel.send(`${song.title} ha sido añadido a la cola!, por: __${message.author.tag}__`)
          }
    }

}