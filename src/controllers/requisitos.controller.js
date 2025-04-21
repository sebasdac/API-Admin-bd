import { getConnection } from '../../database/connection.js';
import sql from "mssql";

// ✅ Obtener todos los requisitos
export const obtenerRequisitos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Accion", sql.VarChar, "SELECT")
            .execute("SP_CRUD_Requisitos");

        if (result.recordset.length > 0) {
            return res.json({ success: true, requisitos: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No hay requisitos disponibles" });
        }
    } catch (error) {
        console.error("❌ Error al obtener requisitos:", error);
        return res.status(500).json({ error: "Error al obtener requisitos" });
    }
};

// ✅ Insertar un requisito
export const insertarRequisito = async (req, res) => {
    const { descripcion } = req.body;
    if (!descripcion) {
        return res.status(400).json({ error: "La descripción es obligatoria" });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Accion", sql.VarChar, "INSERT")
            .input("descripcion", sql.VarChar, descripcion)
            .execute("SP_CRUD_Requisitos");

        return res.json({ success: true, message: "Requisito agregado correctamente" });
    } catch (error) {
        console.error("❌ Error al insertar requisito:", error);
        return res.status(500).json({ error: "Error al insertar requisito" });
    }
};

// ✅ Actualizar un requisito
export const actualizarRequisito = async (req, res) => {
    const { id_requisito, descripcion, TimeStamp} = req.body;
    if (!id_requisito || !descripcion) {
        return res.status(400).json({ error: "ID y descripción son obligatorios" });
    }
 
    try {
        const pool = await getConnection();
        const buffer = Buffer.from(TimeStamp.replace('0x', ''), 'hex');// estampilla
        await pool.request()
            .input("Accion", sql.VarChar, "UPDATE")
            .input("id_requisito", sql.Int, id_requisito)
            .input("descripcion", sql.VarChar, descripcion)
            .input("TimeStamp", sql.Binary, buffer)
            .execute("SP_CRUD_Requisitos");

        return res.json({ success: true, message: "Requisito actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar requisito:", error);
        return res.status(500).json({ error: "Error al actualizar requisito" });
    }
};

// ✅ Eliminar un requisito
export const eliminarRequisito = async (req, res) => {
    const { id_requisito } = req.params;
    if (!id_requisito) {
        return res.status(400).json({ error: "ID del requisito es obligatorio" });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Accion", sql.VarChar, "DELETE")
            .input("id_requisito", sql.Int, id_requisito)
            .execute("SP_CRUD_Requisitos");

        return res.json({ success: true, message: "Requisito eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar requisito:", error);
        return res.status(500).json({ error: "Error al eliminar requisito" });
    }
};

// ✅ Registrar registro con prestamo asociado
export const RequisitoConPrestamo = async (req, res) => {
    const { descripcion, obligatorio, IDPrestamo } = req.body;
    if (!descripcion || !obligatorio ||!IDPrestamo) {
        return res.status(400).json({ error: "ID y descripción son obligatorios" });
    }
    try {
        const pool = await getConnection();
        await pool.request()
            .input("Descripcion", sql.VarChar, descripcion)
            .input("Obligatorio", sql.VarChar, obligatorio)
            .input("IDPrestamo", sql.Int, IDPrestamo)
            .execute("insertarRequisitosYPrestamo");

        return res.json({ success: true, message: "Requisito insertado correctamente" });
    } catch (error) {
        console.error("❌ Error al insertar registro:", error);
        return res.status(500).json({ error: "Error al insertar registro" });
    }
};
// ✅ Obtener todos los requisitos
export const verRequisitoXPrestamo = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute("SP_VerRequisitosXPrestamo");

        if (result.recordset.length > 0) {
            return res.json({ success: true, requisitos: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No hay requisitos disponibles" });
        }
    } catch (error) {
        console.error("❌ Error al obtener requisitos:", error);
        return res.status(500).json({ error: "Error al obtener requisitos" });
    }
};