import { Router } from 'express';
import { recibirMensaje } from '../controladores/mensaje.controlador.js';

const router = Router();

// Ruta por la que el Sistema A enviará los mensajes: POST /api/mensajes/recibir
router.post('/recibir', recibirMensaje);

export default router;