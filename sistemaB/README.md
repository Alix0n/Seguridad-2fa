# Sistema B - Receptor y Verificador de Integridad

Este microservicio actúa de forma independiente y su única responsabilidad es recibir información del Sistema A, verificar que no haya sido manipulada durante el tránsito en la red y almacenarla de forma segura si pasa las pruebas matemáticas.

## Características Principales
- **Zero Trust (Cero Confianza):** No confía en el sistema emisor ciegamente. Recibe el texto en claro y vuelve a calcular el hash SHA-256 por su cuenta.
- **Validación Estricta:** Compara el hash calculado localmente con el hash enviado en la petición. 
  - Si coinciden = Mensaje Íntegro (Código 200).
  - Si difieren = Ataque MitM / Mensaje Alterado (Código 403 Forbidden).
- **Almacenamiento Seguro:** Solo guarda en su base de datos los mensajes que superan la prueba de integridad.

## Requisitos Previos
- Node.js (v18 o superior recomendado)
- MongoDB (Instancia local o Atlas)

## Instalación y Ejecución

1. Navega a la carpeta del Sistema B y ejecuta:
   npm install
2. Crea un archivo `.env` en la raíz del proyecto:
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/tu_base_de_datos_B
3. Inicia el servidor:
   npm run dev

## Endpoints Principales
- POST /api/mensajes/recibir - Recibe los datos (contenido, emisor, timestamp) y el hash. Realiza la validación matemática y guarda el registro si es auténtico.