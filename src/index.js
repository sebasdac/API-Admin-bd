import express from 'express';
import cors from 'cors';

// Rutas
import usuarioRoutes from './routes/usuario.routes.js';
import prestamoRoutes from './routes/prestamos.routes.js';
import personasRoutes from './routes/personas.routes.js';
import solicitudesCrud from './routes/solicitudes.routes.js';
import verPagos from './routes/pagos.routes.js';
import requisitosRoutes from './routes/requisitos.routes.js';
import requisitosPrestamosRoutes from './routes/prestamos_requisitos.routes.js';
import historialRoutes from './routes/historial.routes.js';
import mensajesRoutes from './routes/mensajes.routes.js';
import calculomensual from './routes/calculomensual.routes.js';
import tablaamortizacion from './routes/tablaamortizacion.routes.js';

const app = express();

// 🧩 Middleware CORS configurado correctamente
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-user-role'],
}));

// 🔁 Manejo explícito de preflight (opcional pero recomendado)
app.options('*', cors());

// 🚀 Middleware para parsear JSON
app.use(express.json());

// 🔒 (opcional) Log de headers para pruebas
app.use((req, res, next) => {
  console.log("📦 Headers recibidos:", req.headers);
  next();
});

// 🛣️ Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/prestamos', prestamoRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/solicitudes', solicitudesCrud);
app.use('/api/pagos', verPagos);
app.use('/api/requisitos', requisitosRoutes);
app.use('/api/prestamorequisitos', requisitosPrestamosRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/calculomensualidad', calculomensual);
app.use('/api/tablaamortizacion', tablaamortizacion);

// 🟢 Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
