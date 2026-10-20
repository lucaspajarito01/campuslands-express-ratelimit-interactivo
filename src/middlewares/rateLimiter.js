import { rateLimit } from "express-rate-limit";

const unaMinuto = 60 * 1000;

export const apiLimiter = rateLimit({
  windowMs: unaMinuto,
  limit: 5,
  statusCode: 429,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    exito: false,
    status: 429,
    error: "Se alcanzó el límite de solicitudes a la API.",
    detalle: "Espera un minuto antes de volver a intentarlo.",
  },
});

export const agregarCanciones = rateLimit({
  windowMs: unaMinuto,
  limit: 4,
  statusCode: 429,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    exito: false,
    status: 429,
    error: "Se alcanzó el límite de creación de canciones.",
    detalle: "Espera un minuto antes de volver a intentarlo.",
  },
});