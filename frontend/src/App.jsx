import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Acceso from './paginas/Acceso.jsx';
import Configurar2FA from './paginas/Configurar2FA.jsx';
import Verificar2FA from './paginas/Verificar2FA.jsx';
import PanelControl from './paginas/PanelControl.jsx';

// Define la estructura de navegación y las rutas protegidas de la aplicación
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/acceso" />} />
                <Route path="/acceso" element={<Acceso />} />
                <Route path="/configurar-2fa" element={<Configurar2FA />} />
                <Route path="/verificar-2fa" element={<Verificar2FA />} />
                <Route path="/panel" element={<PanelControl />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;