"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesController = void 0;
const database_1 = __importDefault(require("../database"));
// import {transporter} from '../controllers/emailer'
class RolesController {
    async list(req, res) {
        // const roles = await pool.query("SELECT * FROM rol");
        // res.json(roles);
        await database_1.default.query("SELECT * FROM rol", (err, rows) => {
            if (err) {
                res.status(404).json("error al cargar");
                console.log(err);
            }
            else {
                res.status(200).json(rows);
                console.log("Datos seleccionados probando1");
            }
        });
    }
    async getOne(req, res) {
        // pool.query("INSERT INTO rol set ?", [req.body]);
        const { id } = req.params;
        const roles = await database_1.default.query("SELECT * FROM rol WHERE id_rol=?", [id]);
        console.log(roles);
        if (roles.length > 0) {
            return res.json(roles[0]);
        }
        res.json({ text: "el rol no existe" });
    }
    async create(req, res) {
        try {
            const tipo_rol = req.body.tipo_rol;
            const query = "INSERT INTO rol(tipo_rol)VALUES (?)";
            await database_1.default.query(query, [tipo_rol]);
            res.status(201).json({ text: "Guardado" });
            //  await transporter.sendMail({
            //   from: '"Fred Foo 👻"<lupitacuas@hotmail.com>', // sender address
            //   to: "lupitagcjazy@gmail.com", // list of receivers
            //   subject: "Bienevenido hola mundo✔ ", // Subject line
            //   text: "Hello world?", // plain text body
            //   html: "<b>Hello world  bienvenido?</b>", // html body
            // });
        }
        catch (err) {
            res.status(400).json({ text: "Hubo un error " });
            console.log("hubo un errro" + err);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.query(" DELETE FROM rol WHERE id_rol=?", [id]);
            res.status(204).json({ message: "el dato fue eliminado" });
        }
        catch (err) {
            res.status(404).json({ text: "Hubo un error " });
        }
    }
    // res.json({ text: "eliminando" + req.params.id });
    async update(req, res) {
        const { id } = req.params;
        const { id_rol, tipo_rol } = req.body;
        if (tipo_rol) {
            try {
                const roles = await database_1.default.query(" UPDATE rol set ? WHERE id_rol=?", [
                    req.body,
                    id,
                ]);
                res.json({ message: "actualizado" });
            }
            catch (error) {
                res.json({ text: "Hubo un error ", error });
                console.log("No se puede actualizar" + error);
            }
        }
        else {
            res.json({ message: "Atributos requeridos" });
        }
    }
}
exports.rolesController = new RolesController(); //instanciar la clase
