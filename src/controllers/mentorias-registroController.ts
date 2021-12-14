import { Console } from "console";
import { Request, Response } from "express";
import pool from "../database";
import { transporter } from "../controllers/emailer";

var myDate = new Date();
class MentoriasController {
  public async listMentoras(req: Request, res: Response) {
    console.log("pasa obtner mentoras");
    await pool.query(
      "SELECT DISTINCT u.id_usuario, u.nombre,u.apellido, u.carrera from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.fecha>=CURDATE()",

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
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.carrera, m.materia , m.id_estado_mentoria from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and u.id_usuario=? and  m.fecha>=CURDATE()",
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
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido,u.carrera,m.id_usuario, m.materia ,ts.nombre_estado_mentoria from registro_mentoria m, usuario u, tipo_estado_mentoria ts WHERE m.id_usuario=u.id_usuario and ts.id_estado_mentoria=m.id_estado_mentoria ORDER BY fecha_registro DESC",
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
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, m.materia from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?",
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
      const {
        fecha,
        hora_inicio,
        hora_fin,
        id_usuario,
        materia,
        id_estado_mentoria,
      } = req.body;
      console.log("fecha:" + req.body.fecha);
      console.log("fecha:" + req.body.hora_inicio);
      console.log("estado_registro" + req.body.id_estado_mentoria);
      const findRegistro = await pool.query(
        "SELECT * FROM registro_mentoria WHERE id_usuario=? and hora_inicio=? and fecha= ?",
        [id_usuario, hora_inicio, fecha]
      );

      if (findRegistro.length > 0) {
        res.status(404).json({ text: "Mentoria duplicada" });
      } else {
        console.log("no existe mentoria");
        const query =
          "INSERT INTO registro_mentoria(fecha, hora_inicio, hora_fin, id_usuario, materia,id_estado_mentoria) VALUES (?,?,?,?,?,?)";
        await pool.query(query, [
          fecha,
          hora_inicio,
          hora_fin,
          id_usuario,
          materia,
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
              from: '"FICA STEM"<ficastemutn@gmail.com>', // sender address
              to: arrayUsuario, // list of receivers
              subject: "Mentoria agendada ", // Subject line
              text: "La mentoria agendada ha sido cancelada", // plain text body
              html: "<b> La mentoria agendada ha sido cancelada</b>  <b>"+{fecha}+"</b>" ,
            

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
     const materia = req.body.materia;
     console.log("fecha",fecha)
     /////OBTENER FECHA ACTUAL////
     let date = new Date();
     let day = `${date.getDate()}`.padStart(2, "0");
     let month = `${date.getMonth() + 1}`.padStart(2, "0");
     let year = date.getFullYear();
     let fechaActual = `${year}-${month}-${day}`;


     if (fechaActual < fecha) {
      const query =
      "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, materia=? where id_registro_mentoria=?";
    pool.query(query, [fecha, hora_inicio, hora_fin, materia, id]);
    
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
        html: "<b>La mentoria agendada ha sido actualizada</b>"+materia+"</b>"+"<br>" +"<b>Materia:"+materia
      
      
        
         // html body
      });

      res.status(200).json({ text: "Email enviado" });
    } catch (error) {
      console.log("HUBO UN ERROR");
    }
     }else{
      if(fechaActual ==fecha){
        console.log("la fecha es igual")
        let date = new Date();
        let horaActual = `${date.getHours()}`;
        let minutosActual = `${date.getMinutes() + 1}`;
        let h = parseInt(horaActual);
        let m = parseInt(minutosActual);

        console.log("hora actual",h)
        console.log("minutos actual",m)
        var horaMentoria = hora_inicio.split(":");
        let h1 = horaMentoria[0];
        let m2 = horaMentoria[1];
        console.log("hora regitro",h1)
        console.log("minutos regis",m2)
        

        let horaA = h1 - h;
        let minutoA = m2 - m;

        if (minutoA < 0) {
          horaA--;
          minutoA = 60 + minutoA;
        }
       console.log("LA HORA ES",horaA)
        if(horaA>=1){
          const query =
          "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?, materia=? where id_registro_mentoria=?";
        pool.query(query, [fecha, hora_inicio, hora_fin, materia, id]);

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
          console.log("HUBO UN ERROR");
        }
      
        }else{
          res.status(404).json({ text: "No se puede actualizar la mentoriala mentoria" });
        }
      }
     
    
     }


    } catch (error) {
      console.log("error", error);
      res.status(404).json({ text: "Hubo un error" });
    }
  }
}

export const mentoriasController = new MentoriasController(); //instanciar la clase
