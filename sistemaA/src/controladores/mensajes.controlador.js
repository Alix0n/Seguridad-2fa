import * as servicioMensajes from '../servicios/mensajes.servicio.js';

export const enviarMensaje = async (req, res, next) => {
    try {
        const { contenido } = req.body;
        const usuario = req.usuario.usuario; 

        if (!contenido || contenido.trim() === '') {
            return res.status(400).json({ 
                exito: false, 
                mensaje: 'El contenido del mensaje es obligatorio' 
            });
        }

        // Llamada al servicio que generará el hash y enviará la petición al Sistema B
        const resultado = await servicioMensajes.enviarMensajeASistemaB(contenido, usuario);

        res.status(200).json({
            exito: true,
            mensaje: 'Mensaje enviado y procesado exitosamente',
            datos: resultado
        });

    } catch (error) {
        next(error);
    }
};