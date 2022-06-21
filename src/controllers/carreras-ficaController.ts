import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";

class CarrerasFicaController {
  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query(
      "SELECT * FROM carreras_fica ORDER BY id_carrera DESC",
      (err: any, rows: any) => {
        if (err) {
          res.status(404).json("error al cargar");
          console.log(err);
        } else {
          res.status(200).json(rows);
          console.log("Datos seleccionados probando1");
        }
      }
    );
  }

  public async getOne(req: Request, res: Response) {
    // pool.query("INSERT INTO rol set ?", [req.body]);

    const { id } = req.params;
    const carreras = await pool.query(
      "SELECT * FROM carreras_fica WHERE id_carrera=?",
      [id]
    );
    console.log(carreras);
    if (carreras.length > 0) {
      return res.json(carreras[0]);
    }
    res.json({ text: "la carrera no existe" });
  }

  public async create(req: Request, res: Response) {
    const cloudinary = require("cloudinary");
    cloudinary.config({
      //conexion a cloudinary
      cloud_name: "dlmebnxnv",
      api_key: "941161988641637",
      api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
    });
    const fs = require("fs-extra");
    try {
      const { nombre_carrera, descripcion, siglas } = req.body;
      console.log("siglas", siglas);
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(result);
        const ruta_archivo = result.secure_url;
        const query =
          "INSERT INTO carreras_fica(nombre_carrera,ruta_archivo,descripcion,siglas)VALUES (?,?,?,?)";
        await pool.query(query, [
          nombre_carrera,
          ruta_archivo,
          descripcion,
          siglas,
        ]);
        console.log("id carrera", siglas);
        await fs.unlink(req.file.path); //eliminar de archivo de la ruta local
        res.status(201).json({ text: "Archivo guardado" });
      } else {
        try {
          const query1 =
            "INSERT INTO carreras_fica(nombre_carrera,descripcion,siglas)VALUES (?,?,?)";
          await pool.query(query1, [nombre_carrera, descripcion, siglas]);
          res.status(201).json({ text: "Archivo guardado" });
        } catch (error) {
          res.status(404).json({ text: "error no se puede guardar" });
        }
      }
    } catch (error) {
      res.status(404).json({ text: "error no se puede guardar" });
    }
  }
  public async delete(req: Request, res: Response): Promise<Response> {
  
      const { id } = req.params;
      const cloudinary = require("cloudinary");
    cloudinary.config({
      //conexion a cloudinary
      cloud_name: "dlmebnxnv",
      api_key: "941161988641637",
      api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
    });
    const carrera = await pool.query(
      "SELECT * FROM carreras_fica WHERE id_carrera=?",
      [id]
    );
    if (carrera.length > 0) {
      await pool.query(" DELETE FROM carreras_fica WHERE id_carrera=?", [id]);
     
        return res.status(204).json({ message: "el archivo fue eliminado" });
      
    }
    return res.status(404).json({ text: "el archivo no existe" });
      
  }

      
    
      
  

  // res.json({ text: "eliminando" + req.params.id });

  public async update(req: Request, res: Response) {
    console.log("pasa actualizar");
    const cloudinary = require("cloudinary");
    cloudinary.config({
      cloud_name: "dlmebnxnv",
      api_key: "941161988641637",
      api_secret: "goFBkSN4gSR10QPWAhS4e18-O5U",
    });
    const fs = require("fs-extra");
    
    try {
      const { id } = req.params;
      const { nombre_carrera, siglas, descripcion, ruta_archivo } = req.body;
      console.log("carrera",nombre_carrera);
      if (req.file) {
        try {
          const query =
            " UPDATE  carreras_fica set nombre_carrera=?, siglas=?,descripcion=?,ruta_archivo=? WHERE id_carrera=?";
          const result = await cloudinary.v2.uploader.upload(req.file.path);
          console.log(result);
          await pool.query(query, [
            nombre_carrera,
            siglas,
            descripcion,
            ruta_archivo,
            id,
          ]);
          return res.status(204).json({ text: "carrera actualizada" });
        } catch (error) {
          console.log(error);
          return res.status(404).json({ text: "Hubo un error ", error });
        }
      } else {
        try {
          const query =
            " UPDATE  carreras_fica set nombre_carrera=?, siglas=?,descripcion=?,ruta_archivo=? WHERE id_carrera=?";
          const ruta_archivo = req.body.ruta_archivo;
          await pool.query(query, [
            nombre_carrera,
            siglas,
            descripcion,
            ruta_archivo,
            id,
          ]);
          return res.status(204).json({ text: "carrera actualizada" });
        } catch (error) {
          console.log("el error", error);
          return res.status(404).json({ text: "Hubo un error " });
        }
      }
    } catch (error) {
      console.log("no se puede actualizar" + error);
      return res.status(404).json({ text: "Hubo un error " });
    }

    //   const {id} = req.params;
    //   const{id_carrera,nombre_carrera}=req.body

    //  if(id_carrera){
    //    try {
    //     const roles= await pool.query(" UPDATE  carreras_fica set nombre_carrera=? WHERE id_carrera=?",[nombre_carrera,id]);
    //     res.status(201).json({ text: "carrera actualizada" });

    //    } catch (error) {
    //     res.status(404).json({ text: "No se puede actualizar" });
    //     console.log("No se puede actualizar"+ error)
    //    }

    // } else{
    //   res.json({ message: "Atributos requeridos"});
    // }
  }
}
export const carrerasficaController = new CarrerasFicaController();
