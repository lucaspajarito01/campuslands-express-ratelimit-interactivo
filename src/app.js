import express from "express";
import cancionesRouter from "./routes/canciones.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "Bienvenido a la API de canciones de Campuslands.",
    seguridad: "Rate limit activo en /api: 5 solicitudes por minuto por IP.",
    almacenamiento: "Catálogo de canciones en memoria.",
    endpoints: {
      listar_canciones: "GET /api/canciones",
      buscar_cancion: "GET /api/canciones/:id",
      crear_cancion: "POST /api/canciones",
      actualizar_cancion: "PUT /api/canciones/:id",
      eliminar_cancion: "DELETE /api/canciones/:id",
    },
  });
});

app.use("/api", apiLimiter);
app.use("/api/canciones", cancionesRouter);

app.use((req, res) => {
  res.status(404).json({
    exito: false,
    error: `La ruta '${req.method} ${req.originalUrl}' no existe.`,
  });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API de canciones disponible en http://localhost:${PORT}`);
    console.log("Rate limit: 5 solicitudes por minuto en /api.");
  });
}

export default app;
