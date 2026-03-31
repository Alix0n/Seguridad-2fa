import mongoose from 'mongoose';

const mensajeSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    remitente: {
        type: String,
        required: true
    },
    enviadoEl: {
        type: String, // Timestamp exacto en el que el Sistema A realizó el envío
        required: true
    },
    hashRecibido: {
        type: String,
        required: true
    },
    estadoIntegridad: {
        type: String,
        enum: ['Íntegro', 'Alterado'],
        default: 'Íntegro'
    }
}, {
    timestamps: true // Fecha en la que el Sistema B recibió y guardó el registro
});

export default mongoose.model('Mensaje', mensajeSchema);