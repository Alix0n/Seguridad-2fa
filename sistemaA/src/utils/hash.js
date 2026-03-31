import bcrypt from 'bcrypt';
import crypto from 'crypto'; 

const RONDAS_SALT = 10;

export const hashearContrasena = async (contrasena) => {
    return await bcrypt.hash(contrasena, RONDAS_SALT);
};

// Compara una contraseña en texto plano con un hash guardado
export const compararContrasena = async (contrasena, contrasenaHasheada) => {
    return await bcrypt.compare(contrasena, contrasenaHasheada);
};

// Genera una huella única (hash) para el mensaje
export const generarHashMensaje = (cargaMensaje) => {
    // Si es objeto → lo convertimos a string
    const cadenaDatos = typeof cargaMensaje === 'string' 
        ? cargaMensaje 
        : JSON.stringify(cargaMensaje);
    
    // hash SHA-256
    return crypto
        .createHash('sha256')
        .update(cadenaDatos)
        .digest('hex');
};