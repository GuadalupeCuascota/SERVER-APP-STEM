"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesController = void 0;
const database_1 = __importDefault(require("../database"));
const emailer_1 = require("../controllers/emailer");
const sgMail = require("../controllers/emailer");
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
        const correo = req.body.correo;
        console.log(correo);
        try {
            await emailer_1.transporter.sendMail({
                from: '"FICA STEM"<ficastemutn@gmail.com>',
                to: correo,
                subject: "Mentoria agendada ",
                text: "La mentoria agendada ha sido cancelada",
            });
            res.status(200).json({ text: "Email enviado" });
        }
        catch (error) {
            console.log("HUBO UN ERROR");
        }
        // const msg={
        //     to:correo,
        //     from:"pgcuascotac23@gmail.com",
        //     Subject:"Hello",
        //     text:"it is",
        //   }
        //   try {
        //     await sgMail.send(msg);
        //     res.status(204).json({ message: "enviado" });
        //   } catch (error) {
        //     console.log("error",error);
        //   }
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
