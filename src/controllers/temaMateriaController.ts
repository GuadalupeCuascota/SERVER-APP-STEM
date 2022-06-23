import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";
class TemaMateriaController {

    public async list(req: Request, res: Response) {
      // const roles = await pool.query("SELECT * FROM rol");
      // res.json(roles);
      await pool.query("SELECT id_tema_materia, nombre_tema, id_materia FROM tema_materia", (err: any, rows: any) => {
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
      const temas= await pool.query("SELECT tm.nombre_tema, tm.id_tema_materia ,m.id_materia ,m.nombre_materia FROM tema_materia tm , materia m where m.id_materia=? and m.id_materia=tm.id_materia", [id]);
      console.log(temas);
      if (temas.length > 0) {
        return res.status(200).json(temas);
       
      } 
      return res.status(404).json({ text: "No existe temas registrados" });
    
    }
    
  
    public   async create(req: Request, res: Response  ) {
      console.log("ENTRA")
      try{
     const nombre_tema=req.body.nombre_tema;
     const id_materia=req.body.id_materia;
    console.log("el nombre",nombre_tema)
    console.log("carrera",id_materia)
     const query="INSERT INTO tema_materia ( nombre_tema, id_materia) VALUES (?,?)";
      await pool.query(query,[nombre_tema,id_materia]);
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
        await pool.query(" DELETE FROM  tema_materia WHERE id_tema_materia=?", [id]);
       
        res.status(201).json({ text: "tema eliminada" });
  
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
  export const temaMateriaController = new TemaMateriaController();