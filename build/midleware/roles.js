"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRol1 = void 0;
const database_1 = __importDefault(require("../database"));
let usu = {};
let tipo = {};
let tipo1;
let id;
const checkRol1 = (roles) => {
    console.log("PASA AQUI");
    return async (req, res, next) => {
        const usuario = res.locals.payload;
        usu = usuario;
        id = usu.payload.id_usuario;
        console.log(id);
        try {
            const tipo_rol = await database_1.default.query("SELECT tipo_rol FROM usuario u, rol r WHERE  u.id_rol=r.id_rol and  u.id_usuario=?", [id]);
            console.log("el tipo  de rol", tipo_rol);
        }
        catch (error) {
            return res.status(401).json({ message: 'No autorizado00' });
        }
    };
};
exports.checkRol1 = checkRol1;
// export const checkRol=(roles:Array<string>)=>{
//  console.log("PASA AQUI")
// return async (req: Request, res: Response, next: NextFunction)=>{
//  const {id_usuario}=res.locals.payload;
//   console.log("el id del usuario ess",{id_usuario})
//    try {
//     const usuario=await pool.query(
//       "SELECT * FROM usuario WHERE id_usuario=? ",
//       [id_usuario]);
//    } catch (error) {
//     return res.status(401).json({message:'No autorizado00'});
//    }
//   }
// }
