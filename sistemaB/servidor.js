import app from './app.js';
import { env } from './configuracion/entorno.js';
import { conectarDB } from './configuracion/bd.js';

// Conecta a la base de datos e inicia el servidor del Sistema B
const iniciarServidor = async () => {
    await conectarDB();
    
    app.listen(env.PUERTO, () => {
        console.log(`📡 Sistema B (Receptor) a la escucha de mensajes en: http://localhost:${env.PUERTO}`);
    });
};

iniciarServidor();