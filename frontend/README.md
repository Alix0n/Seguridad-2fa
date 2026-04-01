# Frontend - Interfaz de Usuario y Cliente Web

Aplicación web (Single Page Application) construida para proveer una interfaz gráfica a la arquitectura de seguridad. Permite interactuar con los sistemas sin necesidad de utilizar herramientas de línea de comandos.

## Características Principales
- **Flujo de Seguridad Completo:** Pantallas dedicadas para Registro, Login, Configuración de 2FA (Escaneo de QR) y Validación de Token TOTP.
- **Gestión de Sesión:** Manejo automático del Token JWT utilizando interceptores de Axios para proteger las rutas privadas.
- **Dashboard de Integridad:** Interfaz que permite enviar mensajes y visualizar en tiempo real la respuesta del Sistema B, mostrando los hashes comparados.

## Tecnologías Utilizadas
- **React 18** e **Vite**
- **React Router Dom** y **Axios**

## Instalación y Ejecución

1. Navega a la carpeta del frontend y ejecuta:
   npm install
2. Inicia el servidor de desarrollo:
   npm run dev
   (La aplicación se abrirá en `http://localhost:5173`)

## Estructura del Proyecto
- `/src/api/axios.js`: Configuración centralizada de peticiones HTTP.
- `/src/paginas/Login.jsx`: Componente dual para iniciar sesión o crear cuenta.
- `/src/paginas/Configurar2FA.jsx`: Renderizado del código QR y primera vinculación.
- `/src/paginas/Verificar2FA.jsx`: Pantalla de validación para inicios de sesión.
- `/src/paginas/PanelControl.jsx`: Centro de control para enviar mensajes.