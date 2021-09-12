import { Console } from "console";
import { Request, Response } from "express";
import pool from "../database";

class MentoriasController {
  // public async list(req: Request, res: Response) {
  //   const usuarios = await pool.query("SELECT * FROM usuario");
  //   res.json(usuarios);
  // }

  public async list(req: Request, res: Response) {
    console.log("pasa obtner mentorias registradas");
    await pool.query(
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido,u.carrera,m.id_usuario from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario",
      (err: any, rows: any) => {
        if (err) {
          res.status(404).json("error al cargar");
          console.log(err);
        } else {
          res.status(200).json(rows);
          console.log("registro de mentorias registradas seleccionados");
        }
      }
    );
  }

  public async getMentoriasUsuario(req: Request, res: Response) {
    console.log("obtner");
    const { id } = req.params;
    const registroMentoriasporUsuario = await pool.query(
      "SELECT fecha, hora_inicio, hora_fin,tipo_mentoria from registro_mentoria WHERE id_usuario=?",
      [id]
    );

    console.log(registroMentoriasporUsuario);
    if (registroMentoriasporUsuario.length > 0) {
      return res.status(200).json(registroMentoriasporUsuario);
    }
    res
      .status(404)
      .json({ text: "En este momento no existe mentorias disponibles" });
  }

  public async getOne(req: Request, res: Response) {
    console.log("obtener mentoria por id");
    const { id } = req.params;
    const registroMentorias = await pool.query(
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?",
      [id]
    );

    console.log(registroMentorias);
    if (registroMentorias.length > 0) {
      return res.status(200).json(registroMentorias[0]);
    }
    res.status(404).json({ text: "El registro no existe" });
  }

  public async create(req: Request, res: Response) {
    console.log("pasa crear registro mentoria");

    try {
      const { fecha, hora_inicio, hora_fin, id_usuario } = req.body;
      console.log("fecha:" + req.body.fecha);
      console.log("fecha:" + req.body.hora_inicio);

      const findRegistro = await pool.query(
        "SELECT * FROM registro_mentoria WHERE id_usuario=? and hora_inicio=? and fecha= ?",
        [id_usuario, hora_inicio, fecha]
      );

      if (findRegistro.length > 0) {
        res.status(404).json({ text: "Mentoria duplicada" });
      } else {
        console.log("no existe mentoria");
        const query =
          "INSERT INTO registro_mentoria(fecha, hora_inicio, hora_fin, id_usuario) VALUES (?,?,?,?)";
        await pool.query(query, [fecha, hora_inicio, hora_fin, id_usuario]);
        res.status(201).json({ text: "mentoria registrada" });
      }
    } catch (err) {
      res.json({ text: "Hubo un error " });
      console.log("hubo un errro" + err);
    }
  }
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log("id_registro:" + id);
      await pool.query(
        " DELETE FROM registro_mentoria  WHERE id_registro_mentoria=?",
        [id]
      );
      res.status(201).json({ text: "el dato fue eliminado" });
    } catch (error) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("no se puede eliminar" + error);
    }
  }

  public async update(req: Request, res: Response) {
    console.log("fecha:" + req.body.fecha);
    try {
      const { id } = req.params;
      const fecha = req.body.fecha;
      const hora_inicio = req.body.hora_inicio;
      const hora_fin = req.body.hora_fin;
      const id_usuario = req.body.id_usuario;

      const query =
        "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=? where id_registro_mentoria=?";
      pool.query(query, [fecha, hora_inicio, hora_fin, id]);
      res.status(200).json({ text: "registro actualizado" });
      console.log("actualizado");
    } catch (error) {
      console.log("error", error);
      res.status(404).json({ text: "Hubo un error" });
    }
  }
}

export const mentoriasController = new MentoriasController(); //instanciar la clase
