// connection.js
import sql from 'mssql';

const primaryDbConfig = {
  user: "User",
  password: "Hairwax1",
  server: "localhost",
  port: 1434,
  database: "ProyectoBD_Sebas",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const replicaDbConfig = {
  user: "sa",
  password: "Hairwax1",
  server: "localhost", // ⚠️ CAMBIAR por el servidor de réplica
  port: 1435,
  database: "Proyecto_Admin_Replica",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

export const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(primaryDbConfig);
    await pool.request().query("SELECT 1");
    console.log("✅ Conectado a la base PRINCIPAL");
    return { pool, connectedTo: "principal" };
  } catch (error) {
    console.warn("⚠️ Falló conexión con la base principal:", error.message);
    try {
      const replicaPool = await sql.connect(replicaDbConfig);
      await replicaPool.request().query("SELECT 1");
      console.log("✅ Conectado a la base RÉPLICA");
      return { pool: replicaPool, connectedTo: "replica" };
    } catch (replicaError) {
      console.error("❌ Falló conexión con ambas bases:", replicaError.message);
      throw new Error("No se pudo conectar a ninguna base de datos");
    }
  }
};
