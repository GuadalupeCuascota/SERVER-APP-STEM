import { Request, Response } from "express";
import pool from "../database";
import jwt from "jsonwebtoken";
import brycpt from "bcryptjs";

// import { getRepository } from 'typeorm';

class AutentificacionController {
  public async login(req: Request, res: Response) {
    console.log("PASA LOGIN");
    const { correo_electronico, contrasenia } = req.body;

    if (!(correo_electronico && contrasenia)) {
      return res
        .status(404)
        .json({ text: "correo y contraseña son requeridos" });
    } else {
      const usuario = await pool.query(
        "SELECT * FROM usuario WHERE correo_electronico=? and contrasenia=?",

        [correo_electronico, contrasenia]
      );
      if (usuario.length > 0) {
        const payload = {
          id_usuario: usuario[0].id_usuario,
          nombre: usuario[0].nombre,
          apellido: usuario[0].apellido,
          id_rol: usuario[0].id_rol,
          nivel_academico: usuario[0].nivel_academico,
          carrera: usuario[0].carrera,
        };
        const Token = jwt.sign({ payload }, "SCRET", { expiresIn: "1h" });

        console.log(Token);
        return res.status(200).json({ message: "ok", Token, payload });
      } else {
        return res
          .status(404)
          .json({ text: "usuario o contraseña incorrecto" });
      }
    }
  }

  public async encriyptContraseña(req: Request, res: Response) {
    const contrasenia = req.body;
    const crypt = await brycpt.genSalt(10);
    return await brycpt.hash(contrasenia, crypt);
  }

  //  public async compareContraseña(req: Request, res: Response) {
  //   const contrasenia =req.body;
  //    return await brycpt.compare(contrasenia,crypt)

  //  }
}
export const autentificacionController = new AutentificacionController();
