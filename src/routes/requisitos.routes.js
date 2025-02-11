import { obtenerRequisitos, insertarRequisito, actualizarRequisito, eliminarRequisito, RequisitoConPrestamo} from "../controllers/requisitos.controller.js";
import { Router } from 'express';

const router = Router();

router.get("/requisitos", obtenerRequisitos);
router.post("/requisitos", insertarRequisito);
router.put("/requisitos", actualizarRequisito);
router.delete("/requisitos/:id_requisito", eliminarRequisito);
router.post("/registrar", RequisitoConPrestamo)





export default router; // 👈 Exportamos el router por defecto
