import { verificarToken } from '../utils/jwt.js';

export const requerirAutenticacion = (req, res, next) => {
    // Busca el token en las cabeceras de la petición
    const cabeceraAutorizacion = req.headers.authorization;

    // Verifica que exista y que tenga el formato correcto 
    if (!cabeceraAutorizacion || !cabeceraAutorizacion.startsWith('Bearer ')) {
        return res.status(401).json({ 
            exito: false, 
            mensaje: 'Acceso denegado. No se proporcionó un token o el formato es incorrecto.' 
        });
    }

    // Extrae el token quitando Bearer
    const token = cabeceraAutorizacion.split(' ')[1];

    //Veririca el token 
    const payloadDecodificado = verificarToken(token);

    if (!payloadDecodificado) {
        return res.status(401).json({ 
            exito: false, 
            mensaje: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' 
        });
    }

    // Guarda los datos del usuario en req
    req.usuario = payloadDecodificado;
    next();
};