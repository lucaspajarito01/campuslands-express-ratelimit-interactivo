export function validarCanciones(req, res, next) {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        return res.status(400).json({
            exito: false,
            error: "Ingrese un objeto JSON valido"
        });
    };

    const { titulo, autor, duracion } = req.body;

    if (typeof titulo !== "string" || titulo.trim().length === 0) {
        return res.status(400).json({
            exito: false,
            error: "El nombre de la cancion es obligatorio y debe ser una cadena de texto"
        });
    };

    if (typeof autor !== "string" || autor.trim().length === 0) {
        return res.status(400).json({
            exito: false,
            error: "El nombre del autor es obligatorio"
        });
    };

    if (typeof duracion !== "string" || !/^\d{2}:[0-5]\d$/.test(duracion)) {
        return res.status(400).json({
            exito: false,
            error: "La duracion debe tener el formato MM:SS, con segundos entre 00 y 59"
        });
    };

    if (duracion === "00:00") {
        return res.status(400).json({
            exito: false,
            error: "La duracion debe ser mayor que 00:00"
        });
    };

    next();
}
