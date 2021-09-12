
import { Request, Response } from "express";
import pool from "../database";

class SolicitudMentoriaController {

  public async list(req: Request, res: Response) {
  
    await pool.query("SELECT m.nombre_materia , sm.tema, u.nombre ,u.apellido,u.carrera from materia_carrera mc, solicitud_mentoria sm, materia m, carreras_fica c, usuario u where mc.id_materia_carrera=sm.id_materia_carrera  and mc.id_materia=m.id_materia and mc.id_carrera=c.id_carrera and u.id_usuario=sm.id_usuario ", (err: any, rows: any) => {
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
    const solicitudes = await pool.query("SELECT m.nombre_materia , sm.tema, u.nombre ,u.apellido,u.carrera from materia_carrera mc, solicitud_mentoria sm, materia m, carreras_fica c, usuario u where mc.id_materia_carrera=sm.id_materia_carrera  and mc.id_materia=m.id_materia and mc.id_carrera=c.id_carrera and u.id_usuario=sm.id_usuario and u.id_usuario=?", [id]);
    console.log(solicitudes);
    if (solicitudes.length > 0) {
      return res.json(solicitudes);
    }
    res.json({ text: "la materia no existe" });
  }
  

  public   async create(req: Request, res: Response  ) {
    console.log("ENTRA")
    try{
   const nombre_materia=req.body.nombre_materia;
   const nombre_carrera=req.body.nombre_carrera
   const tema=req.body.tema;
   const id_usuario=req.body.id_usuario;
   console.log("id_usuario",id_usuario)

   const query="INSERT into solicitud_mentoria (id_materia_carrera,tema,id_usuario) VALUES ((select mc.id_materia_carrera from materia_carrera mc, materia m , carreras_fica c where m.nombre_materia=? and m.id_materia=mc.id_materia and c.nombre_carrera=? and mc.id_carrera=c.id_carrera),?,?)";
    await pool.query(query,[nombre_materia,nombre_carrera,tema,id_usuario]);
    
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
export const solicitudMentoriaController = new SolicitudMentoriaController();