import sql from "mssql";
import { safeQuery } from '../helpers/dbHelper.js';

export const insertarMensaje = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("nombre", sql.VarChar(20), nombre)
        .input("email", sql.VarChar(100), email)
        .input("mensaje", sql.Text(150), mensaje)
        .execute("sp_InsertarMensaje");

      return { origen };
    });

    return res.json({
      success: true,
      origen: result.origen,
      message: "✅ Mensaje insertado."
    });

  } catch (error) {
    console.error("❌ Error al ejecutar sp_InsertarMensaje:", error);
    return res.status(500).json({
      success: false,
      error: "Error en el servidor"
    });
  }
};

export const obtenerMensajes = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request().execute("sp_ObtenerMensajes");
      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({
        success: true,
        origen: result.origen,
        Mensajes: result.resultado.recordset
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No hay mensajes"
      });
    }

  } catch (error) {
    console.error("❌ Error al obtener Mensajes:", error);
    return res.status(500).json({
      error: "Error al obtener Mensajes"
    });
  }
};
