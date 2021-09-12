import {  Request, Response } from "express";
import pool from "../database";
class ConsultasDashboardController{
    public async NroEstudiantesMes(req: Request, res: Response) {

        const convert=await pool.query("SET lc_time_names = 'es_ES'");
        await pool.query("SELECT MONTHNAME(fecha_registro) as 'Mes',COUNT(id_usuario) as 'NroEstudiantes' from usuario where id_rol=4 group by monthname(fecha_registro)", (err: any, rows: any) => {
        
            if (err) {
              res.status(404).json("error al cargar");
              console.log(err)
            } else {
              res.status(200).json(rows);
              console.log(rows);
            }
          });
    }
    public async NromentoriasAgend(req: Request, res: Response) {

      const convert=await pool.query("SET lc_time_names = 'es_ES'");
      await pool.query("SELECT MONTHNAME(r.fecha) as 'Mes',COUNT(a.id_agendamiento_mentoria) as 'NroMentoriasAgendadas' from agendamiento_mentorias a, registro_mentoria r where r.id_registro_mentoria=a.id_registro_mentoria group by monthname(r.fecha)", (err: any, rows: any) => {
      
          if (err) {
            res.status(404).json("error al cargar");
            console.log(err)
          } else {
            res.status(200).json(rows);
            console.log(rows);
          }
        });
  }

}
export const consultasDashboardController = new ConsultasDashboardController();