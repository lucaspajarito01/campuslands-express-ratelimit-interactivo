import {rateLimit} from "express-rate-limit";

export const apiLimiter =rateLimit({
 windowMs: 60 * 1000, //Equivalenta a 1 min.
 limit: 4, //Limite de solicitudes para una una ventana de 1 minuto.
 statusCode: 429, // To many requests.
 standardHeaders:"draft-7",
 legacyHeaders:true,
 message:{
    exito: false,
    status: 429,
    error: 'Han sido demasiandas solicitudes a esta misma IP',
    detalle: 'Has agotado tus tokens de solicitudes.'
 }
});


export const  agregarCanciones = rateLimit({
    windowMs: 60 * 1000,
    limit: 4, 
    statusCode: 429,
    standardHeaders: "draft-7",
    legacyHeaders:true,
    message:{
        exito: false,
        status: 429,
        error: 'Limete de creacion en un minito alcanzado',
        detalle: 'espera a reiniciar la pagina'
    }
});