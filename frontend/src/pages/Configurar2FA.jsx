import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios.js';

const Configurar2FA = () => {
    const [codigoQR, setCodigoQR] = useState('');
    const [token2fa, setToken2fa] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navegar = useNavigate();

    // Genera el código QR automáticamente al cargar el componente
    useEffect(() => {
        const generarQR = async () => {
            try {
                const res = await clienteAxios.post('/2fa/generar');
                setCodigoQR(res.data.codigoQR || res.data.datos?.codigoQR);
            } catch (err) {
                setError('No se pudo cargar el QR. Asegúrate de haber iniciado sesión.');
            }
        };
        generarQR();
    }, []);

    // Procesa la verificación del código de 6 dígitos
    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await clienteAxios.post('/2fa/verificar', { token: token2fa });

            setMensaje('¡Seguridad 2FA activada con éxito!');

            setTimeout(() => {
                navegar('/panel');
            }, 1500);

        } catch (err) {
            setError(err.response?.data?.mensaje || 'Código incorrecto o expirado. Intenta de nuevo.');
        }
    };

    const estilos = {
        contenedor: { maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff', textAlign: 'center' },
        input: { width: '200px', padding: '10px', marginTop: '15px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center', fontSize: '18px', letterSpacing: '2px' },
        boton: { width: '200px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
        imagenQR: { width: '200px', height: '200px', margin: '20px auto', display: 'block', border: '1px solid #eee' }
    };

    return (
        <div style={estilos.contenedor}>
            <h2>Configurar Seguridad 2FA</h2>
            <p style={{ color: '#555', fontSize: '14px' }}>
                Escanea este código QR con Google Authenticator o Authy en tu celular.
            </p>

            {error && <p style={{ color: 'red', fontSize: '14px' }}>❌ {error}</p>}
            {mensaje && <p style={{ color: 'green', fontSize: '14px' }}>✅ {mensaje}</p>}

            {codigoQR ? (
                <img src={codigoQR} alt="Código QR 2FA" style={estilos.imagenQR} />
            ) : (
                <p>Cargando código QR...</p>
            )}

            <form onSubmit={manejarEnvio}>
                <input
                    type="text"
                    placeholder="123456"
                    maxLength="6"
                    style={estilos.input}
                    value={token2fa}
                    onChange={(e) => setToken2fa(e.target.value)}
                    required
                />
                <br />
                <button type="submit" style={estilos.boton}>
                    Verificar y Activar
                </button>
            </form>
        </div>
    );
};

export default Configurar2FA;