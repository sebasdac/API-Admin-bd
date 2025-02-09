import express from "express";
import { obtenerSolicitudes, crearSolicitud, actualizarSolicitud, eliminarSolicitud, Obtener_Solicitud, Realizar_Pago} from "../controllers/solicitudes.controller.js";

const router = express.Router();

router.get("/listar", obtenerSolicitudes);
router.post("/crear", crearSolicitud);
router.put("/actualizar/:id_solicitud", actualizarSolicitud);
router.delete("/eliminar/:id_solicitud", eliminarSolicitud);
router.get('/solicitudpersona/:id_persona', Obtener_Solicitud)
router.put('/pagar', Realizar_Pago)

export default router;
