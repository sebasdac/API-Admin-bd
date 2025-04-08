import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js'; // Ajustá la ruta si es necesario

// ✅ Obtener todos los requisitos
export const obtenerRequisitos = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("Accion", sql.VarChar, "SELECT")
        .execute("SP_CRUD_Requisitos");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, requisitos: result.resultado.recordset });
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
    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Accion", sql.VarChar, "INSERT")
        .input("descripcion", sql.VarChar, descripcion)
        .execute("SP_CRUD_Requisitos");

      return { origen };
    });

    return res.json({ success: true, origen: result.origen, message: "Requisito agregado correctamente" });

  } catch (error) {
    console.error("❌ Error al insertar requisito:", error);
    return res.status(500).json({ error: "Error al insertar requisito" });
  }
};

// ✅ Actualizar un requisito
export const actualizarRequisito = async (req, res) => {
  const { id_requisito, descripcion } = req.body;
  if (!id_requisito || !descripcion) {
    return res.status(400).json({ error: "ID y descripción son obligatorios" });
  }

  try {
    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Accion", sql.VarChar, "UPDATE")
        .input("id_requisito", sql.Int, id_requisito)
        .input("descripcion", sql.VarChar, descripcion)
        .execute("SP_CRUD_Requisitos");

      return { origen };
    });

    return res.json({ success: true, origen: result.origen, message: "Requisito actualizado correctamente" });

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
    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Accion", sql.VarChar, "DELETE")
        .input("id_requisito", sql.Int, id_requisito)
        .execute("SP_CRUD_Requisitos");

      return { origen };
    });

    return res.json({ success: true, origen: result.origen, message: "Requisito eliminado correctamente" });

  } catch (error) {
    console.error("❌ Error al eliminar requisito:", error);
    return res.status(500).json({ error: "Error al eliminar requisito" });
  }
};

// ✅ Registrar requisito con préstamo asociado
export const RequisitoConPrestamo = async (req, res) => {
  const { descripcion, obligatorio, IDPrestamo } = req.body;
  if (!descripcion || obligatorio === undefined || !IDPrestamo) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Descripcion", sql.VarChar, descripcion)
        .input("Obligatorio", sql.VarChar, obligatorio)
        .input("IDPrestamo", sql.Int, IDPrestamo)
        .execute("insertarRequisitosYPrestamo");

      return { origen };
    });

    return res.json({ success: true, origen: result.origen, message: "Requisito insertado correctamente" });

  } catch (error) {
    console.error("❌ Error al insertar requisito con préstamo:", error);
    return res.status(500).json({ error: "Error al insertar registro" });
  }
};

// ✅ Ver requisitos por préstamo
export const verRequisitoXPrestamo = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request().execute("SP_VerRequisitosXPrestamo");
      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, requisitos: result.resultado.recordset });
    } else {
      return res.status(404).json({ success: false, message: "No hay requisitos disponibles" });
    }

  } catch (error) {
    console.error("❌ Error al obtener requisitos por préstamo:", error);
    return res.status(500).json({ error: "Error al obtener requisitos" });
  }
};
