import * as servicioMensaje from '../servicios/mensaje.servicio.js';

// Extrae el cuerpo del mensaje y el hash para validar su integridad
export const recibirMensaje = async (req, res) => {
    try {
        const { carga, hash } = req.body;

        if (!carga || !hash) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Faltan datos: se requiere el contenido y el hash del mensaje'
            });
        }

        const mensajeGuardado = await servicioMensaje.recibirVerificarMensaje(carga, hash);

        res.status(200).json({
            exito: true,
            mensaje: 'Mensaje recibido y verificado con éxito. Integridad intacta.',
            carga: mensajeGuardado
        });

    } catch (error) {
        if (error.message.includes('Integridad comprometida')) {
            return res.status(403).json({
                exito: false,
                mensaje: error.message
            });
        }
        
        res.status(500).json({ 
            exito: false, 
            mensaje: 'Error interno del servidor B' 
        });
    }
};



