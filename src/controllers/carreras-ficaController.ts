import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";

class CarrerasFicaController {

  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT * FROM carreras_fica ORDER BY id_carrera DESC", (err: any, rows: any) => {
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
    const carreras = await pool.query("SELECT * FROM carreras_fica WHERE id_carrera=?", [id]);
    console.log(carreras);
    if (carreras.length > 0) {
      return res.json(carreras[0]);
    }
    res.json({ text: "la carrera no existe" });
  }
  

  public   async create(req: Request, res: Response  ) {
    
    try{
   const nombre_carrera=req.body.nombre_carrera;
  
   const query="INSERT INTO carreras_fica(nombre_carrera)VALUES (?)";
    await pool.query(query,[nombre_carrera]);
    res.json({ text: "carrera guardado" });
    }catch(err){
      res.json({ text: "Hubo un error " });
      console.log("hubo un errro"+ err)
    }
  }



  public  async delete(req: Request, res: Response): Promise <void>
   {
    try{
      const {id} = req.params;
      await pool.query(" DELETE FROM carreras_fica WHERE id_carrera=?", [id]);
     
      res.status(201).json({ text: "carrera guardado" });

    }catch (err){
      res.status(404).json({ text: err });
      
      console.log("No se puede eliminar"+ err)
    }
    
    
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    console.log("pasa actualizar")
      const {id} = req.params;
      const{id_carrera,nombre_carrera}=req.body
     
      
     if(id_carrera){
       try {
        const roles= await pool.query(" UPDATE  carreras_fica set nombre_carrera=? WHERE id_carrera=?",[nombre_carrera,id]);
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
export const carrerasficaController = new CarrerasFicaController();