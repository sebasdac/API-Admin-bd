import { Router } from 'express';
import { agregarUsuario, IniciarSesion, VerUsuariosySolicitantesPorCorreo } from '../controllers/usuario.controller.js';

const router = Router();

// Definir rutas
router.post('/agregar', agregarUsuario); // Crear usuario
router.get('/solicitantes/:correo', VerUsuariosySolicitantesPorCorreo);

router.post('/auth', IniciarSesion);  // Obtener lista de usuarios


export default router; // 👈 Exportamos el router por defecto
