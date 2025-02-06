import sql from 'mssql'

const dbSettings = {
    user: "user",
    password:'Hairwax1@',
    server: "localhost",
    port: 1434,
    database: "Proyecto_BD",
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
