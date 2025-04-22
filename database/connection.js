import sql from 'mssql';

const dbConfig = {
  generico: {
    user: 'generico1',
    password: 'generico123',
    server: 'localhost',
    database: 'ProyectoAdminBD',
    port: 1433,
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  funcionario: {
    user: 'USER',
    port: 1433,
    password: 'user123',
    server: 'localhost',
    database: 'ProyectoAdminBD',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  solicitante: {
    user: 'solicitante',
    port: 1433,
    password: 'solicitante123',
    server: 'localhost',
    database: 'ProyectoAdminBD',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  cliente: {
    user: 'cliente',
    port: 1433,
    password: 'cliente123',
    server: 'localhost',
    database: 'ProyectoAdminBD',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
};



export async function getConnectionByRole(rol) {
  const config = dbConfig[rol];
  if (!config) throw new Error('Rol no válido');

  // Cierra todas las conexiones anteriores antes de abrir una nueva
  await sql.close().catch(() => {});
  const pool = await sql.connect(config);
  return pool;
}

