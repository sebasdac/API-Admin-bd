import { getConnectionByRole } from '../../database/connection.js';
import sql from "mssql";

export const Ver_HistorialRequisitos = async (req, res) => {
    try {
             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        const result = await pool.request().execute('SP_VerTodosHistorialRequisitos'); // Corrección aquí

        // Verificamos si hay resultados
        if (result.recordset.length > 0) {
            return res.json({ success: true, Historial: result.recordset }); // Devuelve todos los préstamos
        } else {
            return res.status(404).json({ success: false, message: "No hay préstamos" });
        }

    } catch (error) {
        console.error("❌ Error al obtener historia:", error);
        return res.status(500).json({ error: "Error al obtener historial" });
    }
};