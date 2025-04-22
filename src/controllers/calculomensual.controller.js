import { getConnectionByRole } from '../../database/connection.js';



export const CalcularMensualidad = async (req, res) => {
    try {
             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        await pool.request().execute("GenerarCuotasMensuales")
        const result = await pool.request().execute('SP_VerCuotasPendientes'); // Corrección aquí

        // Verificamos si hay resultados
        if (result.recordset.length > 0) {
            return res.json({ success: true, CalculoCuotas: result.recordset }); // Devuelve todos los préstamos
        } else {
            return res.status(404).json({ success: false, message: "No hay solicitudes" });
        }

    } catch (error) {
        console.error("❌ Error al calcular:", error);
        return res.status(500).json({ error: "Error al calcular" });
    }
};