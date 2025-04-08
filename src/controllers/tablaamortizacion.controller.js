import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js'; // Ajustá la ruta si es necesario

export const VerTablaAmortizacion = async (req, res) => {
  try {
    const { id_solicitud } = req.params;

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("id_solicitud", sql.Int, id_solicitud)
        .execute("sp_ObtenerHistorialPagos");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({
        success: true,
        origen: result.origen,
        CalculoCuotas: result.resultado.recordset
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No hay historial"
      });
    }

  } catch (error) {
    console.error("❌ Error al obtener historial:", error);
    return res.status(500).json({ error: "Error al obtener historial" });
  }
};
