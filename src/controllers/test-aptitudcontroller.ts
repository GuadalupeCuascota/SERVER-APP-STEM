import { validate } from "class-validator";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import pool from "../database";

class TestAptitudController {
  test:any=[];
  r='';
  public async list1(req: Request, res: Response) {
  
    const roles = await pool.query("SELECT p.pregunta, o.opcion, o.id_pregunta from test_aptitud t, pregunta p, opciones o where t.id_test_aptitud=p.id_test_aptitud and o.id_pregunta=p.id_pregunta");
     console.log(roles)
    
  
  }
  public async listPeguntasCarrera(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT * FROM pregunta_ingenieria ORDER BY id_pregunta ASC", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");

        console.log(err)
      } else {

        res.json(rows);
        console.log(rows);
        console.log("Datos seleccionados probando1");
      }
    }); 
  }

  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT p.id_pregunta, p.pregunta, c.id_carrera FROM pregunta p , carreras_fica c where p.id_carrera=c.id_carrera  ORDER BY p.id_pregunta ASC", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");

        console.log(err)
      } else {

        res.json(rows);
        console.log(rows);
        console.log("Datos seleccionados probando1");
      }
    }); 
  }

  public async listOpcionesP(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT * FROM opciones", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");
        console.log(err)
      } else {
        res.json(rows);
        console.log("Datos seleccionados probando1");
      }
    }); 
  }
}
export const testAptitudController = new TestAptitudController(); //instanciar la clase