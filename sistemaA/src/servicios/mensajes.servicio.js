import { generarHashMensaje } from '../utils/hash.js';

// Servicio para enviar el mensaje al Sistema B
export const enviarMensajeASistemaB = async (contenido, usuario) => {

    const carga = {
        contenido: contenido,
        remitente: usuario,
        timestamp: new Date().toISOString()
    };

    const hashMensaje = generarHashMensaje(carga);
    const urlSistemaB = process.env.SISTEMA_B_URL || 'http://127.0.0.1:4000/api/mensajes/recibir';

    try {
        const respuesta = await fetch(urlSistemaB, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                carga: carga,
                hash: hashMensaje
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.mensaje || `El Sistema B rechazó el mensaje (Status: ${respuesta.status})`
            );
        }

        return {
            exito: true,
            respuestaSistemaB: datos,
            hashEnviado: hashMensaje
        };

    } catch (error) {
        console.error('Error de conexión con Sistema B:', error.message);
        throw new Error('No se pudo entregar el mensaje al Sistema B. ¿Está activo?');
    }
};