import { obtenerPrestamoRequisitos, insertarPrestamoRequisito, eliminarPrestamoRequisito } from "../controllers/prestamos_Requisitos.controller.js";
import { Router } from 'express';

const router = Router();

router.get("/prestamo-requisitos", obtenerPrestamoRequisitos);
router.post("/prestamo-requisitos", insertarPrestamoRequisito);
router.delete("/prestamo-requisitos", eliminarPrestamoRequisito);

export default router; // 👈 Exportamos el router por defecto
