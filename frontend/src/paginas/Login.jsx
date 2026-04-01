import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios.js';

const Login = () => {
    const [estaRegistrando, setEstaRegistrando] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const navegar = useNavigate();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        try {
            if (estaRegistrando) {
                // Registro de usuario
                await clienteAxios.post('/autenticacion/registrar', { usuario, contrasena });
                setMensaje('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
                setEstaRegistrando(false);
                setContrasena('');
            } else {
                // Inicio de sesión
                const res = await clienteAxios.post('/autenticacion/iniciar-sesion', { usuario, contrasena });

                if (res.data.requiere2FA) {
                    localStorage.setItem('idUsuarioTemporal', res.data.usuarioId);
                    navegar('/verificar-2fa');
                } else {
                    localStorage.setItem('token', res.data.token);
                    navegar('/configurar-2fa');
                }
            }
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error de conexión con el servidor');
        }
    };

    const estilos = {
        contenedor: { width: '100%', maxWidth: '450px', margin: '0 auto', padding: '40px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
        cabecera: { textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: '600', color: '#1e293b' },
        grupoInput: { marginBottom: '20px' },
        etiqueta: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#475569' },
        input: { width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px', boxSizing: 'border-box', outline: 'none' },
        boton: { width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '500', marginTop: '10px' },
        botonSecundario: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginTop: '15px' }
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.cabecera}>
                {estaRegistrando ? 'Crear Nueva Cuenta' : 'Acceso al Sistema'}
            </div>

            {error && <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
            {mensaje && <div style={{ padding: '10px', backgroundColor: '#dcfce3', color: '#166534', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>{mensaje}</div>}

            <form onSubmit={manejarEnvio}>
                <div style={estilos.grupoInput}>
                    <label style={estilos.etiqueta}>Usuario</label>
                    <input
                        type="text"
                        style={estilos.input}
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div style={estilos.grupoInput}>
                    <label style={estilos.etiqueta}>Contraseña</label>
                    <input
                        type="password"
                        style={estilos.input}
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={estilos.boton}>
                    {estaRegistrando ? 'Registrar Usuario' : 'Iniciar Sesión'}
                </button>
            </form>

            <button type="button" style={estilos.botonSecundario} onClick={() => setEstaRegistrando(!estaRegistrando)}>
                {estaRegistrando ? 'Volver al inicio de sesión' : 'Crear una cuenta nueva'}
            </button>
        </div>
    );
};

export default Login;