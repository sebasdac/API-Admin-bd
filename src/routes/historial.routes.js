import { Router } from 'express';
import {Ver_HistorialRequisitos} from '../controllers/historialrequisitos.controller.js';

const router = Router();

// Definir rutas
router.get('/ver', Ver_HistorialRequisitos); // Crear usuario





export default router; // 👈 Exportamos el router por defecto
