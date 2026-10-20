import { Router } from "express";
import { canciones } from "../data/canciones.db.js";
import { agregarCanciones } from "../middlewares/rateLimiter.js";
import { validarCanciones } from "../middlewares/validator.js";

const cancionesRouter = Router();

function obtenerId(req, res) {
  if (!/^\d+$/.test(req.params.id)) {
    res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido.",
    });
    return null;
  }

  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id)) {
    res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido.",
    });
    return null;
  }

  return id;
}

cancionesRouter.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    total: canciones.length,
    rateLimitInfo: req.rateLimit
      ? {
          limiteVentana: req.rateLimit.limit,
          usados: req.rateLimit.used,
          tokensRestantes: req.rateLimit.remaining,
        }
      : undefined,
    datos: canciones,
  });
});

cancionesRouter.get("/:id", (req, res) => {
  const id = obtenerId(req, res);
  if (id === null) return;

  const cancion = canciones.find((item) => item.id === id);
  if (!cancion) {
    return res.status(404).json({
      exito: false,
      error: `No se encontró una canción con el ID ${id}.`,
    });
  }

  return res.status(200).json({
    exito: true,
    mensaje: "Canción encontrada exitosamente.",
    cancion,
  });
});

cancionesRouter.post("/", agregarCanciones, validarCanciones, (req, res) => {
  const { titulo, autor, duracion } = req.body;
  const nuevoId = canciones.reduce(
    (maxId, cancion) => Math.max(maxId, cancion.id),
    0,
  ) + 1;
  const nuevaCancion = {
    id: nuevoId,
    titulo: titulo.trim(),
    autor: autor.trim(),
    duracion: duracion.trim(),
  };

  canciones.push(nuevaCancion);

  return res.status(201).json({
    exito: true,
    mensaje: "Canción agregada exitosamente al catálogo.",
    cancion: nuevaCancion,
  });
});

cancionesRouter.put("/:id", validarCanciones, (req, res) => {
  const id = obtenerId(req, res);
  if (id === null) return;

  const indice = canciones.findIndex((cancion) => cancion.id === id);
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede actualizar: no existe una canción con ID ${id}.`,
    });
  }

  const { titulo, autor, duracion } = req.body;
  canciones[indice] = {
    id,
    titulo: titulo.trim(),
    autor: autor.trim(),
    duracion: duracion.trim(),
  };

  return res.status(200).json({
    exito: true,
    mensaje: `Canción con ID ${id} actualizada correctamente.`,
    cancion: canciones[indice],
  });
});

cancionesRouter.delete("/:id", (req, res) => {
  const id = obtenerId(req, res);
  if (id === null) return;

  const indice = canciones.findIndex((cancion) => cancion.id === id);
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede eliminar: no existe la canción con ID ${id}.`,
    });
  }

  const [cancionEliminada] = canciones.splice(indice, 1);
  return res.status(200).json({
    exito: true,
    mensaje: `Canción con ID ${id} eliminada del catálogo.`,
    cancion: cancionEliminada,
  });
});

export default cancionesRouter;
