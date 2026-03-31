import * as servicioSegundoFactor from '../servicios/segundoFactor.servicio.js';
import { generarToken } from '../utils/jwt.js';

// 1. Generar el secreto y el QR (Requiere que el usuario ya esté logueado/registrado)
export const generar2FA = async (req, res, next) => {
    try {
        // req.usuario.id viene de nuestro middleware de autenticación
        const usuarioId = req.usuario.id; 

        const { codigoQR, secretoBase32 } = await servicioSegundoFactor.configurar2FA(usuarioId);

        res.status(200).json({
            exito: true,
            mensaje: 'Código 2FA generado. Escanea el QR con tu aplicación (ej. Google Authenticator o Authy).',
            datos: {
                codigoQR,
                secretoBase32
            }
        });

    } catch (error) {
        next(error);
    }
};

// 2. Verificar el primer código para activar el 2FA permanentemente
export const verificar2FA = async (req, res, next) => {
    try {
        const usuarioId = req.usuario.id;
        const { token } = req.body; // código de 6 dígitos

        if (!token) {
            return res.status(400).json({ 
                exito: false, 
                mensaje: 'El código 2FA es obligatorio' 
            });
        }

        await servicioSegundoFactor.verificarYActivar2FA(usuarioId, token);

        res.status(200).json({
            exito: true,
            mensaje: '¡Autenticación de dos factores (2FA) activada exitosamente en tu cuenta!'
        });

    } catch (error) {
        if (error.message.includes('incorrecto') || error.message.includes('expirado')) {
            return res.status(400).json({ 
                exito: false, 
                mensaje: error.message 
            });
        }
        next(error);
    }
};

// 3. Validar el código durante el Login (PASO CRÍTICO)
export const validarLogin2FA = async (req, res, next) => {
    try {
        const { usuarioId, token } = req.body;

        if (!usuarioId || !token) {
            return res.status(400).json({ 
                exito: false, 
                mensaje: 'Faltan datos (usuarioId o código)' 
            });
        }

        // Validamos el código en el servicio
        const usuario = await servicioSegundoFactor.validarLogin2FA(usuarioId, token);

        // Si es correcto → generamos el JWT final
        const tokenFinal = generarToken({ 
            id: usuario._id, 
            usuario: usuario.usuario 
        });

        res.status(200).json({
            exito: true,
            mensaje: 'Acceso permitido. 2FA correcto.',
            token: tokenFinal,
            usuario: {
                id: usuario._id,
                usuario: usuario.usuario,
                tiene2FA: usuario.tiene2FA
            }
        });

    } catch (error) {
        if (error.message.includes('incorrecto')) {
            return res.status(401).json({ 
                exito: false, 
                mensaje: 'Acceso denegado: Código 2FA incorrecto' 
            });
        }
        next(error);
    }
};