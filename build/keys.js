"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = {
    database: {
        host: 'db-prueba-do-user-9789489-0.b.db.ondigitalocean.com',
        user: 'stem',
        password: 'fqKV-E_mb2q2tpSK',
        database: 'bdd_stem',
        port: 25060,
        sslmode: 'REQUIRED',
        dialect: 'mysql',
        logging: true,
        force: true,
    },
    ssl: true,
    dialectOptions: {
        ssl: {
            ssl: true,
            cert: fs_1.default.readFileSync(process.env.INIT_CWD + '/src/Models/' + 'ca-certificate.crt')
        }
    },
};
