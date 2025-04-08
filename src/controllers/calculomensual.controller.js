import { safeQuery } from '../helpers/dbHelper.js'; // Ajustá la ruta si es diferente

export const CalcularMensualidad = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      // Ejecutamos los dos procedimientos en el mismo pool
      await pool.request().execute("GenerarCuotasMensuales");
      const resultado = await pool.request().execute('SP_VerCuotasPendientes');

      return { origen, resultado };
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
        message: "No hay solicitudes"
      });
    }

  } catch (error) {
    console.error("❌ Error al calcular mensualidad:", error);
    return res.status(500).json({
      error: "Error al calcular",
      detalles: error.message
    });
  }
};
