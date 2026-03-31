import axios from 'axios';

// Instancia de axios preconfigurada para conectar con el Sistema A
const clienteAxios = axios.create({
    baseURL: 'http://localhost:3000/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Inyecta el token de autenticación en las cabeceras de cada petición
clienteAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default clienteAxios;