import { query, Request, Response } from "express";
import pool from "../database";
import brycpt from "bcryptjs";
import jwt from "jsonwebtoken";

class UsuariosController {
  // public async list(req: Request, res: Response) {
  //   const usuarios = await pool.query("SELECT * FROM usuario");
  //   res.json(usuarios);
  // }
  public async list(req: Request, res: Response) {
    await pool.query(
      "SELECT u.id_usuario, u.nombre, u.apellido,u.nivel_academico,c.nombre_carrera,c.id_carrera,u.unidad_educativa,u.correo_electronico,u.contrasenia, r.tipo_rol ,u.id_rol from usuario u, rol r, carreras_fica c where u.id_rol=r.id_rol and c.id_carrera=u.id_carrera ORDER BY fecha_registro DESC ",
      (err: any, rows: any) => {
        if (err) {
          res.status(404).json("error al cargar");
          console.log(err);
        } else {
          res.status(200).json(rows);
          console.log("Datos de usuarios seleccionados");
        }
      }
    );
  }
  public async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const usuarios = await pool.query(
      " SELECT  u.id_usuario, u.nombre, u.apellido,u.nivel_academico,c.nombre_carrera,c.id_carrera,u.unidad_educativa,u.correo_electronico,u.contrasenia, r.tipo_rol ,u.id_rol from usuario u, rol r, carreras_fica c WHERE  r.id_rol=u.id_rol and c.id_carrera=u.id_carrera and u.id_usuario=?",
      [id]
    );

    console.log(usuarios);
    if (usuarios.length > 0) {
      return res.status(200).json(usuarios[0]);
    }
    res.status(404).json({ text: "el usuario no existe" });
  }

  public async create(req: Request, res: Response) {
    console.log("pasa el servidor save");
    const {
      nombre,
      apellido,
      nivel_academico,
      
      unidad_educativa,
      correo_electronico,
      contrasenia,
      id_carrera,
      id_rol,
    } = req.body;

    console.log("rol:" + req.body.id_rol);
    console.log("la carrera"+req.body.id_carrera)
    const findCorreo = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico=?",
      [correo_electronico]
    );
    if (findCorreo.length > 0) {
      res
        .status(404)
        .json({ text: "El correo electrónico ya ha sido registrado" });
    } else {
      if (!id_rol) {
        const query =
          "INSERT INTO usuario ( nombre,apellido,nivel_academico,unidad_educativa,correo_electronico,contrasenia, id_carrera,id_rol) VALUES (?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?),(select id_rol from rol where tipo_rol=?) )";
        
        const newId_rol = "Estudiante";
        try {
          await pool.query(query, [
            nombre,
            apellido,
            nivel_academico,
            unidad_educativa,
            correo_electronico,
            contrasenia,
            id_carrera,
            newId_rol,
            
          ]);
          res.status(201).json({ text: "usuario guardado" });
        } catch (error) {
          res.status(400).json({ text: "Hubo un error " });
          console.log("no se puede guardar" + error);
        }
      } else {
        console.log("pasa el usuario 2");
        try {
          const query =
            "INSERT INTO usuario ( nombre,apellido,nivel_academico,unidad_educativa,correo_electronico,contrasenia, id_carrera,id_rol) VALUES (?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?),(select id_rol from rol where tipo_rol=?) )";
         
          console.log("EL ROL es:", id_rol);
          if (id_rol == "Admin") {
            await pool.query(query, [
              nombre,
              apellido,
              nivel_academico,
            
              unidad_educativa,
              correo_electronico,
              contrasenia,
              id_carrera,
              id_rol,
            ]);
            res.status(201).json({ text: "usuario guardado" });
          }
          if (id_rol == "Editor") {
            await pool.query(query, [
              nombre,
              apellido,
              nivel_academico,
            
              unidad_educativa,
              correo_electronico,
              contrasenia,
              id_carrera,
              id_rol,
              
            ]);
            res.status(201).json({ text: "usuario guardado" });
          }

          if (id_rol == "Mentor") {
            await pool.query(query, [
              nombre,
              apellido,
              nivel_academico,
              unidad_educativa,
              correo_electronico,
              contrasenia,
              id_carrera,
              id_rol,
              
            ]);
            res.status(201).json({ text: "usuario guardado" });
          }
        } catch (error) {
          res.status(404).json({ text: error });
          console.log("no se puede guardar el" + error);
        }
      }
    }

    //
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log("cedula:" + id);
      await pool.query(" DELETE FROM usuario WHERE id_usuario=?", [id]);
      res.status(204).json({ message: "el dato fue eliminado" });
    } catch (error) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("no se puede eliminar" + error);
    }
  }

  // res.json({ text: "eliminando" + req.params.id });

  public async update(req: Request, res: Response) {
    // console.log("nombre:"+req.body.nombre)
    // console.log("cedula:"+req.body.cedula)

    try {
      const { id } = req.params;
      console.log("id: " + id);

      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const nivel_academico = req.body.nivel_academico;
      const nombre_carrera = req.body.nombre_carrera;
      const unidad_educativa = req.body.unidad_educativa;
      const correo_electronico = req.body.correo_electronico;
      const contrasenia = req.body.contrasenia;
      const tipo_rol = req.body.tipo_rol;
    

      console.log("rol:" + req.body.tipo_rol);
      console.log("id_usuario:" + req.body.id_usuario);
      console.log("nombre new:" + req.body.nombre);
      console.log("correo:" + req.body.correo_electronico);
      console.log("nombre_carrera:" + req.body.id_carrera);
      
      const query =
        "UPDATE usuario set nombre=?,apellido=?,nivel_academico=?,id_carrera=(select id_carrera from carreras_fica where nombre_carrera=?),unidad_educativa=?,correo_electronico=?,contrasenia=?, id_rol=(select id_rol from rol where tipo_rol=?) WHERE id_usuario=?";
      pool.query(query, [
        nombre,
        apellido,
        nivel_academico,
        nombre_carrera,
        unidad_educativa,
        correo_electronico,
        contrasenia,
        tipo_rol,
        id,
      ]);
      res.status(201).json({ text: "usuario actualizado" });
    } catch (error) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("no se puede actualizar" + error);
    }
  }
  public async updatePass(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contrasenia = req.body.contrasenia;
      const contraseniaN = req.body.contraseniaN;
      console.log("el id", id);
      console.log("contra", contrasenia);
      const contra = await pool.query(
        "SELECT contrasenia FROM usuario where contrasenia=? and id_usuario=?",
        [contrasenia, id]
      );

      console.log("la consul", contra);
      if (contra.length > 0) {
        const query = "UPDATE usuario set contrasenia=? where id_usuario=?";
        pool.query(query, [contraseniaN, id]);
        res.status(201).json({ text: "contraseña actualizada" });
      } else {
        res.status(404).json({ text: "La contraseña no es correcta" });
      }

      // res.status(204).json({text: "usuario actualizado"});
    } catch (error) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("no se puede actualizar" + error);
    }
  }
  public async ForgotPassword(req: Request, res: Response){
    let message='Check your email for a link to reset your password'
    let emailStatus='OK'
    try {
      const { correo_electronico } = req.params;
    const findCorreo = await pool.query(
      "SELECT correo_electronico FROM usuario where correo_electronico=? and id_rol=4 ",
      [correo_electronico]
    );
    if(findCorreo.length>0){
      const payload = {
        id_usuario: findCorreo[0].id_usuario,
        
      };
      const Token = jwt.sign({ payload }, "SCRET", { expiresIn: "10m" });
     let verificationLink='http://localhost:3000/new-password/${Token}';
     return res.status(200).json({ message: "ok", verificationLink});
    }
    } catch (error) {
      res.status(404).json({ text: "correo electrónico no registrado " });

    }

   

  }
  public async RecuperarPass(req: Request, res: Response) {
    try {
      const { correo_electronico } = req.params;

      console.log("contra", correo_electronico);
      const correo = await pool.query(
        "SELECT correo_electronico FROM usuario where correo_electronico=? and id_rol=4 ",
        [correo_electronico]
      );
      if (correo.length > 0) {
        res.status(201).json({ text: "Dato encontrado" });
      } else {
        res.status(404).json({ text: "el usuario no existe" });
      }
    } catch (error) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("no se puede actualizar" + error);
    }
  }

  public async RestablecerPass(req: Request, res: Response) {
    console.log("pasa restablecer");
    try {
      const { id } = req.params;
      const contrasenia = req.body.contrasenia;
const resetToken=req.headers.reset as string;
      console.log("la consul", contrasenia);

      const query =
        "UPDATE usuario set contrasenia=? where correo_electronico=?";
      pool.query(query, [contrasenia, id]);
      res.status(201).json({ text: "contraseña restablecida" });
    } catch (error) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("no se puede actualizar" + error);
    }
  }
}

export const usuariosController = new UsuariosController(); //instanciar la clase
