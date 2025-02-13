import sql from 'mssql'

const dbSettings = {
    user: "admin",
    password:'admin123',
    server: "sql-server2.cbay200iizkk.us-east-2.rds.amazonaws.com",
    port: 1433,
    database: "ProyectoBD_Sebas",
    options: {
       encrypt: false,
       trustServerCertificate: true,
    }
};

export const getConnection =  async () => {
   try {
     const pool = await sql.connect(dbSettings);
     console.log("Conexion exitosa");

     const result = await pool.request().query("select GETDATE()");
     console.log(result);
     return pool
   } 

   catch (error){
     console.log(error);
   }
}
