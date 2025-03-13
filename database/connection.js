import sql from 'mssql'

const dbSettings = {
    user: "user2",
    password:'R82$8z8xo',
    server: "tiusr20pl.cuc-carrera-ti.ac.cr",
    port: 1433,
    database: "tiusr20pl_admin_bd-_s",
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
