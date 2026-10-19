import { Router } from "express";
import {canciones} from '../data/canciones.db.js'
import { agregarCanciones } from "../middlewares/rateLimiter.js";
import { validarCanciones } from "../middlewares/validator.js";
import rateLimit from "express-rate-limit";

const cancion = Router();

cancion.get('/', (req, res, next)=>{
    res.send.json({
        exito: true,
        total: canciones.length,
        rateLimitInfo: req.rateLimit
            ?{
                limiteventana: req.rateLimit.limit,
                usados: req.rateLimit.current,
                tokensRestantes: req.rateLimit.remainig
            }        
            :undefined,
            datos: canciones
    })
})

// Buscar cancion por id

cancion.get("/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
 
  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }
 
  const cancionEncontrada = canciones.find((c) => c.id === idBuscado);
 
  if (!cancionEncontrada) {
    return res.status(404).json({
      exito: false,
      error: `No se encontró ningúna cancion con el ID ${idBuscado}.`
    });
  }
 
  res.status(200).json({
    exito: true,
    mensaje: "cancion encontrada exitosamente.",
    cancion: cancionEncontrada
  });
});


// Insertar canciones

cancion.post("/", agregarCanciones, validarCanciones, (req, res) => {
  const { titulo, autor, duracion } = req.body;
 
  const nuevoId =
    videojuegos.length > 0
      ? Math.max(...canciones.map((c) => c.id)) + 1
      : 1;
 
  const nuevaCancion = {
    id: nuevoId,
    titulo: titulo.trim(),
    autor: autor.trim(),
    duracion: duracion.trim(),
  };
 
  canciones.push(nuevaCancion);
 
  res.status(201).json({
    exito: true,
    mensaje:"Cancion agregada exitosamente al catálogo en memoria.",
    videojuego: nuevaCancion
  });
});


// Actulizar canciones.

cancion.put("/:id", validarCanciones, (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
 
  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }
 
  const indice = canciones.findIndex((c) => c.id === idBuscado);
 
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede actualizar: No existe una cancion con ID ${idBuscado}.`
    });
  }
 
  const { titulo, autor, duracion } = req.body;
 
  const nuevaCancion = {
    id: nuevoId,
    titulo: titulo.trim(),
    autor: autor.trim(),
    duracion: duracion.trim(),
  };;
 
  res.status(200).json({
    exito: true,
    mensaje: `Cancion con ID ${idBuscado} actualizado correctamente.`,
    cancion: canciones[indice]
  });
});

// Eliminar cancion
cancion.delete("/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
 
  if (isNaN(idBuscado)) {
    return res.status(400).json({
      exito: false,
      error: "El parámetro ID debe ser un número entero válido."
    });
  }
 
  const indice = canciones.findIndex((j) => j.id === idBuscado);
 
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      error: `No se puede eliminar: No existe la cancion con ID ${idBuscado}.`
    });
  }
 
  const [cancionEliminada] = canciones.splice(indice, 1);
 
  res.status(200).json({
    exito: true,
    mensaje: `Cancion con ID ${idBuscado} eliminado del catálogo.`,
    cancion:cancionEliminada
  });
});
 
export default cancion;