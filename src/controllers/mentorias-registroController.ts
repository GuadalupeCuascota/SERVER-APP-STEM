import { Console } from "console";
import { Request, Response } from "express";
import pool from "../database";
// import { transporter } from "../controllers/emailer";
import emailer = require("../controllers/emailer");

import nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

var myDate = new Date();
class MentoriasController {
  public async listMentoras(req: Request, res: Response) {
    console.log("pasa obtner mentoras");
    await pool.query(
      "SELECT DISTINCT u.id_usuario, u.nombre,u.apellido, u.id_usuario, c.nombre_carrera , c.id_carrera from registro_mentoria m, usuario u ,carreras_fica c WHERE c.id_carrera=u.id_carrera and m.id_usuario=u.id_usuario and m.fecha>=CURDATE()",

      (err: any, rows: any) => {
        if (err) {
          res.status(404).json("error al cargar");
          console.log(err);
        } else {
          res.status(200).json(rows);
          console.log("registro mentoras seleccionados");
        }
      }
    );
  }

  public async getHorariosMentora(req: Request, res: Response) {
    console.log("obtener disponibilidad de horarios");
    const { id } = req.params;
    const horariosMentorias = await pool.query(
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.id_carrera, m.id_materia , mt.nombre_materia, m.id_estado_mentoria, t.nombre_estado_mentoria , t.id_estado_mentoria from registro_mentoria m, usuario u , materia mt, tipo_estado_mentoria t WHERE m.id_usuario=u.id_usuario and mt.id_materia=m.id_materia and u.id_usuario=? and  m.fecha>=CURDATE() and t.id_estado_mentoria=m.id_estado_mentoria",
      [id]
    );

    console.log(horariosMentorias);
    if (horariosMentorias.length > 0) {
      return res.status(200).json(horariosMentorias);
    }
    res.status(404).json({ text: "El registro no existe" });
  }

  public async list(req: Request, res: Response) {
    console.log("pasa obtner mentorias registradas");
    await pool.query(
      "SELECT r.id_registro_mentoria,r.fecha, r.hora_inicio, r.hora_fin,u.nombre,u.apellido,c.nombre_carrera,c.id_carrera,r.id_usuario, m.nombre_materia ,ts.nombre_estado_mentoria from registro_mentoria r, usuario u, tipo_estado_mentoria ts, carreras_fica c, materia m	WHERE r.id_usuario=u.id_usuario and c.id_carrera=u.id_carrera and ts.id_estado_mentoria=r.id_estado_mentoria and m.id_materia=r.id_materia ORDER BY fecha_registro DESC",
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
  public async listporTipo(req: Request, res: Response) {
    console.log("pasa obtner mentorias registradas");

    await pool.query(
      "SELECT t.nombre_estado_mentoria as 'TipoMentoria',COUNT(r.id_registro_mentoria) as 'NroMentoriasAgendadas' from registro_mentoria r , tipo_estado_mentoria t WHERE t.id_estado_mentoria=r.id_estado_mentoria group by t.id_estado_mentoria",
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
      "SELECT fecha, hora_inicio, hora_fin, materia from registro_mentoria WHERE id_usuario=?",
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
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, m.id_materia, mat.nombre_materia from registro_mentoria m, usuario u , materia mat WHERE m.id_usuario=u.id_usuario and mat.id_materia=m.id_materia and m.id_registro_mentoria=?",
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
    let date = new Date();
    let day = `${date.getDate()}`.padStart(2, "0");
    let month = `${date.getMonth() + 1}`.padStart(2, "0");
    let year = date.getFullYear();
    let fechaActual = `${year}-${month}-${day}`;

    try {
      const {
        fecha,
        hora_inicio,
        hora_fin,
        id_usuario,
        nombre_materia,
        id_estado_mentoria,
      } = req.body;
      console.log("fecha:" + req.body.fecha);
      console.log("fecha:" + req.body.hora_inicio);
      console.log("estado_registro" + req.body.id_estado_mentoria);
      console.log("nombre_materia" + req.body.nombre_materia);
      const findRegistro = await pool.query(
        "SELECT * FROM registro_mentoria WHERE id_usuario=? and hora_inicio=? and fecha= ?",
        [id_usuario, hora_inicio, fecha]
      );

      if (findRegistro.length > 0) {
        res.status(404).json({ text: "Mentoria duplicada" });
      } else {
        const query =
          "INSERT INTO registro_mentoria(fecha, hora_inicio, hora_fin, id_usuario, id_materia,id_estado_mentoria) VALUES (?,?,?,?,(select id_materia from materia where nombre_materia=?),?)";
        await pool.query(query, [
          fecha,
          hora_inicio,
          hora_fin,
          id_usuario,
          nombre_materia,
          id_estado_mentoria,
        ]);
        res.status(201).json({ text: "mentoria registrada" });
      }
    } catch (err) {
      res.status(404).json({ text: "hubo un error" + err });
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
  public async updateRegistroMentoria(req: Request, res: Response) {
    console.log("pasa actualizar:");
    try {
      const { id } = req.params;
      console.log("el id", id);
      const id_estado_mentoria = req.body.id_estado_mentoria;
      console.log("el estado", id_estado_mentoria);

      const query =
        "UPDATE registro_mentoria SET id_estado_mentoria=? WHERE id_registro_mentoria=?";
      pool.query(query, [id_estado_mentoria, id]);
      res.status(200).json({ text: "registro actualizado" });
      console.log("actualizado");
    } catch (error) {
      console.log("error", error);
      res.status(404).json({ text: "Hubo un error" });
    }
  }

  public async updateRegistroMentoria1(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const id_estado_mentoria = req.body.id_estado_mentoria;

      const fecha = req.body.fecha;
      const hora_inicio = req.body.hora_inicio;

      let date = new Date();
      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();
      let fechaActual = `${year}-${month}-${day}`;

      let horaActual = `${date.getHours()}`;
      let minutosActual = `${date.getMinutes() + 1}`;
      let h = parseInt(horaActual);
      let m = parseInt(minutosActual);

      var horaMentoria = hora_inicio.split(":");
      let h1 = horaMentoria[0];
      let m2 = horaMentoria[1];

      let horaA = h1 - h;
      let minutoA = m2 - m;

      if (minutoA < 0) {
        horaA--;
        minutoA = 60 + minutoA;
      }

      console.log("horas", horaA);
      console.log("minutos", minutoA);
      console.log("la fecha", fecha);
      console.log("la fecha Actual", fechaActual);

      if (fechaActual <= fecha) {
        if (horaA >= 1) {
          const query =
            "UPDATE registro_mentoria SET id_estado_mentoria=? WHERE id_registro_mentoria=?";
          pool.query(query, [id_estado_mentoria, id]);
          const usuario = await pool.query(
            "select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?",

            [id]
          );
          console.log(usuario);
          var arrayUsuario = [];
          var someVar = [];
          for (let usu of usuario) {
            someVar.push(usu.correo_electronico);
          }

          arrayUsuario = someVar;

          try {
            await transporter.sendMail({
              from: "pgcuascotac@utn.edu.ec", // sender address
              to: arrayUsuario, // list of receivers
              subject: "Mentoria agendada ", // Subject line
              text: "La mentoria agendada ha sido cancelada", // plain text body
              html:
                "<b> La mentoria agendada ha sido cancelada</b>  <b>" +
                { fecha } +
                "</b>",

              // html body
            });
          } catch (error) {
            console.log("HUBO UN ERROR");
          }

          res.status(200).json({ text: "registro actualizado" });
          console.log("actualizado");
        } else {
          res.status(404).json({
            text: "Solo se puede cancelar la mentoria con 1 hora de anticipación",
          });
        }
      }

      res.status(404).json({ text: "El registro no existe" });

      res.status(404).json({ text: "No se puede cancelar la mentoria" });
    } catch (error) {
      res.status(404).json({ text: "Hubo un error" });
    }
  }

  public async update(req: Request, res: Response) {
    console.log("fecha:" + req.body.fecha);
    console.log("pasa actualizar:");
    try {
      const { id } = req.params;
      const fecha = req.body.fecha;
      const hora_inicio = req.body.hora_inicio;
      const hora_fin = req.body.hora_fin;
      const nombre_materia = req.body.nombre_materia;
      console.log("materia", nombre_materia);
      /////OBTENER FECHA ACTUAL////
      let date = new Date();
      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();
      let fechaActual = `${year}-${month}-${day}`;

      if (fechaActual < fecha) {
        console.log("es menor");
        const query =
          "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, id_materia=(select id_materia from materia where nombre_materia=?) where id_registro_mentoria=?";
        pool.query(query, [fecha, hora_inicio, hora_fin, nombre_materia, id]);

        const usuario = await pool.query(
          "select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?",

          [id]
        );
        console.log(usuario);
        var arrayUsuario = [];
        var someVar = [];
        for (let usu of usuario) {
          someVar.push(usu.correo_electronico);
        }
        console.log(someVar);
        arrayUsuario = someVar;
        console.log("el correo", arrayUsuario);
        try {
          emailer.sendMail(arrayUsuario)
          res.status(200).json({ text: "Email enviado" });
          
        } catch (error) {
          res.status(404).json({ text: "Hubo un error", error });
          
        }

        // emailer.sendMail();
        // try {
        //   await transporter.sendMail({
        //     from: 'pgcuascotac@utn.edu.ec', // sender address
        //     to: arrayUsuario, // list of receivers
        //     subject: "Mentoria Actualizada ", // Subject line
        //     text: "La mentoria agendada ha sido actualizada", // plain text body
        //     html:
        //       "<b>La mentoria agendada ha sido actualizada</b>" +
        //       nombre_materia +
        //       "</b>" +
        //       "<br>" +
        //       "<b>Materia:" +
        //       nombre_materia,

        //     // html body
        //   });

        //   res.status(200).json({ text: "Email enviado" });
        // } catch (error) {
        //   res.status(404).json({ text: "Hubo un error ", error });
        // }
      } else {
        if (fechaActual == fecha) {
          console.log("la fecha es igual");
          let date = new Date();
          let horaActual = `${date.getHours()}`;
          let minutosActual = `${date.getMinutes() + 1}`;
          let h = parseInt(horaActual);
          let m = parseInt(minutosActual);

          console.log("hora actual", h);
          console.log("minutos actual", m);
          var horaMentoria = hora_inicio.split(":");
          let h1 = horaMentoria[0];
          let m2 = horaMentoria[1];
          console.log("hora regitro", h1);
          console.log("minutos regis", m2);

          let horaA = h1 - h;
          let minutoA = m2 - m;

          if (minutoA < 0) {
            horaA--;
            minutoA = 60 + minutoA;
          }
          console.log("LA HORA ES", horaA);
          if (horaA >= 1) {
            const query =
              "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, materia=? where id_registro_mentoria=?";
            pool.query(query, [
              fecha,
              hora_inicio,
              hora_fin,
              nombre_materia,
              id,
            ]);

            const usuario = await pool.query(
              "select u.correo_electronico from tipo_estado_agend_mentoria t,registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario and t.id_estado_agen_mentoria=a.id_estado_agen_mentoria and a.id_registro_mentoria=?",

              [id]
            );
            console.log(usuario);
            var arrayUsuario = [];
            var someVar = [];
            for (let usu of usuario) {
              someVar.push(usu.correo_electronico);
            }
            arrayUsuario = someVar;
            try {
              await transporter.sendMail({
                from: '"FICA STEM"<ficastemutn@gmail.com>', // sender address
                to: arrayUsuario, // list of receivers
                subject: "Mentoria Actualizada ", // Subject line
                text: "La mentoria agendada ha sido actualizada", // plain text body
                html: "<b> La mentoria agendada ha sido actualizada</b>", // html body
              });

              res.status(200).json({ text: "Email enviado" });
            } catch (error) {
              res.status(404).json({ text: "Hubo un error ", error });
            }
          } else {
            res
              .status(404)
              .json({ text: "No se puede actualizar la  mentoria" });
          }
        }
      }
    } catch (error) {
      console.log("error", error);
      res.status(404).json({ text: "Hubo un error", error });
    }
  }
}

export const mentoriasController = new MentoriasController(); //instanciar la clase
