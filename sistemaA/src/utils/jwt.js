import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// Genera un token firmado con los datos del usuario
export const generarToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN
    });
};

// Verifica si un token es válido y no ha expirado
export const verificarToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        return null; 
    }
};