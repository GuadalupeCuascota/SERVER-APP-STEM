"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitudMentoriaController = void 0;
const database_1 = __importDefault(require("../database"));
class SolicitudMentoriaController {
    async list(req, res) {
        await database_1.default.query("SELECT sm.id_solicitud_mentoria, m.nombre_materia,tm.nombre_tema ,u.nombre,m.id_usuario,u.apellido,u.correo_electronico,c.nombre_carrera,c.id_carrera ,sm.fecha_solicitud_mentoria, m.id_usuario from solicitud_mentoria sm, usuario u, materia m, tema_materia tm , carreras_fica c where u.id_usuario=sm.id_usuario and m.id_materia=sm.id_materia and c.id_carrera=u.id_carrera and tm.id_tema_materia=sm.id_tema_materia ORDER BY sm.fecha_solicitud_mentoria DESC ", (err, rows) => {
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
        const { id } = req.params;
        const solicitudes = await database_1.default.query("SELECT sm.id_solicitud_mentoria,m.nombre_materia,tm.nombre_tema, u.nombre ,u.apellido,c.nombre_carrera,c.id_carrera, sm.fecha_solicitud_mentoria from solicitud_mentoria sm, usuario u, materia m, tema_materia tm ,carreras_fica c where m.id_materia=sm.id_materia and sm.id_tema_materia=tm.id_tema_materia and u.id_usuario=sm.id_usuario and c.id_carrera=u.id_carrera and u.id_usuario=? ", [id]);
        if (solicitudes.length > 0) {
            res.status(200).json(solicitudes);
        }
        else {
            res.status(404).json("No existe la mentoria");
        }
    }
    async create(req, res) {
        console.log("ENTRA");
        try {
            const id_materia = req.body.id_materia;
            const id_tema_materia = req.body.id_tema_materia;
            const id_usuario = req.body.id_usuario;
            console.log("id_materia", id_materia);
            console.log("id_tema_materia", id_tema_materia);
            const query = "INSERT into solicitud_mentoria (id_materia,id_tema_materia,id_usuario) VALUES (?,?,?)";
            await database_1.default.query(query, [id_materia, id_tema_materia, id_usuario]);
            res.status(201).json({ text: " Guardado" });
        }
        catch (err) {
            res.status(404).json({ text: "Hubo un error " });
            console.log("hubo un errro" + err);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.query(" DELETE FROM `solicitud_mentoria` WHERE id_solicitud_mentoria=?", [id]);
            res.status(201).json({ text: "materia eliminada" });
        }
        catch (err) {
            res.status(404).json({ text: err });
            console.log("No se puede eliminar" + err);
        }
    }
    // res.json({ text: "eliminando" + req.params.id });
    async update(req, res) {
        console.log("pasa actualizar");
        const { id } = req.params;
        const { id_materia, nombre_materia } = req.body;
        if (id_materia) {
            try {
                const roles = await database_1.default.query(" UPDATE  materia set nombre_materia=? WHERE id_materia=?", [nombre_materia, id]);
                res.status(201).json({ message: "actualizado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error ", error });
                console.log("No se puede actualizar" + error);
            }
        }
        else {
            res.json({ message: "Atributos requeridos" });
        }
    }
}
exports.solicitudMentoriaController = new SolicitudMentoriaController();
