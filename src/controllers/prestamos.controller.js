import sql from 'mssql';
import { safeQuery } from '../helpers/dbHelper.js'; // Ajustá la ruta según tu estructura

// ✅ Ver todos los préstamos
export const Ver_Prestamos = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request().execute('Ver_Prestamos');
      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, Prestamos: result.resultado.recordset });
    } else {
      return res.status(404).json({ success: false, message: "No hay préstamos" });
    }

  } catch (error) {
    console.error("❌ Error al obtener préstamos:", error);
    return res.status(500).json({ error: "Error al obtener préstamos" });
  }
};

// ✅ CRUD general de solicitud
export const Solicitud_CRUD = async (req, res) => {
  try {
    const { id_solicitud, id_prestamo, id_persona, estado, operacion, monto } = req.body;

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("ID_Solicitud", id_solicitud || null)
        .input("ID_Prestamo", id_prestamo || null)
        .input("ID_Persona", id_persona || null)
        .input("estado", estado || null)
        .input("operacion", operacion)
        .input("monto", monto)
        .execute("SP_Solicitud");

      return { origen, resultado: r };
    });

    if (operacion === 2) {
      return res.json({ success: true, origen: result.origen, Solicitudes: result.resultado.recordset || [] });
    }

    return res.json({ success: true, origen: result.origen, message: "Operación realizada con éxito" });

  } catch (error) {
    console.error("❌ Error en el procedimiento SP_Solicitud:", error);
    return res.status(500).json({ success: false, error: "Error en la solicitud" });
  }
};

// ✅ Ver solicitudes por cliente
export const Ver_Solicitudes = async (req, res) => {
  try {
    let { ID_Cliente } = req.params;
    ID_Cliente = parseInt(ID_Cliente, 10);

    if (isNaN(ID_Cliente)) {
      return res.status(400).json({ success: false, error: "ID_Cliente debe ser un número válido." });
    }

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("ID_Persona", ID_Cliente)
        .execute("SolicitudesPorUsuario");

      return { origen, resultado: r };
    });

    return res.json({ success: true, origen: result.origen, Solicitud: result.resultado.recordset || [] });

  } catch (error) {
    console.error("❌ Error en el procedimiento SolicitudesPorUsuario:", error);
    return res.status(500).json({ success: false, error: "Error en la solicitud", details: error.message });
  }
};

// ✅ Ver todos los préstamos desde CRUD
export const Ver = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("Operacion", sql.NVarChar, "SELECT")
        .execute("sp_CrudPrestamos");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, prestamos: result.resultado.recordset });
    } else {
      return res.status(404).json({ success: false, message: "No hay préstamos disponibles" });
    }
  } catch (error) {
    console.error("❌ Error al obtener préstamos:", error);
    return res.status(500).json({ error: "Error al obtener préstamos" });
  }
};

// ✅ Insertar un préstamo
export const Insertar_Prestamo = async (req, res) => {
  try {
    const { nombre, plazo_meses, interes, tipo_interes, porcentaje } = req.body;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Operacion", sql.NVarChar, "INSERT")
        .input("nombre", sql.NVarChar, nombre)
        .input("plazo_meses", sql.Int, plazo_meses)
        .input("interes", sql.Decimal(10, 2), interes)
        .input("tipo_interes", sql.NVarChar, tipo_interes)
        .input("porcentaje", sql.Decimal(5, 2), porcentaje)
        .execute("sp_CrudPrestamos");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Préstamo agregado correctamente" });

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

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Operacion", sql.NVarChar, "UPDATE")
        .input("id_prestamo", sql.Int, id_prestamo)
        .input("nombre", sql.NVarChar, nombre)
        .input("plazo_meses", sql.Int, plazo_meses)
        .input("interes", sql.Decimal(10, 2), interes)
        .input("tipo_interes", sql.NVarChar, tipo_interes)
        .input("porcentaje", sql.Decimal(5, 2), porcentaje)
        .execute("sp_CrudPrestamos");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Préstamo actualizado correctamente" });

  } catch (error) {
    console.error("❌ Error al actualizar préstamo:", error);
    res.status(500).json({ error: "Error al actualizar préstamo" });
  }
};

// ✅ Eliminar un préstamo
export const Eliminar_Prestamo = async (req, res) => {
  try {
    const { id_prestamo } = req.params;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("Operacion", sql.NVarChar, "DELETE")
        .input("id_prestamo", sql.Int, id_prestamo)
        .execute("sp_CrudPrestamos");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Préstamo eliminado correctamente" });

  } catch (error) {
    console.error("❌ Error al eliminar préstamo:", error);
    res.status(500).json({ error: "Error al eliminar préstamo" });
  }
};

// ✅ Calcular mensualidad
export const CalcularMensualidad = async (req, res) => {
  try {
    const { id_solicitud } = req.params;

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("id_solicitud", sql.Int, id_solicitud)
        .execute("CalcularPagoMensual");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.status(200).json({ success: true, origen: result.origen, message: result.resultado.recordset });
    } else {
      return res.status(404).json({ success: false, message: "No se encontró la solicitud" });
    }

  } catch (error) {
    console.error("Error al consultar pago mensual:", error);
    return res.status(500).json({ error: "Error al consultar pago mensual" });
  }
};
