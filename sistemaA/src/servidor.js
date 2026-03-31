import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

const iniciarServidor = async () => {
    try {
        await connectDB();

        app.listen(env.PUERTO, () => {
            console.log(`Servidor del Sistema A corriendo en: http://localhost:${env.PUERTO}`);
            console.log(`Health check: http://localhost:${env.PUERTO}/api/salud`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

iniciarServidor();
