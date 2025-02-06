import { getConnection } from '../../database/connection.js';
import sql from 'mssql';



export const Ver_Prestamos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('Ver_Prestamos'); // Corrección aquí

        // Verificamos si hay resultados
        if (result.recordset.length > 0) {
            return res.json({ success: true, Prestamos: result.recordset }); // Devuelve todos los préstamos
        } else {
            return res.status(404).json({ success: false, message: "No hay préstamos" });
        }

    } catch (error) {
        console.error("❌ Error al obtener préstamos:", error);
        return res.status(500).json({ error: "Error al obtener préstamos" });
    }
};

// 🔥 Función para manejar todas las operaciones del SP_Solicitud
export const Solicitud_CRUD = async (req, res) => {
    try {
        const pool = await getConnection();

        const { id_solicitud, id_prestamo, id_persona, estado, operacion } = req.body;

        // 🔹 Llamar al procedimiento almacenado con los parámetros
        const result = await pool.request()
            .input("ID_Solicitud", id_solicitud || null)
            .input("ID_Prestamo", id_prestamo || null)
            .input("ID_Persona", id_persona || null)
            .input("estado", estado || null)
            .input("operacion", operacion)
            .execute("SP_Solicitud");

        // 🔍 Si la operación es 2 (SELECT), devolver los datos
        if (operacion === 2) {
            return res.json({ success: true, Solicitudes: result.recordset || [] });
        }

        return res.json({ success: true, message: "Operación realizada con éxito" });

    } catch (error) {
        console.error("❌ Error en el procedimiento SP_Solicitud:", error);
        return res.status(500).json({ success: false, error: "Error en la solicitud" });
    }
};

// 🔥 Función para manejar todas las operaciones del SP_Solicitud
export const Ver_Solicitudes = async (req, res) => {
    try {
        const pool = await getConnection();

        const { ID_Cliente } = req.body;

        // 🔹 Llamar al procedimiento almacenado con los parámetros
        const result = await pool.request()
            .input("ID_Persona", ID_Cliente || null)
            .execute("SolicitudesPorUsuario");

       
        return res.json({ success: true, Solicitud: result.recordset || [] });
       
    } catch (error) {
        console.error("❌ Error en el procedimiento SolicitudesPorUsuario:", error);
        return res.status(500).json({ success: false, error: "Error en la solicitud" });
    }
};