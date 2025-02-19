import { Router } from 'express';
import {insertarMensaje, obtenerMensajes} from '../controllers/mensajes.controller.js';

const router = Router();

// Definir rutas
router.post('/insertar', insertarMensaje); // Crear usuario
router.get('/ver', obtenerMensajes); // Crear usuario





export default router; // 👈 Exportamos el router por defecto
