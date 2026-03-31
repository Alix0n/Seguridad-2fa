import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Genera un secreto único para el usuario
export const generarSecreto2FA = () => {
    const secreto = speakeasy.generateSecret({
        name: 'SistemaSeguro_App'
    });
    
    return {
        base32: secreto.base32, 
        urlAutenticacion: secreto.otpauth_url 
    };
};

// Convierte la URL en un código QR (Base64)
export const generarCodigoQR = async (urlAutenticacion) => {
    try {
        const codigoQR = await QRCode.toDataURL(urlAutenticacion);
        return codigoQR;
    } catch (error) {
        console.error('Error generando el código QR:', error);
        throw new Error('No se pudo generar el código QR');
    }
};

// Verifica el código ingresado por el usuario
export const verificarToken2FA = (secretoBase32, tokenUsuario) => {
    return speakeasy.totp.verify({
        secret: secretoBase32,
        encoding: 'base32',
        token: tokenUsuario,
        window: 1 // tolerancia de tiempo
    });
};