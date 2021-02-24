var mensaje = async function mensaje (contenido, mensaje){
    if(mensaje.guild.me.permissions.has('MANAGE_MESSAGES')){
    if(mensaje.attachments.size > 0){
    let imagenes = (mensaje.attachments).array()
    mensaje.delete()
    await imagenes.forEach(img => {
      return  mensaje.channel.send(x.proxyURL) 
    }).catch(e => console.log(e))
    
    }
    mensaje.delete()
    mensaje.channel.send(contenido)

    } else {
    if(mensaje.attachments.size > 0){
        let imagenes = (mensaje.attachments).array() 
        await imagenes.forEach(img => {
          return  mensaje.channel.send(x.proxyURL) 
        }).catch(e => console.log(e))
        
        }
        mensaje.channel.send(contenido)
}
}
module.exports = { mensaje }