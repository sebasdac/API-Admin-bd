import sql from 'mssql';
import { safeQuery } from '../helpers/dbHelper.js'; // Ajustá la ruta si es necesario

// ✅ Agregar usuario
export const agregarUsuario = async (req, res) => {
  try {
    const { tipo_usuario, cedula, nombre, email, telefono, direccion, cargo, contraseña, fecha_nacimiento } = req.body;

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input('tipo_usuario', sql.VarChar(20), tipo_usuario)
        .input('cedula', sql.VarChar(20), cedula)
        .input('nombre', sql.VarChar(100), nombre)
        .input('email', sql.VarChar(100), email)
        .input('telefono', sql.VarChar(20), telefono)
        .input('direccion', sql.VarChar(255), direccion || null)
        .input('cargo', sql.VarChar(50), cargo || null)
        .input('contraseña', sql.VarChar(255), contraseña)
        .input('fecha_nacimiento', sql.Date, fecha_nacimiento || null)
        .execute('AgregarUsuarioYPersona');

      return { origen, resultado: r };
    });

    res.status(201).json({ message: '✅ Usuario agregado exitosamente', origen: result.origen, result: result.resultado });

  } catch (error) {
    console.error('❌ Error al agregar usuario:', error);
    res.status(500).json({ error: 'Error al agregar usuario', details: error.message });
  }
};

// ✅ Obtener todos los usuarios (consulta directa)
export const obtenerUsuarios = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request().query('SELECT * FROM Usuarios');
      return { origen, resultado: r };
    });

    res.json({ success: true, origen: result.origen, usuarios: result.resultado.recordset });

  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// ✅ Iniciar sesión
export const IniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("correo", correo)
        .input("contrasena", contrasena)
        .execute("Login");

      return { origen, resultado: r };
    });

    const { resultado } = result;

    if (resultado.recordset.length > 0 && resultado.recordset[0].status === "Error") {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    if (resultado.recordset.length > 0) {
      res.json({ success: true, origen: result.origen, usuario: resultado.recordset[0] });
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// ✅ Ver usuarios y solicitantes por correo
export const VerUsuariosySolicitantesPorCorreo = async (req, res) => {
  try {
    const { correo } = req.params;

    if (!correo) {
      return res.status(400).json({ success: false, message: "El correo es obligatorio" });
    }

    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input('correo', correo)
        .execute('VerUsuariosySolicitantesPorCorreo');

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, solicitantes: result.resultado.recordset });
    } else {
      return res.status(404).json({ success: false, message: "No se encontraron solicitantes para este correo" });
    }

  } catch (error) {
    console.error("❌ Error al ejecutar el procedimiento almacenado:", error);
    return res.status(500).json({ success: false, error: "Error en el servidor" });
  }
};

//#region "CRUD usuarios"

// ✅ Obtener usuarios desde SP
export const obtenerUsuario = async (req, res) => {
  try {
    const result = await safeQuery(async (pool, origen) => {
      const r = await pool.request()
        .input("operacion", sql.Int, 2)
        .execute("SP_Usuarios");

      return { origen, resultado: r };
    });

    if (result.resultado.recordset.length > 0) {
      return res.json({ success: true, origen: result.origen, usuarios: result.resultado.recordset });
    } else {
      return res.status(404).json({ success: false, message: "No hay usuarios disponibles" });
    }

  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// ✅ Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { email, tipo_usuario, ID_Persona } = req.body;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("operacion", sql.Int, 3)
        .input("id_usuario", sql.Int, id_usuario)
        .input("email", sql.VarChar(255), email)
        .input("tipo_usuario", sql.VarChar(50), tipo_usuario)
        .input("ID_Persona", sql.Int, ID_Persona)
        .execute("SP_Usuarios");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Usuario actualizado correctamente" });

  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// ✅ Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const result = await safeQuery(async (pool, origen) => {
      await pool.request()
        .input("operacion", sql.Int, 4)
        .input("id_usuario", sql.Int, id_usuario)
        .execute("SP_Usuarios");

      return { origen };
    });

    res.json({ success: true, origen: result.origen, message: "✅ Usuario eliminado correctamente" });

  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

//#endregion
