import { getConnectionByRole } from '../../database/connection.js';
import sql from "mssql";

export const obtenerPagoPorID = async (req, res) => {
    try {
        const { id_persona } = req.body;

        if (!id_persona || isNaN(id_persona)) {
            return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        const result = await pool.request()
            .input("ID_Persona", sql.Int, id_persona)
            .execute("sp_verPagos");

        if (result.recordset.length > 0) {
            return res.json({ success: true, pagos: result.recordset }); // ✅ Devuelve un array
        } else {
            return res.status(404).json({ success: false, pagos: [], message: "Pago no encontrado" }); // ✅ Devuelve array vacío si no hay pagos
        }
    } catch (error) {
        console.error("❌ sp_verPagos:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};
