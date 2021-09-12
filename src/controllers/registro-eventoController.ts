import { Request, Response } from "express";
import pool from "../database";
import path from "path";
import fs from "fs-extra";

class EventosController {
  public async list(req: Request, res: Response): Promise<void> {
    await pool.query("SELECT e.id_publicacion,p.titulo,u.nombre,u.apellido, t.nombre_tipo_evento FROM evento e,publicacion p, usuario u, tipo_evento t WHERE e.id_publicacion=p.id_publicacion and u.id_usuario=e.id_usuario and t.id_tipo_evento=e.id_tipo_evento", (err: any, rows: any) => {
      if (err) {
        res.status(404).json("error al cargar");
        console.log(err);
      } else {
        res.status(200).json(rows);
        console.log("Datos seleccionados");
      }
    });

  }
public async  verificar(req: Request, res: Response) {
  const{
    idP,
    idU
   }=req.params
   console.log("1",idU)
   console.log("2",idP)
   const verificar= await pool.query(
     "SELECT * FROM evento WHERE id_publicacion=? and id_usuario=?",
     [idP,idU]
   );
   if(verificar.length>0){
     console.log("ya existe")
    res.status(201).json({text: "ya existe"});
   }else{
    res.status(201).json({text: "No existe"});
    console.log("no existe")
   }
}


  public async createEvento(req: Request, res: Response): Promise<void> {
   
 
      console.log("pasa like")
      const {
        id_tipo_evento,
        id_publicacion,
        id_usuario,
       } = req.body;
       const query =
       "INSERT INTO evento (id_tipo_evento,id_publicacion,id_usuario) VALUES (?,?,?)";
       await pool.query(query,[id_tipo_evento,id_publicacion,id_usuario]);
       res.json({ text: "evento guardado" }); 
    

  }
  
  public async deleteEvento(req: Request, res: Response): Promise<void> {
  
    // try {
      const{
        idP,
        idU
       }=req.params
      
       const verificar= await pool.query(
        "SELECT * FROM evento WHERE id_publicacion=? and id_usuario=?",
        [idP,idU]
      );
      if(verificar.length>0){
        await pool.query("DELETE FROM evento WHERE id_usuario=? and  id_publicacion=?", [idU,idP]);
        res.status(204).json({text: "evento eliminado"});
      }else{
        res.status(404).json({ text: "Hubo un error " });
      }

    //  } catch (error) {
     
    //   console.log("no se puede eliminar"+ error)
    //  }
  

}



 
  
  


}
export const eventosController = new EventosController(); //instanciar la clase
