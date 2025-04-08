import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js';

export const obtenerPagoPorID = async (req, res) => {
  try {
    const { id_persona } = req.body;

    if (!id_persona || isNaN(id_persona)) {
      return res.status(400).json({
        success: false,
        message: "El ID debe ser un número válido"
      });
    }

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("ID_Persona", sql.Int, id_persona)
        .execute("sp_verPagos");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({
        success: true,
        origen: result.origen,
        pagos: result.resultado.recordset
      });
    } else {
      return res.status(404).json({
        success: false,
        pagos: [],
        message: "Pago no encontrado"
      });
    }

  } catch (error) {
    console.error("❌ Error en sp_verPagos:", error);
    return res.status(500).json({
      success: false,
      error: "Error en el servidor"
    });
  }
};
