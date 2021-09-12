import { Request, Response , NextFunction} from "express";
import pool from "../database";
let usu:any={};
let tipo:any={};
let tipo1:"";
let id:"";


export const checkRol1=(roles:Array<string>)=>{
  
  console.log("PASA AQUI")
 return async (req: Request, res: Response, next: NextFunction)=>{
  const usuario=res.locals.payload;
  usu=usuario;
  id=usu.payload.id_usuario
  console.log(id)
 
  
    try {
     const tipo_rol=await pool.query(
       "SELECT tipo_rol FROM usuario u, rol r WHERE  u.id_rol=r.id_rol and  u.id_usuario=?",
       [id]);
       
      console.log("el tipo  de rol",tipo_rol)
      
    } catch (error) {
     return res.status(401).json({message:'No autorizado00'});
    }
     
   
 
   }
 }


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
