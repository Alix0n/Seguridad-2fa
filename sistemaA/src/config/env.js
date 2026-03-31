import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PUERTO: process.env.PUERTO || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
};

if (!env.MONGO_URI) {
    console.error("ERROR: Falta MONGO_URI en el archivo .env");
    process.exit(1);
}
if (!env.JWT_SECRET) {
    console.error("ERROR: Falta JWT_SECRET en el archivo .env");
    process.exit(1);
}