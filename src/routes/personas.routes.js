import { Router } from 'express';
import {actualizarPersonaSoloDatos} from '../controllers/personas.controller.js';

const router = Router();

// Definir rutas
router.put('/actualizarpersona', actualizarPersonaSoloDatos); // Crear usuario





export default router; // 👈 Exportamos el router por defecto
