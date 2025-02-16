import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes.js';
import prestamoRoutes  from './routes/prestamos.routes.js';
import personasRoutes from './routes/personas.routes.js';
import solicitudesCrud from './routes/solicitudes.routes.js';
import verPagos from './routes/pagos.routes.js';
import requisitosRoutes from './routes/requisitos.routes.js'
import requisitosPrestamosRoutes from './routes/prestamos_requisitos.routes.js'
import historialRoutes from './routes/historial.routes.js'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/prestamos', prestamoRoutes)
app.use('/api/personas', personasRoutes)
app.use('/api/solicitudes', solicitudesCrud)
app.use('/api/pagos', verPagos )
app.use('/api/requisitos', requisitosRoutes)
app.use('/api/prestamorequisitos', requisitosPrestamosRoutes)
app.use('/api/historial', historialRoutes)



// Servidor en puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
