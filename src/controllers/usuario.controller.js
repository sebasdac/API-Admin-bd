import { getConnectionByRole } from '../../database/connection.js';

import sql from 'mssql';

// Agregar usuario llamando al procedimiento almacenado
export const agregarUsuario = async (req, res) => {
    try {
        const { tipo_usuario, cedula, nombre, email, telefono, direccion, cargo, contraseña, fecha_nacimiento} = req.body;
        
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);
        const result = await pool.request()
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

        res.status(201).json({ message: 'Usuario agregado exitosamente', result });
    } catch (error) {
        console.error('❌ Error al agregar usuario:', error);
        res.status(500).json({ error: 'Error al agregar usuario', details: error.message });
    }
};

// Obtener todos los usuarios (ejemplo)
export const obtenerUsuarios = async (req, res) => {
    try {
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);
        const result = await pool.request().query('SELECT * FROM Usuarios');
        res.json(result.recordset);
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};



export const IniciarSesion = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);
        const result = await pool
            .request()
            .input("correo", correo)
            .input("contrasena", contrasena)
            .execute("Login");

        // Si la consulta devuelve 'Error', significa credenciales incorrectas
        if (result.recordset.length > 0 && result.recordset[0].status === "Error") {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        // Si hay un usuario válido
        if (result.recordset.length > 0) {
            res.json({ success: true, usuario: result.recordset[0] });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};



export const VerUsuariosySolicitantesPorCorreo = async (req, res) => {
    try {
        const { correo } = req.params; // Captura el parámetro desde la URL

        if (!correo) {
            return res.status(400).json({ success: false, message: "El correo es obligatorio" });
        }

             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);
        const result = await pool.request()
            .input('correo', correo) // Pasar el parámetro al SP
            .execute('VerUsuariosySolicitantesPorCorreo'); // Ejecutar el procedimiento

        if (result.recordset.length > 0) {
            return res.json({ success: true, solicitantes: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No se encontraron solicitantes para este correo" });
        }

    } catch (error) {
        console.error("❌ Error al ejecutar el procedimiento almacenado:", error);
        return res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

//#region "Crud"
// ✅ Obtener todos los usuarios
export const obtenerUsuario = async (req, res) => {
    try {
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);
        const result = await pool.request()
            .input("operacion", sql.Int, 2) // 2 = SELECT
            .execute("SP_Usuarios");

        if (result.recordset.length > 0) {
            return res.json({ success: true, usuarios: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No hay usuarios disponibles" });
        }
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        return res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// ✅ Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { email, tipo_usuario, ID_Persona, TimeStampHex} = req.body;
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);

        const buffer = Buffer.from(TimeStampHex.replace('0x', ''), 'hex');

        await pool.request()
            .input("operacion", sql.Int, 3) // 3 = UPDATE
            .input("id_usuario", sql.Int, id_usuario)
            .input("email", sql.VarChar(255), email)
            .input("tipo_usuario", sql.VarChar(50), tipo_usuario)
            .input("ID_Persona", sql.Int, ID_Persona)
            .input("TimeStamp", sql.Binary, buffer)
            .execute("SP_Usuarios");

        res.json({ success: true, message: "✅ Usuario actualizado correctamente" });
    } catch (error) {
        if (error.message.includes("Error: El usuario ya fue modificado por otro usuario.")) {
            res.status(409).json({ error: "Este usuario fue actualizado por otro usuario. Por favor, intente nuevamente." });
        } else {
            console.error("❌ Error al actualizar usuario:", error);
            res.status(500).json({ error: "Error al actualizar usuario" });
        }
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
             const rol = req.headers['x-user-role'] || 'generico';
     const pool = await getConnectionByRole(rol);

        await pool.request()
            .input("operacion", sql.Int, 4) // 4 = DELETE
            .input("id_usuario", sql.Int, id_usuario)
            .execute("SP_Usuarios");

        res.json({ success: true, message: "✅ Usuario eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

//#endregion

