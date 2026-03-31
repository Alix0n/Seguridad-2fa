import mongoose from 'mongoose';

const esquemaUsuario = new mongoose.Schema({
    usuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    // Campos para 2FA
    secreto2FA: {
        type: String,
    },
    tiene2FA: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Usuario', esquemaUsuario);