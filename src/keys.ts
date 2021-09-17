import fs from 'fs'
export default{
    database: {
        host: 'db-prueba-do-user-9789489-0.b.db.ondigitalocean.com',
        user:  'stem',
        password:'fqKV-E_mb2q2tpSK',
        database: 'bdd_stem',
        port:25060,
        sslmode:'REQUIRED' ,
        dialect: 'mysql',
    logging: true,
    force: true,
    
    
},
    ssl: true,
    dialectOptions: {
        ssl: {
            ssl: true,
            cert: fs.readFileSync(process.env.INIT_CWD + '/src/Models/' + 'ca-certificate.crt')
        }
    },

}