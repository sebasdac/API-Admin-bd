import { connectToDatabase } from "../database/connection.js";

let currentPool = null;
let dbSource = "none";

export const dbMiddleware = async (req, res, next) => {
  try {
    if (!currentPool || !currentPool.connected) {
      const { pool, connectedTo } = await connectToDatabase();
      currentPool = pool;
      dbSource = connectedTo;
    }

    req.db = currentPool;
    req.dbSource = dbSource;
    next();
  } catch (error) {
    res.status(500).json({ error: "No hay conexión a la base de datos" });
  }
};
