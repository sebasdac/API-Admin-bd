import { Router } from 'express';
import { Ver_Prestamos, Solicitud_CRUD, Ver_Solicitudes, Ver, Insertar_Prestamo, Actualizar_Prestamo, Eliminar_Prestamo, CalcularMensualidad } from '../controllers/prestamos.controller.js';

const router = Router();

// Definir rutas
router.get('/listar', Ver_Prestamos); // Crear usuario
router.post('/solicitud', Solicitud_CRUD)
router.get('/solicitudes/:ID_Cliente', Ver_Solicitudes);


router.get("/ver", Ver);
router.post("/crear", Insertar_Prestamo);
router.put("/actualizar/:id_prestamo", Actualizar_Prestamo);
router.delete("/eliminar/:id_prestamo", Eliminar_Prestamo);

router.get("/calculomensual/:id_solicitud", CalcularMensualidad)




export default router; // 👈 Exportamos el router por defecto
