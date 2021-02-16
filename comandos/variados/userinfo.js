
module.exports = {
    name: 'userinfo',
    alias: ['ui', 'user'],
    cooldown: 4,
    usage: '',
    description: 'Muestra toda la informacion actual del usuario.',
    async run(bot, message, args) {
        let estados = {
            "online": " ▸ <:online:786377188432805888> ◂ Conectado",
            "offline": " ▸ <:Offline:786377383149961236> ◂  Desconectado/Invisible",
            "idle": " ▸ <:ausente:786377243739029505> ◂ Ausente",
            "dnd": " ▸ <:No_Molestar:786377307626536970> ◂ No Molestar"
          }
          let badges1 = {
            'EARLY_SUPPORTER' :"<:early_supporter_badge:767200647200112661>",
            'DISCORD_EMPLOYEE': "<:staff_badge:767200534603497482>",
            'DISCORD_PARTNER': "<:new_partner_badge:767200550608568322>",
            'HYPESQUAD_EVENTS': "<:hypesquad:767200567076323369>",
            'HOUSE_BRAVERY': "<:bravery_badge:767201411791978507>",
            'HOUSE_BRILLIANCE': "<:brilliance_badge:767201442531770378>",
            'HOUSE_BALANCE': "<:balance_badge:767201464585945130>",
            'BUGHUNTER_LEVEL_1': "<:bug_hunter_badge:767200588231344128>",
            'VERIFIED_DEVELOPER': "<:devbotverify:773243809545846804>",
            "VERIFIED_BOT": "<:botverify:773244892708470814>"
          }
          let obj = {
            "HOUSE_BRAVERY" : "Bravery" , "VERIFIED_BOT" : "Bot verificado" , "VWERIFIED_DEVELOPER" : "Desarrollador de bots verificado" , "HOUSE_BRILLIANCE" : "Brilliance" , "DISCORD_PARTNER" : "Socio de discord"
            }
          let usuario =message.mentions.members.first() || message.guild.members.cache.get(args[0])  || message.guild.members.cache.find(m => m.displayName === args.join(" ")) || message.guild.members.cache.find(m => m.user.username === args.join(" ")) || message.member;
          let embed = new bot.discord.MessageEmbed()
          const apodopro = (usuario.nickname) ? usuario.nickname : "<:not:786381128260911155> Ninguno"
          const hexcolor = usuario.displayHexColor
        
        
        let state;
        const status = usuario.presence.activities.find((x) => x.type === 'CUSTOM_STATUS');
        if(status){
        state = `${status.emoji || ''}${status.state || ''}`;
        }else {
        state = '<:not:786381128260911155> Ninguno'
        }
        
        
        
        const moment = require('moment');
        require('moment-duration-format');
          moment.updateLocale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        }
        );
        
        let xd_xd =  moment(usuario.user.createdAt).fromNow()
        let xd_xd_Xd = moment(usuario.joinedAt).fromNow()
        const connectedIn = usuario.user.presence.clientStatus && usuario.user.presence.status != 'offline' ? Object.keys(usuario.user.presence.clientStatus).join(" **`|`** ").replace(/web/, "🌐" ).replace(/mobile/, "📱").replace( /desktop/, "🖥️") : '<:not:786381128260911155> Desconectado'
        let nitro;
        const a = usuario.user
        const aa = a.displayAvatarURL({ dynamic: true })
        if(aa.endsWith('.gif')) {
        nitro = `${usuario.user.flags.toArray().length ? usuario.user.flags.toArray().map(badge => badges1[badge]).join(' ') : ""} <:badge_nitro:781517803861704715>`
        } else { 
        nitro = `${usuario.user.flags.toArray().length ? usuario.user.flags.toArray().map(badge => badges1[badge]).join(' ') : "<:not:786381128260911155> No hay insignias"}`
        }
        
        
        let role;
        const cinco = usuario.roles.cache.first(5).map(a => a)
        const otro = usuario.roles.cache.size
        if(usuario.roles.cache.size < 5){
        role = `${usuario.roles.cache.first(5).map(a => a).join(' **`|`** ')}`
        }else{
        role = `${cinco}**\`...+ ${otro - 5}\`**`
        }
        
          embed.setColor("RANDOM")
          .setAuthor(usuario.user.tag, usuario.user.displayAvatarURL({dynamic: true}))
          
          
          .setDescription("➵ <:yes:786381086002380811> **Información actual del usuario**" + "\n" + `> Mencion: ${usuario.user}` + "\n"  + `> Tag:  ${usuario.user.tag}` + "\n" + `> ID: ${usuario.id}` + "\n"  + `> Estado:   ${estados[usuario.user.presence.status]}` + "\n" + " " + `> Insignias: ${nitro} ${usuario.premiumSince? ' <:badge_boost:784078410003644467>': ""}` )
          .setThumbnail(usuario.user.displayAvatarURL({dynamic: true, size: 2048}))
        .addField("➵ <:info:786390174518345749> Datos:", `> Se unio el: ${moment(usuario.joinedAt).format("LLLL ")}  **\`(${xd_xd_Xd})\`**` + "\n"  + `> Cuenta creada el: ${moment(usuario.user.createdAt).format('LLLL')} **\`(${xd_xd})\`**`  + "\n" + `> Conectado en: ${connectedIn}`)
        .addField("➵ <:member:781697749619965952> Información en el servidor:", `> Apodo: ${apodopro}` + "\n" + `> Roles ${usuario.roles.cache.size}` + "\n" + `> ${role}` + "\n" + `> Rol mas alto: ${usuario.roles.highest.toString()}` + "\n" +`> Rol color: ${usuario.roles.color ? usuario.roles.color.toString() : "<:not:786381128260911155> Ninguno"}` + "\n" + `> Hexcolor: ${hexcolor}` + "\n" + `> Permisos:` + "```" + `${usuario.permissions.has("ADMINISTRATOR") ? "ADMINISTRATOR" : usuario.permissions.toArray().join(" , ")}` + "```" )
        .addField("➵ <:lista:786390223843098634> Otra información",`> Actividades: ${usuario.user.presence.activities? usuario.user.presence.activities : "<:not:786381128260911155> Ninguna"}`+ "\n" + `> Estado personalizado: ${state} ` )  
          .setFooter(`Solicitado Por: ${message.author.username}`, message.author.avatarURL({dynamic: true}))
          .setTimestamp()
          
          return message.channel.send(embed)
         
        /*           .addField('▸ Permisos Que Tiene:', "`"+usuario.permissionsIn(message.channel).toArray().join('` **|** `')+"`")
        */

        
    }
    
}