import { getConnection } from '../../database/connection.js';
import sql from "mssql";

// ✅ Obtener todas las solicitudes
export const obtenerSolicitudes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("operacion", sql.Int, 2) // 2 = SELECT
            .execute("SP_Solicitud");

        if (result.recordset.length > 0) {
            return res.json({ success: true, solicitudes: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No hay solicitudes disponibles" });
        }
    } catch (error) {
        console.error("❌ Error al obtener solicitudes:", error);
        return res.status(500).json({ error: "Error al obtener solicitudes" });
    }
};

// ✅ Insertar una nueva solicitud
export const crearSolicitud = async (req, res) => {
    try {
        const { id_prestamo, id_persona, estado } = req.body;
        const pool = await getConnection();

        await pool.request()
            .input("operacion", sql.Int, 1) // 1 = INSERT
            .input("ID_Prestamo", sql.Int, id_prestamo)
            .input("ID_Persona", sql.Int, id_persona)
            .input("estado", sql.VarChar(15), estado)
            .execute("SP_Solicitud");

        res.json({ success: true, message: "✅ Solicitud creada correctamente" });
    } catch (error) {
        console.error("❌ Error al crear solicitud:", error);
        res.status(500).json({ error: "Error al crear solicitud" });
    }
};

// ✅ Actualizar una solicitud
export const actualizarSolicitud = async (req, res) => {
    try {
        const { id_solicitud } = req.params;
        const { estado } = req.body;

        console.log("📌 Datos recibidos en la API:", { id_solicitud });

        const pool = await getConnection();
        const result = await pool.request()
            
            .input("ID_Solicitud", sql.Int, parseInt(id_solicitud, 10))
            
            .input("Estado", sql.VarChar(15), estado !== undefined && estado !== null ? estado : "Pendiente")
            .execute("sp_actualizar_solicitud");

        console.log("📌 Filas afectadas:", result.rowsAffected);
        console.log("📌 Datos recibidos en la API:", { id_solicitud, estado });

        res.json({ success: true, message: "✅ Solicitud actualizada correctamente" });
    } catch (error) {
        console.log("📌 Datos recibidos en la API:", { id_solicitud, estado });
        console.error("❌ Error al actualizar solicitud:", error);
        res.status(500).json({ error: "🚨 Error al actualizar solicitud", details: error.message });
    }
};


// ✅ Eliminar una solicitud
export const eliminarSolicitud = async (req, res) => {
    try {
        const { id_solicitud } = req.params;
        const pool = await getConnection();

        await pool.request()
            .input("operacion", sql.Int, 4) // 4 = DELETE
            .input("ID_Solicitud", sql.Int, id_solicitud)
            .execute("SP_Solicitud");

        res.json({ success: true, message: "✅ Solicitud eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar solicitud:", error);
        res.status(500).json({ error: "Error al eliminar solicitud" });
    }
};

export const Realizar_Pago = async (req, res) => {
    try {
        const { monto, ID_Solicitud } = req.body;
        const pool = await getConnection();

        await pool.request()
            .input("monto_pagado", sql.BigInt, monto)
            .input("ID_Solicitud", sql.Int, ID_Solicitud)
            .execute("sp_RealizarPago");

        res.json({ success: true, message: "✅ Pago realizado correctamente" });
    } catch (error) {
        console.error("❌ Error al realizar el pago:", error);
        res.status(500).json({ error: "Error al realizar el pago" });
    }
};

export const Obtener_Solicitud = async (req, res) => {
    try {
        const { id_persona } = req.params;

        const pool = await getConnection();
        const result = await pool.request()
            .input("operacion", sql.Int, 5)
            .input("ID_Persona", sql.Int, id_persona)
            .execute("SP_Solicitud");

        // Cerrar la conexión (opcional si `getConnection` ya lo maneja)
        pool.close(); 

        res.json({ success: true, solicitudes: result.recordset });
    } catch (error) {
        console.error("❌ Error al obtener solicitudes:", error);
        res.status(500).json({ error: "Error al obtener solicitudes" });
    }
};

export const requisitos = async (req, res) => {
    try {
        const { ID_Solicitud, ID_Requisito, Cumplido } = req.body;

        // Convertir a 0 o 1 para SQL Server
        const CumplidoBit = Cumplido ? 1 : 0;

        const pool = await getConnection();
        await pool.request()
            .input("ID_Solicitud", sql.Int, ID_Solicitud)
            .input("ID_Requisito", sql.Int, ID_Requisito)
            .input("Cumplido", sql.Bit, CumplidoBit) // Se usa el valor convertido
            .execute("SP_HistorialSolicitud");

        res.json({ success: true, message: "✅ Actualizado" });
    } catch (error) {
        console.error("❌ Error al actualizar:", error);
        res.status(500).json({ error: "Error al actualizar" });
    }
};

export const actualizar_requisitos = async (req, res) => {
    try {
        const { ID_Solicitud, ID_Requisito, Cumplido } = req.body;

        // Convertir a 0 o 1 para SQL Server
        const CumplidoBit = Cumplido ? 1 : 0;

        const pool = await getConnection();
        await pool.request()
            .input("ID_Solicitud", sql.Int, ID_Solicitud)
            .input("ID_Requisito", sql.Int, ID_Requisito)
            .input("Cumplido", sql.Bit, CumplidoBit) // Se usa el valor convertido
            .execute("SP_ActualizarEstadoHistorial");

        res.json({ success: true, message: "✅ Actualizado" });
    } catch (error) {
        console.error("❌ Error al actualizar:", error);
        res.status(500).json({ error: "Error al actualizar" });
    }
};

