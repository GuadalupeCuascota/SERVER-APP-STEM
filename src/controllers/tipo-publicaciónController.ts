import { Request, Response } from "express";
import pool from "../database";
import { Router } from "express";

class TipoPublicacionController {

  public async list(req: Request, res: Response) {
    
    await pool.query("SELECT * FROM tipo_publicacion", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");
        console.log(err)
      } else {
        res.json(rows);
        console.log("Datos seleccionados");
      }
    });
  }
  

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const tipoPublicación = await pool.query("SELECT * FROM tipo_publicacion WHERE id_tipo_publicacion=?", [id]);

    if (tipoPublicación.length > 0) {
      return res.json(tipoPublicación[0]);
    }
    res.status(404).json({ text: "el tipo de publicación no existe" });
  }

  public async create(req: Request, res: Response) {
   
    const nombre_tipo_publicacion = req.body.nombre_tipo_publicacion;
    console.log(nombre_tipo_publicacion)

    const query ="INSERT INTO tipo_publicacion (nombre_tipo_publicacion) VALUES (?)";
    
    if(nombre_tipo_publicacion) {
     pool.query(query, [nombre_tipo_publicacion]);
      res.json("tipo publicación guardado");
    }else{
      console.log("no se puede guardar")
      res.json("NO se puede guardar");
      
    }
    
    

  }
  public async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await pool.query("DELETE FROM tipo_publicacion WHERE id_tipo_publicacion=?", [id]);
      res.json({status: 'Eliminado'});
    
    } catch (error) {
      res.json({ text: "Hubo un error " });
      console.log("No se puede eliminar"+ error)
    }
     
    
   

    // try {
    //   await pool.query("DELETE FROM tipo_publicacion WHERE id_tipo_publicacion=?", [id]);
    //   res.json({status: 'Elimindado'});
    // } catch(err) {
    //   console.log("hola"+err);
    //   res.json({status: 'error'});
    // }
    
   

  
    
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
    
    const roles = await pool.query(" UPDATE tipo_publicacion set ? WHERE id_tipo_publicacion=?",[req.body, id]);
    res.json({ message: "actualizado" });
    } catch (error) {
      res.json({ text: "Hubo un error " });
      console.log("No se puede actualizar"+ error) 
    }
    
  }
}

export const tipoPublicaciónController = new TipoPublicacionController(); //instanciar la clase
