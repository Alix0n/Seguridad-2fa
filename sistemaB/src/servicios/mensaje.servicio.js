import Mensaje from '../modelos/mensaje.modelo.js';
import { generarHashMensaje } from '../utilidades/hash.js';

// Recibe un mensaje, verifica su integridad y lo guarda si es auténtico
export const recibirVerificarMensaje = async (datos, hashRecibido) => {
    const hashCalculado = generarHashMensaje(datos);

    const esIntegro = hashCalculado === hashRecibido;

    if (!esIntegro) {
        console.error('ALERTA DE SEGURIDAD: Se ha detectado un mensaje alterado en tránsito.');
        throw new Error('Integridad comprometida: El mensaje ha sido alterado y fue rechazado.');
    }

    const nuevoMensaje = new Mensaje({
        contenido: datos.contenido,
        emisor: datos.emisor,
        enviadoEl: datos.timestamp,
        hashRecibido: hashRecibido,
        estadoIntegridad: 'Íntegro'
    });

    await nuevoMensaje.save();

    return nuevoMensaje;
};