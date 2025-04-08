import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js';

// ✅ Obtener todos los Prestamo_Requisitos
export const obtenerPrestamoRequisitos = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("Accion", sql.VarChar, "SELECT")
        .execute("SP_CRUD_PrestamoRequisitos");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({
        success: true,
        origen: result.origen,
        prestamoRequisitos: result.resultado.recordset
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No hay datos en Prestamo_Requisitos"
      });
    }

  } catch (error) {
    console.error("❌ Error al obtener Prestamo_Requisitos:", error);
    return res.status(500).json({ error: "Error al obtener Prestamo_Requisitos" });
  }
};

// ✅ Insertar en Prestamo_Requisitos
export const insertarPrestamoRequisito = async (req, res) => {
  const { id_prestamo, id_requisito, obligatorio } = req.body;

  if (!id_prestamo || !id_requisito || obligatorio === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Accion", sql.VarChar, "INSERT")
        .input("id_prestamo", sql.Int, id_prestamo)
        .input("id_requisito", sql.Int, id_requisito)
        .input("obligatorio", sql.Bit, obligatorio)
        .execute("SP_CRUD_PrestamoRequisitos");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "Registro agregado correctamente"
    });

  } catch (error) {
    console.error("❌ Error al insertar en Prestamo_Requisitos:", error);
    return res.status(500).json({ error: "Error al insertar en Prestamo_Requisitos" });
  }
};

// ✅ Eliminar un registro de Prestamo_Requisitos
export const eliminarPrestamoRequisito = async (req, res) => {
  const { id_prestamo, id_requisito } = req.body;

  if (!id_prestamo || !id_requisito) {
    return res.status(400).json({ error: "ID de préstamo y requisito son obligatorios" });
  }

  try {
    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Accion", sql.VarChar, "DELETE")
        .input("id_prestamo", sql.Int, id_prestamo)
        .input("id_requisito", sql.Int, id_requisito)
        .execute("SP_CRUD_PrestamoRequisitos");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "Registro eliminado correctamente"
    });

  } catch (error) {
    console.error("❌ Error al eliminar en Prestamo_Requisitos:", error);
    return res.status(500).json({ error: "Error al eliminar en Prestamo_Requisitos" });
  }
};
