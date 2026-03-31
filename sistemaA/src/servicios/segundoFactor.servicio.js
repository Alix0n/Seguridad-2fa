import Usuario from '../modelos/usuario.modelo.js';
import { generarSecreto2FA, generarCodigoQR, verificarToken2FA } from '../utils/otp.js';

export const configurar2FA = async (usuarioId) => {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');

    const secreto = generarSecreto2FA();

    usuario.secreto2FA = secreto.base32;
    await usuario.save();

    const codigoQR = await generarCodigoQR(secreto.urlAutenticacion);

    return {
        codigoQR,
        secretoBase32: secreto.base32
    };
};

export const verificarYActivar2FA = async (usuarioId, token) => {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');

    const esValido = verificarToken2FA(usuario.secreto2FA, token);

    if (!esValido) {
        throw new Error('El código 2FA es incorrecto o ha expirado');
    }

    usuario.tiene2FA = true;
    await usuario.save();

    return true;
};

export const validarLogin2FA = async (usuarioId, token) => {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');

    if (!usuario.tiene2FA) {
        throw new Error('El 2FA no está habilitado para este usuario');
    }

    const esValido = verificarToken2FA(usuario.secreto2FA, token);
    if (!esValido) {
        throw new Error('Código 2FA incorrecto');
    }

    return usuario;
};