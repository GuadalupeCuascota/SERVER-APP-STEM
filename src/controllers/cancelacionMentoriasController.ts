import { Console } from "console";
import { Request, Response } from "express";
import pool from "../database";
import { transporter } from "../controllers/emailer";

import * as format from "date-fns/format";

class CancelacionMentoriasController {
  //  localtime=moment().format('YYYY-MM-DD');

  public async updateRegistroMentoria(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const id_estado_mentoria = req.body.id_estado_mentoria;

      console.log("el id", id);
      console.log("el estado",id_estado_mentoria)

      const registroMentorias = await pool.query(
        "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido,mat.nombre_materia from registro_mentoria m, usuario u, materia mat WHERE m.id_usuario=u.id_usuario and mat.id_materia=m.id_materia and m.id_registro_mentoria=?",
        [id]
      );
      if (registroMentorias.length > 0) {
        const fecha = registroMentorias[0].fecha;
        const hora_inicio = registroMentorias[0].hora_inicio;
        const nombre_materia=registroMentorias[0].nombre_materia

        console.log("fecha", fecha);
        console.log("hora_inicio", hora_inicio);

        const hoy = new Date(fecha);
        let day1 = hoy.getDate();
        let month1 = hoy.getMonth() + 1;
        let year1 = hoy.getFullYear();
        let fechaRegistro = `${year1}-${month1}-${day1}`;

        let date = new Date();
        let day = `${date.getDate()}`.padStart(2, "0");
        let month = `${date.getMonth() + 1}`.padStart(2, "0");
        let year = date.getFullYear();
        let fechaActual = `${year}-${month}-${day}`;

        if (fechaActual < fechaRegistro) {
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
             
              html:
                "<b>La mentoria agendada ha sido cancelada</b>"+
                "</b>" +
                "<br>" +
                "<b>Materia:" +
                nombre_materia + "<br>" +
                "<b>Fecha mentoria:" + fechaRegistro
              , // html body
            });
            res.status(200).json({ text: "Email enviado" });
          } catch (error) {
            console.log("HUBO UN ERROR");
          }
        } else {
          if(fechaActual ==fechaRegistro){
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
                subject: "Mentoria Cancelada ", // Subject line
                text: "La mentoria agendada ha sido cancelada", // plain text body
                
                html:
                "<b>La mentoria agendada ha sido cancelada</b>"+
                "</b>" +
                "<br>" +
                "<b>Materia:" +
                nombre_materia + "<br>" +
                "<b>Fecha mentoria:" + fechaRegistro
              });
              res.status(200).json({ text: "Email enviado" });
            } catch (error) {
              console.log("HUBO UN ERROR");
            }
            }else{
              res.status(404).json({ text: "No se puede cancelar la mentoria" });
            }
          }
         
        }
      } else {
        res.status(404).json({ text: "El registro no existe HOY" });
      }
    } catch (error) {
      res.status(404).json({ text: "Hubo un error", error });
    }
  }

  public async cancelarMentoriaEst(req: Request, res: Response){
    console.log("PASA CANCELAR MENTORIA")
  try {
    const { id } = req.params;
    const id_usuario=req.body.id_usuario
    const id_estado_agen_mentoria = req.body.id_estado_agen_mentoria
    const id_registro_mentoria= req.body.id_registro_mentoria
    console.log("el id es", id);
    console.log("el estado",id_estado_agen_mentoria)
    console.log("id_registro",id_registro_mentoria)
    console.log("id_usuario",id_usuario)
    const registroMentorias = await pool.query(
      "SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin,u.nombre,u.apellido, mat.nombre_materia from registro_mentoria m, usuario u, materia mat WHERE m.id_usuario=u.id_usuario and m.id_materia=mat.id_materia and m.id_registro_mentoria=?",
      [id_registro_mentoria]
    );
    console.log("el registro",registroMentorias)
    if (registroMentorias.length > 0) {
      const fecha = registroMentorias[0].fecha;
      const hora_inicio = registroMentorias[0].hora_inicio;

      console.log("fecha", fecha);
      console.log("hora_inicio", hora_inicio);

      const hoy = new Date(fecha);
      let day1 = hoy.getDate();
      let month1 = hoy.getMonth() + 1;
      let year1 = hoy.getFullYear();
      let fechaRegistro = `${year1}-${month1}-${day1}`;

      let date = new Date();
      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();
      let fechaActual = `${year}-${month}-${day}`;

      

      if (fechaActual < fechaRegistro) {

        try {
          console.log("es menor")
          const query =
            "UPDATE agendamiento_mentorias SET id_estado_agen_mentoria=? where id_agendamiento_mentoria=? and id_usuario=?";
          pool.query(query, [id_estado_agen_mentoria, id,id_usuario]);
          res.status(201).json({ text: "Mentoria cancelada" });
        } catch (error) {
          
          res.status(404).json({ text: "Hubo un error " });
        }
       
        
        


        
       
      } else {

        try {
          if(fechaActual ==fechaRegistro){
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
              "UPDATE agendamiento_mentorias SET id_estado_agen_mentoria=? where id_agendamiento_mentoria=? and id_usuario=?";
            pool.query(query, [id_estado_agen_mentoria, id,id_usuario]);
  
           
            }else{
              res.status(404).json({ text: "No se puede cancelar la mentoria" });
              console.log("NO SE PUEDE CANCELAR LA MENTORIA")
            }
          }
        } catch (error) {
          
        }
        
        res.status(404).json({ text: "No se puede cancelar la mentoria" });
       
      }

    } else {
      res.status(404).json({ text: "El registro no existe HOY" });
    }
  } catch (error) {
    res.status(404).json({ text: "Hubo un error", error });
  }
  

}


}
export const cancelacionMentoriasController =
  new CancelacionMentoriasController();
