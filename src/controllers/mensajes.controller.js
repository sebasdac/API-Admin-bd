
import { getConnectionByRole } from '../../database/connection.js';
import sql from "mssql";

export const insertarMensaje = async (req, res) => {
    try {
        const { nombre, email, mensaje, } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        await pool.request()
            .input("nombre", sql.VarChar(20), nombre)
            .input("email", sql.VarChar(100), email)
            .input("mensaje", sql.Text(150), mensaje)
            .execute("sp_InsertarMensaje");

        return res.json({ success: true, message: "✅ Mensaje insertado." });

    } catch (error) {
        console.error("❌ Error al ejecutar sp_InsertarMensaje:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

export const obtenerMensajes = async (req, res) => {
    try {
             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        const result = await pool.request() 
            .execute("sp_ObtenerMensajes");

        if (result.recordset.length > 0) {
            return res.json({ success: true, Mensajes: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No hay mensajes" });
        }
    } catch (error) {
        console.error("❌ Error al obtener Mensajes:", error);
        return res.status(500).json({ error: "Error al obtener Mensajes" });
    }
};
