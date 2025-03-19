import { Router } from 'express';
import { CalcularMensualidad } from '../controllers/calculomensual.controller.js';

const router = Router();

// Definir rutas
router.get('/calcular', CalcularMensualidad); // Crear usuario





export default router; // 👈 Exportamos el router por defecto
