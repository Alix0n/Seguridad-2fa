import mongoose from 'mongoose';

// Establece la conexión con la base de datos MongoDB
export const conectarDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectado (Sistema B): ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión a MongoDB (Sistema B): ${error.message}`);
        process.exit(1); 
    }
};