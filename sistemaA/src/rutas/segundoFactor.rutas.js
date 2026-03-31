import { Router } from 'express';
import { generar2FA, verificar2FA, validarLogin2FA } from '../controladores/segundoFactor.controlador.js';
import { requerirAutenticacion } from '../middlewares/autenticacion.middleware.js';

const enrutador = Router();

// Genera el código QR y el secreto
enrutador.post('/generar', requerirAutenticacion, generar2FA);

// Verifica el primer código ingresado para activar el 2FA en la cuenta
enrutador.post('/verificar', requerirAutenticacion, verificar2FA);

// Esta ruta se usa durante el inicio de sesión para validar el código 2FA.
enrutador.post('/validar-login', validarLogin2FA);

export default enrutador;