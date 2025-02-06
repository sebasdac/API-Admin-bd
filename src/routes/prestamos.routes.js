import { Router } from 'express';
import { Ver_Prestamos, Solicitud_CRUD, Ver_Solicitudes } from '../controllers/prestamos.controller.js';

const router = Router();

// Definir rutas
router.get('/listar', Ver_Prestamos); // Crear usuario
router.post('/solicitud', Solicitud_CRUD)
router.post('/solicitudes',Ver_Solicitudes )



export default router; // 👈 Exportamos el router por defecto
