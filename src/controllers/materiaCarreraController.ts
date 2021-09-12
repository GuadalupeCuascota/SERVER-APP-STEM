import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";

class MateriasCarreraController {

  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT m.nombre_materia, c.nombre_carrera from materia m, carreras_fica c , materia_carrera mc where mc.id_materia=m.id_materia and mc.id_carrera=c.id_carrera", (err: any, rows: any) => {
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
    const materias = await pool.query("SELECT * FROM materia WHERE id_materia=?", [id]);
    console.log(materias);
    if (materias.length > 0) {
      return res.json(materias[0]);
    }
    res.json({ text: "la materia no existe" });
  }
  

  public   async create(req: Request, res: Response  ) {
    console.log("ENTRA")
    try{
   const nombre_materia=req.body.nombre_materia;
   const nombre_carrera=req.body.nombre_carrera;
  console.log("el nombre",nombre_materia)
  console.log("carrera",nombre_carrera)
   const query="INSERT into materia_carrera (id_materia,id_carrera) VALUES ((select id_materia from materia where nombre_materia=?),(select id_carrera from carreras_fica where nombre_carrera=?))";
    await pool.query(query,[nombre_materia,nombre_carrera]);
    res.status(201).json({ text: " Guardado" });
    }catch(err){
        res.status(404).json({ text: "Hubo un error " });
      console.log("hubo un errro"+ err)
    }
  }



  public  async delete(req: Request, res: Response): Promise <void>
   {
    try{
      const {id} = req.params;
      await pool.query(" DELETE FROM materia WHERE id_materia=?", [id]);
     
      res.status(201).json({ text: "materia eliminada" });

    }catch (err){
      res.status(404).json({ text: err });
      
      console.log("No se puede eliminar"+ err)
    }
    
    
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    console.log("pasa actualizar")
      const {id} = req.params;
      const{id_materia,nombre_materia}=req.body
     
      
     if(id_materia){
       try {
        const roles= await pool.query(" UPDATE  materia set nombre_materia=? WHERE id_materia=?",[nombre_materia,id]);
        res.status(201).json({ message: "actualizado"});
       } catch (error) {
        res.status(404).json({ text: "Hubo un error " ,error});
        console.log("No se puede actualizar"+ error)
       }
      
    } else{
      res.json({ message: "Atributos requeridos"});
    }
    
      
   
    
   
  }
}
export const materiasCarreraController = new MateriasCarreraController();