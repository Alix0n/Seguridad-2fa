// sistemaB/src/configuracion/entorno.js
import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PUERTO: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI
};

// Verifica que las variables de entorno críticas estén presentes
if (!env.MONGO_URI) {
    console.error("❌ ERROR: Falta MONGO_URI en el archivo .env del Sistema B");
    process.exit(1);
}