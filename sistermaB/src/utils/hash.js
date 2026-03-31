// sistemaB/src/utils/hash.js
import crypto from 'crypto';

// Genera una huella única (hash) para el mensaje recibido
export const generarHashMensaje = (contenidoMensaje) => {
    const cadenaDatos = typeof contenidoMensaje === 'string' 
        ? contenidoMensaje 
        : JSON.stringify(contenidoMensaje);
    
    return crypto
        .createHash('sha256')
        .update(cadenaDatos)
        .digest('hex');
};