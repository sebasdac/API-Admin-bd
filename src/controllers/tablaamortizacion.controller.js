import { getConnectionByRole } from '../../database/connection.js';
import sql from "mssql";

export const VerTablaAmortizacion = async (req, res) => {
    try {
        const {id_solicitud} = req.params
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol); 
        const result = await pool.request()
         .input('id_solicitud', sql.Int, id_solicitud)
         .execute("sp_ObtenerHistorialPagos")

        // Verificamos si hay resultados
        if (result.recordset.length > 0) {
            return res.json({ success: true, CalculoCuotas: result.recordset }); // Devuelve todos los préstamos
        } 
        else {
            return res.status(404).json({ success: false, message: "No hay historial" });
        }

    } catch (error) {
        console.error("❌ Error  No hay historial:", error);
        return res.status(500).json({ error: "Error No hay historial" });
    }
};