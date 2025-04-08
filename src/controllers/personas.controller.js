import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js'; // Asegurate de tener este helper

// 🔹 INSERTAR UNA PERSONA
export const insertarPersona = async (req, res) => {
  try {
    const { cedula, nombre, email, telefono, direccion, tipo_cliente } = req.body;

    if (!cedula || !nombre || !email || !telefono || !direccion || !tipo_cliente) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Cedula", sql.VarChar(20), cedula)
        .input("Nombre", sql.VarChar(100), nombre)
        .input("Email", sql.VarChar(100), email)
        .input("Telefono", sql.VarChar(20), telefono)
        .input("Direccion", sql.VarChar(255), direccion)
        .input("Tipo_Cliente", sql.VarChar(50), tipo_cliente)
        .input("Operacion", sql.Int, 1)
        .execute("CRUD_Persona");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "✅ Persona registrada correctamente."
    });

  } catch (error) {
    console.error("❌ Error al insertar persona:", error);
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

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("ID_Persona", sql.Int, id)
        .input("Operacion", sql.Int, 2)
        .execute("CRUD_Persona");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({
        success: true,
        origen: result.origen,
        persona: result.resultado.recordset[0]
      });
    } else {
      return res.status(404).json({ success: false, message: "Persona no encontrada" });
    }

  } catch (error) {
    console.error("❌ Error al consultar persona:", error);
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

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("ID_Persona", sql.Int, id)
        .input("Cedula", sql.VarChar(20), cedula || null)
        .input("Nombre", sql.VarChar(100), nombre || null)
        .input("Email", sql.VarChar(100), email || null)
        .input("Telefono", sql.VarChar(20), telefono || null)
        .input("Direccion", sql.VarChar(255), direccion || null)
        .input("Tipo_Cliente", sql.VarChar(50), tipo_cliente || null)
        .input("Operacion", sql.Int, 3)
        .execute("CRUD_Persona");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "✅ Persona actualizada correctamente."
    });

  } catch (error) {
    console.error("❌ Error al actualizar persona:", error);
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

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("ID_Persona", sql.Int, id)
        .input("Operacion", sql.Int, 4)
        .execute("CRUD_Persona");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "✅ Persona eliminada correctamente."
    });

  } catch (error) {
    console.error("❌ Error al eliminar persona:", error);
    return res.status(500).json({ success: false, error: "Error en el servidor" });
  }
};

// 🔹 ACTUALIZAR DATOS BÁSICOS DE UNA PERSONA
export const actualizarPersonaSoloDatos = async (req, res) => {
  try {
    const { id_persona, nombre, email, telefono, direccion } = req.body;

    if (!id_persona || isNaN(id_persona)) {
      return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
    }

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("ID_Persona", sql.Int, id_persona)
        .input("Nombre", sql.VarChar(100), nombre || null)
        .input("Email", sql.VarChar(100), email || null)
        .input("Telefono", sql.VarChar(20), telefono || null)
        .input("Direccion", sql.VarChar(255), direccion || null)
        .input("Operacion", sql.Int, 5)
        .execute("CRUD_Persona");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "✅ Persona actualizada correctamente."
    });

  } catch (error) {
    console.error("❌ Error al actualizar datos de persona:", error);
    return res.status(500).json({ success: false, error: "Error en el servidor" });
  }
};
