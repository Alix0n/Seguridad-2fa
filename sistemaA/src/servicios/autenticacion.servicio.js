import Usuario from '../modelos/usuario.modelo.js';
import { hashearContrasena, compararContrasena } from '../utils/hash.js';

// Servicio para registrar un nuevo usuario
export const registrarUsuario = async (usuario, contrasena) => {

    const usuarioExistente = await Usuario.findOne({ usuario });

    if (usuarioExistente) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    const contrasenaHasheada = await hashearContrasena(contrasena);

    const nuevoUsuario = new Usuario({
        usuario,
        contrasena: contrasenaHasheada,
        tiene2FA: false
    });

    await nuevoUsuario.save();

    return {
        id: nuevoUsuario._id,
        usuario: nuevoUsuario.usuario,
        tiene2FA: nuevoUsuario.tiene2FA
    };
};

// Servicio para validar credenciales login
export const iniciarSesionUsuario = async (usuario, contrasena) => {
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
        throw new Error('Credenciales incorrectas');
    }

    const coincide = await compararContrasena(
        contrasena,
        usuarioEncontrado.contrasena
    );

    if (!coincide) {
        throw new Error('Credenciales incorrectas');
    }

    return {
        id: usuarioEncontrado._id,
        usuario: usuarioEncontrado.usuario,
        tiene2FA: usuarioEncontrado.tiene2FA
    };
};