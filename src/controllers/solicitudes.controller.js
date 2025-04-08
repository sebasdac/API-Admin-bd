import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js'; // Asegurate de ajustar la ruta

// ✅ Obtener todas las solicitudes
export const obtenerSolicitudes = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("operacion", sql.Int, 2)
        .execute("SP_Solicitud");
      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, solicitudes: result.resultado.recordset });
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

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("operacion", sql.Int, 1)
        .input("ID_Prestamo", sql.Int, id_prestamo)
        .input("ID_Persona", sql.Int, id_persona)
        .input("estado", sql.VarChar(15), estado)
        .execute("SP_Solicitud");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Solicitud creada correctamente" });

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

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("ID_Solicitud", sql.Int, parseInt(id_solicitud, 10))
        .input("Estado", sql.VarChar(15), estado || "Pendiente")
        .execute("sp_actualizar_solicitud");

      return { origen, resultado: r };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Solicitud actualizada correctamente" });

  } catch (error) {
    console.error("❌ Error al actualizar solicitud:", error);
    res.status(500).json({ error: "🚨 Error al actualizar solicitud", details: error.message });
  }
};

// ✅ Eliminar una solicitud
export const eliminarSolicitud = async (req, res) => {
  try {
    const { id_solicitud } = req.params;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("operacion", sql.Int, 4)
        .input("ID_Solicitud", sql.Int, id_solicitud)
        .execute("SP_Solicitud");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Solicitud eliminada correctamente" });

  } catch (error) {
    console.error("❌ Error al eliminar solicitud:", error);
    res.status(500).json({ error: "Error al eliminar solicitud" });
  }
};

// ✅ Realizar pago
export const Realizar_Pago = async (req, res) => {
  try {
    const { monto, ID_Solicitud } = req.body;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("monto_pagado", sql.Decimal, monto)
        .input("ID_Solicitud", sql.Int, ID_Solicitud)
        .execute("sp_RealizarPago");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Pago realizado correctamente" });

  } catch (error) {
    console.error("❌ Error al realizar el pago:", error);
    res.status(500).json({ error: "Error al realizar el pago" });
  }
};

// ✅ Obtener solicitudes por persona
export const Obtener_Solicitud = async (req, res) => {
  try {
    const { id_persona } = req.params;

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("operacion", sql.Int, 5)
        .input("ID_Persona", sql.Int, id_persona)
        .execute("SP_Solicitud");

      return { origen, resultado: r };
    });

    res.json({ success: true, origen: result.origen, solicitudes: result.resultado.recordset });

  } catch (error) {
    console.error("❌ Error al obtener solicitudes:", error);
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
};

// ✅ Insertar en historial de requisitos
export const requisitos = async (req, res) => {
  try {
    const { ID_Solicitud, ID_Requisito, Cumplido } = req.body;
    const CumplidoBit = Cumplido ? 1 : 0;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("ID_Solicitud", sql.Int, ID_Solicitud)
        .input("ID_Requisito", sql.Int, ID_Requisito)
        .input("Cumplido", sql.Bit, CumplidoBit)
        .execute("SP_HistorialSolicitud");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Actualizado" });

  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    res.status(500).json({ error: "Error al actualizar" });
  }
};

// ✅ Actualizar estado de requisito en historial
export const actualizar_requisitos = async (req, res) => {
  try {
    const { ID_Solicitud, ID_Requisito, Cumplido } = req.body;
    const CumplidoBit = Cumplido ? 1 : 0;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("ID_Solicitud", sql.Int, ID_Solicitud)
        .input("ID_Requisito", sql.Int, ID_Requisito)
        .input("Cumplido", sql.Bit, CumplidoBit)
        .execute("SP_ActualizarEstadoHistorial");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Actualizado" });

  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    res.status(500).json({ error: "Error al actualizar" });
  }
};
