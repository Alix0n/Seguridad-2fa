import * as servicioAutenticacion from '../servicios/autenticacion.servicio.js';
import { generarToken } from '../utils/jwt.js';

export const registrar = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validación básica
        if (!usuario || !contrasena) {
            return res.status(400).json({ 
                exito: false, 
                mensaje: 'El usuario y la contraseña son obligatorios' 
            });
        }

        // Se llama al servicio que tiene la lógica de negocio
        const usuarioCreado = await servicioAutenticacion.registrarUsuario(usuario, contrasena);

        res.status(201).json({
            exito: true,
            mensaje: 'Usuario registrado exitosamente',
            datos: usuarioCreado
        });

    } catch (error) {
        next(error); 
    }
};

export const iniciarSesion = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            return res.status(400).json({ 
                exito: false, 
                mensaje: 'Faltan credenciales' 
            });
        }

        const usuarioEncontrado = await servicioAutenticacion.iniciarSesionUsuario(usuario, contrasena);

        // Logica de 2FA
        if (usuarioEncontrado.tiene2FA) {
            return res.status(200).json({
                exito: true,
                requiere2FA: true,
                usuarioId: usuarioEncontrado.id,
                mensaje: 'Credenciales válidas. Se requiere código 2FA.'
            });
        }

        const token = generarToken({id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario});

        res.status(200).json({
            exito: true,
            requiere2FA: false,
            mensaje: 'Inicio de sesión exitoso. Recuerda configurar tu 2FA',
            token,
            usuario: usuarioEncontrado
        });

    } catch (error) {
        if (error.message === 'Credenciales incorrectas') {
            return res.status(401).json({ 
                exito: false, 
                mensaje: error.message 
            });
        }
        next(error);
    }
};