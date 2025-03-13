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

        const { id_solicitud, id_prestamo, id_persona, estado, operacion, monto } = req.body;

        // 🔹 Llamar al procedimiento almacenado con los parámetros
        const result = await pool.request()
            .input("ID_Solicitud", id_solicitud || null)
            .input("ID_Prestamo", id_prestamo || null)
            .input("ID_Persona", id_persona || null)
            .input("estado", estado || null)
            .input("operacion", operacion)
            .input("monto", monto)
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

export const Ver_Solicitudes = async (req, res) => {
    try {
        const pool = await getConnection();

        let { ID_Cliente } = req.params;  // 🔹 Capturar ID de params

        // 🔹 Convertir a número y validar
        ID_Cliente = parseInt(ID_Cliente, 10);
        if (isNaN(ID_Cliente)) {
            return res.status(400).json({ success: false, error: "ID_Cliente debe ser un número válido." });
        }

        // 🔹 Llamar al procedimiento almacenado con los parámetros
        const result = await pool.request()
            .input("ID_Persona", ID_Cliente)
            .execute("SolicitudesPorUsuario");

        return res.json({ success: true, Solicitud: result.recordset || [] });

    } catch (error) {
        console.error("❌ Error en el procedimiento SolicitudesPorUsuario:", error);
        return res.status(500).json({ success: false, error: "Error en la solicitud", details: error.message });
    };
    
};

    //todo el crud
    //#region  "Crud"
    export const Ver = async (req, res) => {
        try {
            const pool = await getConnection();
            const result = await pool.request().execute("sp_CrudPrestamos", { Operacion: "SELECT" });
    
            if (result.recordset.length > 0) {
                return res.json({ success: true, prestamos: result.recordset });
            } else {
                return res.status(404).json({ success: false, message: "No hay préstamos disponibles" });
            }
        } catch (error) {
            console.error("❌ Error al obtener préstamos:", error);
            return res.status(500).json({ error: "Error al obtener préstamos" });
        }
    };
    
    // ✅ Insertar un nuevo préstamo
    export const Insertar_Prestamo = async (req, res) => {
        try {
            const { nombre, plazo_meses, interes, tipo_interes, porcentaje } = req.body;
            const pool = await getConnection();
    
            await pool.request()
                .input("Operacion", sql.NVarChar, "INSERT")
                .input("nombre", sql.NVarChar, nombre)
                .input("plazo_meses", sql.Int, plazo_meses)
                .input("interes", sql.Decimal(10,2), interes)
                .input("tipo_interes", sql.NVarChar, tipo_interes)
                .input("porcentaje", sql.Decimal(5,2), porcentaje)
                .execute("sp_CrudPrestamos");
    
            res.json({ success: true, message: "✅ Préstamo agregado correctamente" });
        } catch (error) {
            console.error("❌ Error al insertar préstamo:", error);
            res.status(500).json({ error: "Error al insertar préstamo" });
        }
    };
    
    // ✅ Actualizar un préstamo
    export const Actualizar_Prestamo = async (req, res) => {
        try {
            const { id_prestamo } = req.params;
            const { nombre, plazo_meses, interes, tipo_interes, porcentaje } = req.body;
            const pool = await getConnection();
    
            await pool.request()
                .input("Operacion", sql.NVarChar, "UPDATE")
                .input("id_prestamo", sql.Int, id_prestamo)
                .input("nombre", sql.NVarChar, nombre)
                .input("plazo_meses", sql.Int, plazo_meses)
                .input("interes", sql.Decimal(10,2), interes)
                .input("tipo_interes", sql.NVarChar, tipo_interes)
                .input("porcentaje", sql.Decimal(5,2), porcentaje)
                .execute("sp_CrudPrestamos");
    
            res.json({ success: true, message: "✅ Préstamo actualizado correctamente" });
        } catch (error) {
            console.error("❌ Error al actualizar préstamo:", error);
            res.status(500).json({ error: "Error al actualizar préstamo" });
        }
    };
    
    // ✅ Eliminar un préstamo
    export const Eliminar_Prestamo = async (req, res) => {
        try {
            const { id_prestamo } = req.params;
            const pool = await getConnection();
    
            await pool.request()
                .input("Operacion", sql.NVarChar, "DELETE")
                .input("id_prestamo", sql.Int, id_prestamo)
                .execute("sp_CrudPrestamos");
    
            res.json({ success: true, message: "✅ Préstamo eliminado correctamente" });
        } catch (error) {
            console.error("❌ Error al eliminar préstamo:", error);
            res.status(500).json({ error: "Error al eliminar préstamo" });
        }
    };

    export const CalcularMensualidad = async (req, res) => {
        try {
            const { id_solicitud } = req.params;
            const pool = await getConnection();
            console.log("Parámetro recibido:", id_solicitud);
    
            const result = await pool.request()
                .input("id_solicitud", sql.Int, id_solicitud)
                .execute("CalcularPagoMensual");
    
            console.log("Resultado de la consulta:", result);
    
            if (result.recordset.length > 0) {
                return res.status(200).json({ success: true, message: result.recordset });
            } else {
                return res.status(404).json({ success: false, message: "No se encontró la solicitud" });
            }
        } catch (error) {
            console.error("Error al consultar pago mensual:", error);
            return res.status(500).json({ error: "Error al consultar pago mensual" });
        }
    };
    
    //#endregion
