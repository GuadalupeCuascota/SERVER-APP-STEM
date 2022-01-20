import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";

class MateriasController {
  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query(
      "SELECT m.id_materia , m.nombre_materia, m.id_estado_materia, s.nombre_estado_materia, c.nombre_carrera, c.id_carrera, m.id_usuario FROM materia m , estado_materia s, usuario u, carreras_fica c where s.id_estado_materia=m.id_estado_materia and u.id_usuario=m.id_usuario and c.id_carrera=u.id_carrera ORDER BY m.id_materia DESC",
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
    const materias = await pool.query(
      "SELECT * FROM materia WHERE id_materia=?",
      [id]
    );
    console.log(materias);
    if (materias.length > 0) {
      return res.json(materias[0]);
    }
    res.json({ text: "la materia no existe" });
  }

  public async create(req: Request, res: Response) {
    try {
      const nombre_materia = req.body.nombre_materia;
      const id_usuario = req.body.id_usuario;
      const id_estado_materia = req.body.id_estado_materia;

      console.log("el nombre", nombre_materia);
      console.log("el nombre", id_usuario);
      console.log("el nombre", id_estado_materia);
      const query =
        "INSERT INTO materia (nombre_materia, id_estado_materia, id_usuario) VALUES (?,?,?)";
      await pool.query(query, [nombre_materia, id_estado_materia, id_usuario]);
      res.status(201).json({ text: "carrera guardado" });
    } catch (err) {
      res.status(404).json({ text: "Hubo un error " });
      console.log("hubo un errro" + err);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query(" DELETE FROM materia WHERE id_materia=?", [id]);

      res.status(201).json({ text: "materia eliminada" });
    } catch (err) {
      res.status(404).json({ text: err });

      console.log("No se puede eliminar" + err);
    }
  }

  // res.json({ text: "eliminando" + req.params.id });

  public async update(req: Request, res: Response) {
    console.log("pasa actualizar");
    const { id } = req.params;
    const { id_materia, nombre_materia } = req.body;

    console.log("materia", nombre_materia);
    if (id_materia) {
      try {
        const roles = await pool.query(
          " UPDATE  materia set nombre_materia=? WHERE id_materia=?",
          [nombre_materia, id]
        );
        res.status(201).json({ message: "actualizado" });
      } catch (error) {
        res.status(404).json({ text: "Hubo un error ", error });
        console.log("No se puede actualizar" + error);
      }
    } else {
      res.json({ message: "Atributos requeridos" });
    }
  }

  public async getMateriasPorCarrera(req: Request, res: Response) {
    const { id } = req.params;

    const materiasCarrera = await pool.query(
      "SELECT m.nombre_materia from materia_carrera mc, materia m, carreras_fica c where c.nombre_carrera=? and mc.id_materia=m.id_materia and c.id_carrera=mc.id_carrera",
      [id]
    );

    console.log("el arreglo", materiasCarrera);

    if (materiasCarrera.length > 0) {
      return res.status(200).json(materiasCarrera);
    } else {
      console.log();
      return res.status(404).json("error al cargar");
    }
  }

  public updateEstadoMateria(req: Request, res: Response) {
    console.log("PASA AQUI ACTUALIZAR ESTADO");

    try {
      const { id } = req.params;
      const { id_estado_materia } = req.body;

      if (id) {
        const query =
          "UPDATE materia set id_estado_materia=? where id_materia=?";
        pool.query(query, [id_estado_materia, id]);
        res.status(201).json({ message: "actualizado" });
      } else {
        res.status(404).json({ text: "Hubo un error " });
      }
    } catch (err) {
      res.status(404).json({ text: "Hubo un error ", err });
    }
  }
}
export const materiasController = new MateriasController();
