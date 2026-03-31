import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios.js';

const PanelControl = () => {
    const [contenido, setContenido] = useState('Mensaje de prueba para enviar al sistema B');
    const [respuesta, setRespuesta] = useState(null);
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);

    const navegar = useNavigate();

    // Gestiona el envío del mensaje y la verificación de integridad
    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setRespuesta(null);
        setEnviando(true);

        try {
            // Se asume que el Sistema A tiene la ruta /mensajes/enviar
            const res = await clienteAxios.post('/mensajes/enviar', { contenido });
            setRespuesta(res.data);
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al enviar el mensaje. ¿El Sistema B está encendido?');
        } finally {
            setEnviando(false);
        }
    };

    // Elimina los datos de sesión y redirige al login
    const manejarCerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tempUserId');
        navegar('/login');
    };

    const estilos = {
        contenedor: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '40px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
        cabecera: { borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        titulo: { margin: 0, fontSize: '22px', color: '#1e293b' },
        areaTexto: { width: '100%', height: '120px', padding: '15px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' },
        boton: { padding: '12px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '500', marginTop: '15px' },
        botonSalir: { padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
        cajaRespuesta: { marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', wordBreak: 'break-all' },
        textoHash: { fontFamily: 'monospace', backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#0f172a' }
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.cabecera}>
                <h2 style={estilos.titulo}>Panel de Control - Transmisión</h2>
                <button onClick={manejarCerrarSesion} style={estilos.botonSalir}>Cerrar Sesión</button>
            </div>

            <form onSubmit={manejarEnvio}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#475569' }}>
                    Datos (Mensaje a transmitir):
                </label>
                <textarea
                    style={estilos.areaTexto}
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                />
                <div style={{ textAlign: 'right' }}>
                    <button type="submit" style={estilos.boton} disabled={enviando}>
                        {enviando ? 'Procesando...' : 'Generar Hash y Enviar'}
                    </button>
                </div>
            </form>

            {error && <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '6px', border: '1px solid #f87171' }}>{error}</div>}

            {respuesta && (
                <div style={estilos.cajaRespuesta}>
                    <h3 style={{ color: '#059669', marginTop: 0, fontSize: '18px' }}>Validación Exitosa</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontWeight: '600', color: '#475569' }}>Hash Origen (Sistema A):</span><br />
                        <span style={estilos.textoHash}>{respuesta.datos.hashEnviado}</span>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontWeight: '600', color: '#475569' }}>Hash Verificado (Sistema B):</span><br />
                        <span style={estilos.textoHash}>{respuesta.datos.respuestaSistemaB.datos.hashRecibido}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: '600', color: '#475569' }}>Estado de Integridad:</span>
                        <span style={{ marginLeft: '10px', backgroundColor: '#dcfce3', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                            {respuesta.datos.respuestaSistemaB.datos.estadoIntegridad}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PanelControl;