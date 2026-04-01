import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios.js';

const Verificar2FA = () => {
    const [token2fa, setToken2fa] = useState('');
    const [error, setError] = useState('');
    const navegar = useNavigate();

    // Procesa la validación del código para completar el inicio de sesión
    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        
        // Recupera el ID temporal que guardó el proceso de Login
        const idTemporal = localStorage.getItem('idUsuarioTemporal');

        try {
            const res = await clienteAxios.post('/segundo-factor/validar-login', { 
                usuarioId: idTemporal, 
                token: token2fa 
            });
            
            // Si el código es correcto, guardamos el Token real y limpiamos los temporales
            localStorage.setItem('token', res.data.token);
            localStorage.removeItem('idUsuarioTemporal');   
            
            navegar('/panel');
            
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Código incorrecto. Intenta de nuevo.');
        }
    };

    const estilos = {
        contenedor: { maxWidth: '350px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', backgroundColor: '#fff' },
        input: { width: '100%', padding: '10px', marginTop: '15px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center', fontSize: '18px', letterSpacing: '2px', boxSizing: 'border-box' },
        boton: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
    };

    return (
        <div style={estilos.contenedor}>
            <h2>Validación de Seguridad</h2>
            <p>Ingresa el código de 6 dígitos de tu aplicación Authenticator.</p>

            {error && <p style={{ color: 'red', fontSize: '14px' }}>❌ {error}</p>}

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
                <button type="submit" style={estilos.boton}>Entrar</button>
            </form>
        </div>
    );
};

export default Verificar2FA;