import express from 'express';
import cors from 'cors';
import rutasMensajes from './rutas/mensaje.rutas.js';

const app = express();

app.use(cors());
app.use(express.json());

// Registra las rutas para la gestión de mensajes
app.use('/api/mensajes', rutasMensajes);

export default app;