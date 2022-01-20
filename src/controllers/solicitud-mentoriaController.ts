
import { Request, Response } from "express";
import pool from "../database";

class SolicitudMentoriaController {

  public async list(req: Request, res: Response) {
  
    await pool.query("SELECT sm.id_solicitud_mentoria, m.nombre_materia,tm.nombre_tema ,u.nombre,m.id_usuario,u.apellido,u.correo_electronico,c.nombre_carrera,c.id_carrera ,sm.fecha_solicitud_mentoria, m.id_usuario from solicitud_mentoria sm, usuario u, materia m, tema_materia tm , carreras_fica c where u.id_usuario=sm.id_usuario and m.id_materia=sm.id_materia and c.id_carrera=u.id_carrera and tm.id_tema_materia=sm.id_tema_materia ORDER BY sm.fecha_solicitud_mentoria DESC ", (err: any, rows: any) => {
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
   

    const { id } = req.params;
    const solicitudes = await pool.query("SELECT sm.id_solicitud_mentoria,m.nombre_materia,tm.nombre_tema, u.nombre ,u.apellido,c.nombre_carrera,c.id_carrera, sm.fecha_solicitud_mentoria from solicitud_mentoria sm, usuario u, materia m, tema_materia tm ,carreras_fica c where m.id_materia=sm.id_materia and sm.id_tema_materia=tm.id_tema_materia and u.id_usuario=sm.id_usuario and c.id_carrera=u.id_carrera and u.id_usuario=? ", [id]);                                                            
    if (solicitudes.length > 0) {
      res.status(200).json(solicitudes);
    }else{
      res.status(404).json("No existe la mentoria");
    }
    
   
  }
  

  public   async create(req: Request, res: Response  ) {
    console.log("ENTRA")
    try{
   const id_materia=req.body.id_materia;
   const id_tema_materia=req.body.id_tema_materia;
   const id_usuario=req.body.id_usuario;
   console.log("id_materia",id_materia)
   console.log("id_tema_materia",id_tema_materia)

   const query="INSERT into solicitud_mentoria (id_materia,id_tema_materia,id_usuario) VALUES (?,?,?)";
    await pool.query(query,[id_materia,id_tema_materia,id_usuario]);
    
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
      await pool.query(" DELETE FROM `solicitud_mentoria` WHERE id_solicitud_mentoria=?", [id]);
     
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
export const solicitudMentoriaController = new SolicitudMentoriaController();