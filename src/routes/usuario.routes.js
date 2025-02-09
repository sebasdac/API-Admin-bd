import { Router } from 'express';
import { agregarUsuario, IniciarSesion, VerUsuariosySolicitantesPorCorreo, obtenerUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/usuario.controller.js';

const router = Router();

// Definir rutas
router.post('/agregar', agregarUsuario); // Crear usuario
router.get('/solicitantes/:correo', VerUsuariosySolicitantesPorCorreo);
router.post('/auth', IniciarSesion);  // Obtener lista de usuarios
router.get("/listar", obtenerUsuario);
router.put("/actualizar/:id_usuario", actualizarUsuario);
router.delete("/eliminar/:id_usuario", eliminarUsuario);




export default router; // 👈 Exportamos el router por defecto
