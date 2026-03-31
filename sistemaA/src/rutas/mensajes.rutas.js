import { Router } from 'express';
import { enviarMensaje } from '../controladores/mensajes.controlador.js';
import { requerirAutenticacion } from '../middlewares/autenticacion.middleware.js';

const enrutador = Router();

// Ruta para enviar un mensaje: POST /api/mensajes/enviar
enrutador.post('/enviar', requerirAutenticacion, enviarMensaje);

export default enrutador;