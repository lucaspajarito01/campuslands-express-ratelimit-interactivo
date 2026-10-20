# API de canciones - Campuslands

API REST desarrollada con Node.js y Express para consultar y administrar un
catálogo de canciones. Incluye validación de datos, registro de solicitudes y
límites de uso por dirección IP. El catálogo se almacena en memoria, por lo
que los cambios se pierden al reiniciar el servidor.

## Requisitos e instalación

Se requiere Node.js y npm. Desde la carpeta del proyecto, instala las
dependencias:

```bash
npm install
```

## Ejecución

```bash
npm run dev   # Inicia el servidor en modo de desarrollo con recarga automática
npm start     # Inicia el servidor normalmente
```

La API queda disponible en `http://localhost:3000`. Para cambiar el puerto,
define la variable de entorno `PORT`.

## Uso de la API

Puedes consumir los endpoints desde Postman, Insomnia o cualquier cliente HTTP:

| Método | Ruta | Función |
| --- | --- | --- |
| `GET` | `/` | Muestra información general de la API |
| `GET` | `/api/canciones` | Lista todas las canciones |
| `GET` | `/api/canciones/:id` | Busca una canción por ID |
| `POST` | `/api/canciones` | Agrega una canción |
| `PUT` | `/api/canciones/:id` | Reemplaza los datos de una canción |
| `DELETE` | `/api/canciones/:id` | Elimina una canción |

Para las solicitudes `POST` y `PUT`, envía `Content-Type: application/json` y
un cuerpo con los campos obligatorios `titulo`, `autor` y `duracion`. La
duración debe tener formato `MM:SS` y ser mayor que `00:00`.

```json
{
  "titulo": "Mi canción",
  "autor": "Artista",
  "duracion": "03:45"
}
```

La API limita las rutas `/api` a 5 solicitudes por minuto por IP y las
solicitudes de creación (`POST /api/canciones`) a 4 por minuto por IP. Al
superar el límite, responde con el estado `429`.

## Estructura del proyecto

```text
src/
├── app.js                       # Configuración e inicio de Express
├── helperLimit.js               # Archivo auxiliar (sin implementación actual)
├── data/
│   └── canciones.db.js          # Catálogo inicial en memoria
├── middlewares/
│   ├── errorHandler.js          # Manejo centralizado de errores
│   ├── logger.js                # Registro de solicitudes
│   ├── rateLimiter.js           # Límites por IP
│   └── validator.js             # Validación de canciones
└── routes/
    └── canciones.router.js      # Rutas CRUD de canciones
```

## Librerías principales

- **express**: creación del servidor y definición de rutas HTTP.
- **express-rate-limit**: limitación de solicitudes por IP.
- **nodemon** (desarrollo): reinicio automático del servidor al cambiar archivos.

## Autor

**lucaspajarito01** — [Repositorio del proyecto](https://github.com/lucaspajarito01/campuslands-express-ratelimit-interactivo).
