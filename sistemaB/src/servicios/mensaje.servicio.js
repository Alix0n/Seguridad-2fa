import Mensaje from '../modelos/mensaje.modelo.js';
import { generarHashMensaje } from '../utilidades/hash.js';

// Recibe un mensaje, verifica su integridad y lo guarda si es auténtico
export const recibirVerificarMensaje = async (carga, hashRecibido) => {
    console.log("CÁRGA RECIBIDA:", carga);
    const hashCalculado = generarHashMensaje(carga);

    const esIntegro = hashCalculado === hashRecibido;

    if (!esIntegro) {
        console.error('ALERTA DE SEGURIDAD: Se ha detectado un mensaje alterado en tránsito.');
        throw new Error('Integridad comprometida: El mensaje ha sido alterado y fue rechazado.');
    }

    const nuevoMensaje = new Mensaje({
        contenido: carga.contenido,
        remitente: carga.remitente,
        enviadoEl: carga.timestamp,
        hashRecibido: hashRecibido,
        estadoIntegridad: 'Íntegro'
    });
    console.log("REMITENTE:", carga.remitente);

    await nuevoMensaje.save();

    return nuevoMensaje;
};