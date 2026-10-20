export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = Number.isInteger(err.status) ? err.status : 500;
  const mensaje =
    status === 400
      ? "El cuerpo de la solicitud no contiene JSON válido."
      : "Ocurrió un error interno en el servidor.";

  if (status >= 500) {
    console.error(err);
  }

  return res.status(status).json({
    exito: false,
    error: mensaje,
  });
}