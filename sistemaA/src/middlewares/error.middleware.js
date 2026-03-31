export const manejadorErrores = (err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);
    if (err.stack) {
        console.error(err.stack);
    }

    const codigoEstado = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(codigoEstado).json({
        exito: false,
        mensaje: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};