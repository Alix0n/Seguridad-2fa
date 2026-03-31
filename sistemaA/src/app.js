import express from 'express';
import cors from 'cors';
import rutasAutenticacion from './rutas/autenticacion.rutas.js';
import rutasSegundoFactor from './rutas/segundoFactor.rutas.js';
import rutasMensajes from './rutas/mensajes.rutas.js';
import { manejadorErrores } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/salud', (req, res) => {
    res.json({ estado: 'ok', mensaje: 'Sistema A - API funcionando correctamente' });
});

app.use('/api/autenticacion', rutasAutenticacion);
app.use('/api/segundo-factor', rutasSegundoFactor);
app.use('/api/mensajes', rutasMensajes);
app.use(manejadorErrores);

export default app;