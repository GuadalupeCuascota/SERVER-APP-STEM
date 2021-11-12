import mysql from 'promise-mysql';
import keys from './keys';



const pool=mysql.createPool(keys.database);
pool.getConnection() 

.then(connection=>{
   
    pool.releaseConnection(connection);
    console.log('DB es conectada');
},
err=>console.error("No se estableció conexion")
);

export default pool
