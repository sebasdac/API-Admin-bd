import { Router } from 'express';
import { VerTablaAmortizacion } from '../controllers/tablaamortizacion.controller.js';

const router = Router();


router.get('/ver/:id_solicitud', VerTablaAmortizacion); // Crear usuario





export default router; // 👈 Exportamos el router por defecto
