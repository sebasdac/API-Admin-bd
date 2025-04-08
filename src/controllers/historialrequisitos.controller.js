import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js'; 

export const Ver_HistorialRequisitos = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request().execute('SP_VerTodosHistorialRequisitos');
      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({
        success: true,
        origen: result.origen,
        Historial: result.resultado.recordset
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No hay préstamos"
      });
    }

  } catch (error) {
    console.error("❌ Error al obtener historia:", error);
    return res.status(500).json({ error: "Error al obtener historial" });
  }
};
