import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";

class RolesController {

  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT * FROM rol", (err: any, rows: any) => {
      if (err) {
        res.status(404).json("error al cargar");
        console.log(err)
      } else {
        res.status(200).json(rows);
        console.log("Datos seleccionados probando1");
      }
    });
  }

  public async getOne(req: Request, res: Response) {
    // pool.query("INSERT INTO rol set ?", [req.body]);

    const { id } = req.params;
    const roles = await pool.query("SELECT * FROM rol WHERE id_rol=?", [id]);
    console.log(roles);
    if (roles.length > 0) {
      return res.json(roles[0]);
    }
    res.json({ text: "el rol no existe" });
  }
  

  public   async create(req: Request, res: Response  ) {
    
    try{
   const tipo_rol=req.body.tipo_rol;
   const query="INSERT INTO rol(tipo_rol)VALUES (?)";
    await pool.query(query,[tipo_rol]);
    res.status(201).json({ text: "Guardado" });
    }catch(err){
      res.status(400).json({ text: "Hubo un error " });
      console.log("hubo un errro"+ err)
    }
  }



  public  async delete(req: Request, res: Response): Promise <void>
   {
    try{
      const {id} = req.params;
      await pool.query(" DELETE FROM rol WHERE id_rol=?", [id]);
      res.status(204).json({ message: "el dato fue eliminado" });

    }catch (err){

     
      res.status(404).json({ text: "Hubo un error " });
    }
    
    
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    
      const {id} = req.params;
      const{id_rol,tipo_rol}=req.body
     
      
     if(tipo_rol){
       try {
        const roles= await pool.query(" UPDATE rol set ? WHERE id_rol=?",[req.body,id]);
        res.json({ message: "actualizado"});
       } catch (error) {
        res.json({ text: "Hubo un error " ,error});
        console.log("No se puede actualizar"+ error)
       }
      
    } else{
      res.json({ message: "Atributos requeridos"});
    }
    
      
   
    
   
  }
}
export const rolesController = new RolesController(); //instanciar la clase
