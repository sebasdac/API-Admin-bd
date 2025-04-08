import { connectToDatabase } from '../../database/connection.js';

let currentPool = null;
let dbSource = "none";

export const safeQuery = async (queryFn) => {
  const connectTo = async () => {
    const { pool, connectedTo } = await connectToDatabase();
    currentPool = pool;
    dbSource = connectedTo;
  };

  // Si no hay conexión, conéctate
  if (!currentPool || !currentPool.connected) {
    await connectTo();
  }

  try {
    return await queryFn(currentPool, dbSource);
  } catch (error) {
    console.warn(`⚠️ Error con ${dbSource}: ${error.message}`);

    // 🔥 Cerrar el pool si falló
    try {
      await currentPool.close();
    } catch (cerrarError) {
      console.warn("⚠️ No se pudo cerrar el pool:", cerrarError.message);
    }

    currentPool = null;

    try {
      // Reintenta con nueva conexión (posiblemente a la réplica)
      await connectTo();
      return await queryFn(currentPool, dbSource);
    } catch (finalError) {
      console.error("❌ Fallo en ambas conexiones:", finalError.message);
      throw new Error("No se pudo conectar a ninguna base de datos");
    }
  }
};
