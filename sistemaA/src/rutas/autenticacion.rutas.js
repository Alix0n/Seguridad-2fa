import { Router } from 'express';
import { registrar, iniciarSesion } from '../controladores/autenticacion.controlador.js';

const enrutador = Router();

// Ruta para registrar un nuevo usuario: POST /api/autenticacion/registrar
enrutador.post('/registrar', registrar);

// Ruta para iniciar sesión: POST /api/autenticacion/iniciar-sesion
enrutador.post('/iniciar-sesion', iniciarSesion);

export default enrutador;