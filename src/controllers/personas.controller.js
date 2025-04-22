import { getConnectionByRole } from '../../database/connection.js';
import sql from "mssql";

// 🔹 INSERTAR UNA PERSONA
export const insertarPersona = async (req, res) => {
    try {
        const { cedula, nombre, email, telefono, direccion, tipo_cliente } = req.body;

        if (!cedula || !nombre || !email || !telefono || !direccion || !tipo_cliente) {
            return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        await pool.request()
            .input("Cedula", sql.VarChar(20), cedula)
            .input("Nombre", sql.VarChar(100), nombre)
            .input("Email", sql.VarChar(100), email)
            .input("Telefono", sql.VarChar(20), telefono)
            .input("Direccion", sql.VarChar(255), direccion)
            .input("Tipo_Cliente", sql.VarChar(50), tipo_cliente)
            .input("Operacion", sql.Int, 1) // 1 = INSERT
            .execute("CRUD_Persona");

        return res.json({ success: true, message: "✅ Persona registrada correctamente." });

    } catch (error) {
        console.error("❌ Error al ejecutar CRUD_Persona:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

// 🔹 CONSULTAR UNA PERSONA POR ID
export const obtenerPersonaPorID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        const result = await pool.request()
            .input("ID_Persona", sql.Int, id)
            .input("Operacion", sql.Int, 2) // 2 = SELECT
            .execute("CRUD_Persona");

        if (result.recordset.length > 0) {
            return res.json({ success: true, persona: result.recordset[0] });
        } else {
            return res.status(404).json({ success: false, message: "Persona no encontrada" });
        }

    } catch (error) {
        console.error("❌ Error al ejecutar CRUD_Persona:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

// 🔹 ACTUALIZAR UNA PERSONA
export const actualizarPersona = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula, nombre, email, telefono, direccion, tipo_cliente } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        await pool.request()
            .input("ID_Persona", sql.Int, id)
            .input("Cedula", sql.VarChar(20), cedula || null)
            .input("Nombre", sql.VarChar(100), nombre || null)
            .input("Email", sql.VarChar(100), email || null)
            .input("Telefono", sql.VarChar(20), telefono || null)
            .input("Direccion", sql.VarChar(255), direccion || null)
            .input("Tipo_Cliente", sql.VarChar(50), tipo_cliente || null)
            .input("Operacion", sql.Int, 3) // 3 = UPDATE
            .execute("CRUD_Persona");

        return res.json({ success: true, message: "✅ Persona actualizada correctamente." });

    } catch (error) {
        console.error("❌ Error al ejecutar CRUD_Persona:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

// 🔹 ELIMINAR UNA PERSONA
export const eliminarPersona = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        await pool.request()
            .input("ID_Persona", sql.Int, id)
            .input("Operacion", sql.Int, 4) // 4 = DELETE
            .execute("CRUD_Persona");

        return res.json({ success: true, message: "✅ Persona eliminada correctamente." });

    } catch (error) {
        console.error("❌ Error al ejecutar CRUD_Persona:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

// 🔹 ACTUALIZAR UNA PERSONA
export const actualizarPersonaSoloDatos = async (req, res) => {
    try { 
        const {id_persona, nombre, email, telefono, direccion } = req.body;

        if (!id_persona || isNaN(id_persona)) {
            return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
const pool = await getConnectionByRole(rol);
        await pool.request()
            .input("ID_Persona", sql.Int, id_persona)    
            .input("Nombre", sql.VarChar(100), nombre || null)
            .input("Email", sql.VarChar(100), email || null)
            .input("Telefono", sql.VarChar(20), telefono || null)
            .input("Direccion", sql.VarChar(255), direccion || null)
            
            .input("Operacion", sql.Int, 5) // 5 = UPDATE solo datos
            .execute("CRUD_Persona");

        return res.json({ success: true, message: "✅ Persona actualizada correctamente." });

    } catch (error) {
        console.error("❌ Error al ejecutar CRUD_Persona:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};