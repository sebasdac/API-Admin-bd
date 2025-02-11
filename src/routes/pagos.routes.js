import { Router } from 'express';
import {obtenerPagoPorID} from '../controllers/pagos.controller.js';

const router = Router();

// Definir rutas
router.post('/ver', obtenerPagoPorID); // Crear usuario





export default router; // 👈 Exportamos el router por defecto
